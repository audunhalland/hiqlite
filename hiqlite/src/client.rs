use crate::app_state::AppState;
use crate::client_stream::{
    ClientBatchPayload, ClientExecutePayload, ClientStreamReq, ClientTransactionPayload,
};
use crate::migration::Migrations;
use crate::network::api::ApiStreamResponsePayload;
use crate::network::management::LearnerReq;
use crate::network::{api, RaftWriteResponse, HEADER_NAME_SECRET};
use crate::store::state_machine::sqlite::state_machine::{Params, Query, QueryWrite};
use crate::Error;
use crate::NodeId;
use crate::{Node, Response};
use openraft::RaftMetrics;
use reqwest::Client;
use rust_embed::RustEmbed;
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};
use std::borrow::Cow;
use std::collections::BTreeSet;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;
use tokio::sync::{oneshot, watch, RwLock};
use tracing::debug;

/// Raft / Database client
#[derive(Clone)]
pub struct DbClient {
    state: Option<Arc<AppState>>,
    leader: Arc<RwLock<(NodeId, String)>>,
    client: Arc<Client>,
    tx_client: flume::Sender<ClientStreamReq>,
    tls: bool,
    api_secret: String,
    request_id: Arc<AtomicUsize>,
    tx_shutdown: Option<watch::Sender<bool>>,
}

impl DbClient {
    /// Create a local client that skips network connections if not necessary
    pub(crate) fn new_local(
        state: Arc<AppState>,
        tls: bool,
        tx_shutdown: watch::Sender<bool>,
    ) -> Self {
        let leader_id = state.id;
        let leader_addr = state.addr_api.clone();

        let node_id = state.id;
        let secret = state.secret_api.clone();
        let leader = Arc::new(RwLock::new((leader_id, leader_addr)));
        let tx_client = Self::open_stream(node_id, tls, secret.as_bytes().to_vec(), leader.clone());

        let api_secret = state.secret_api.clone();
        Self {
            state: Some(state),
            leader,
            client: Arc::new(
                Client::builder()
                    // .user_agent("Raft Client")
                    .http2_prior_knowledge()
                    // TODO
                    // .danger_accept_invalid_certs()
                    .build()
                    .unwrap(),
            ),
            tx_client,
            tls,
            api_secret,
            request_id: Arc::new(AtomicUsize::new(0)),
            tx_shutdown: Some(tx_shutdown),
        }
    }

    /// Create a remote client
    pub fn new(
        node_id: NodeId,
        leader_id: NodeId,
        leader_addr: String,
        tls: bool,
        api_secret: String,
    ) -> Self {
        let leader = Arc::new(RwLock::new((leader_id, leader_addr)));
        let tx_client =
            Self::open_stream(node_id, tls, api_secret.as_bytes().to_vec(), leader.clone());

        Self {
            state: None,
            leader,
            client: Arc::new(
                Client::builder()
                    // .user_agent("Raft Client")
                    .http2_prior_knowledge()
                    // TODO
                    // .danger_accept_invalid_certs()
                    .build()
                    .unwrap(),
            ),
            tx_client,
            tls,
            api_secret,
            request_id: Arc::new(AtomicUsize::new(0)),
            tx_shutdown: None,
        }
    }

    #[inline(always)]
    async fn is_this_local_leader(&self) -> Option<&Arc<AppState>> {
        if let Some(state) = &self.state {
            if state.id == self.leader.read().await.0 {
                return Some(state);
            }
        }
        None
    }

    #[inline(always)]
    pub(crate) fn new_request_id(&self) -> usize {
        self.request_id.fetch_add(1, Ordering::Relaxed)
    }

    /// `EXECUTE` a modifying query
    ///
    /// This method may return stale value because it does not force to read on a legal leader.
    /// TODO maybe convert these params into borrowed ones because of cloning needed anyway?
    pub async fn execute<S>(&self, sql: S, params: Params) -> Result<usize, Error>
    where
        S: Into<Cow<'static, str>>,
    {
        let sql = Query {
            sql: sql.into(),
            params,
        };

        match self.execute_req(sql.clone()).await {
            Ok(res) => Ok(res),
            Err(err) => {
                if self.was_leader_update_error(&err).await {
                    // try once again after a leader switch
                    self.execute_req(sql).await
                } else {
                    Err(err)
                }
            }
        }
    }

    #[inline(always)]
    async fn execute_req(&self, sql: Query) -> Result<usize, Error> {
        if let Some(state) = self.is_this_local_leader().await {
            let res = state.raft.client_write(QueryWrite::Execute(sql)).await?;
            let resp: Response = res.data;
            match resp {
                Response::Execute(res) => res.result,
                Response::Transaction(_) => unreachable!(),
                Response::Batch(_) => unreachable!(),
                Response::Empty => unreachable!(),
            }
        } else {
            let (ack, rx) = oneshot::channel();
            self.tx_client
                .send_async(ClientStreamReq::Execute(ClientExecutePayload {
                    request_id: self.new_request_id(),
                    sql,
                    ack,
                }))
                .await
                .expect("Client Stream Manager to always be running");
            let res = rx
                .await
                .expect("To always receive an answer from Client Stream Manager")?;
            match res {
                ApiStreamResponsePayload::Execute(res) => res,
                ApiStreamResponsePayload::Transaction(_) => unreachable!(),
                ApiStreamResponsePayload::Batch(_) => unreachable!(),
            }
        }
    }

    // #[inline(always)]
    // async fn stream_req_execute(&self, sql: Query) -> Result<ApiStreamResponsePayload, Error> {
    //     let (ack, rx) = oneshot::channel();
    //     self.tx_client
    //         .send_async(ClientStreamReq::Execute(ClientExecutePayload {
    //             request_id: self.new_request_id(),
    //             sql,
    //             ack,
    //         }))
    //         .await
    //         .expect("Client Stream Manager to always be running");
    //     rx.await
    //         .expect("To always receive an answer from Client Stream Manager")
    // }

    /// Takes multiple queries and executes all of them in a single transaction.
    pub async fn txn<C, Q>(&self, sql: Q) -> Result<Vec<Result<usize, Error>>, Error>
    where
        Q: IntoIterator<Item = (C, Params)>,
        C: Into<Cow<'static, str>>,
    {
        let queries: Vec<Query> = sql
            .into_iter()
            .map(|(q, params)| Query {
                sql: q.into(),
                params,
            })
            .collect();

        match self.txn_execute(queries.clone()).await {
            Ok(res) => Ok(res),
            Err(err) => {
                if self.was_leader_update_error(&err).await {
                    // try once again after a leader switch
                    self.txn_execute(queries).await
                } else {
                    Err(err)
                }
            }
        }
    }

    #[inline(always)]
    async fn txn_execute(&self, queries: Vec<Query>) -> Result<Vec<Result<usize, Error>>, Error> {
        if let Some(state) = self.is_this_local_leader().await {
            let res = state
                .raft
                .client_write(QueryWrite::Transaction(queries))
                .await?;
            let resp: Response = res.data;
            match resp {
                Response::Execute(_) => unreachable!(),
                Response::Transaction(res) => res,
                Response::Batch(_) => unreachable!(),
                Response::Empty => unreachable!(),
            }
        } else {
            let (ack, rx) = oneshot::channel();
            self.tx_client
                .send_async(ClientStreamReq::Transaction(ClientTransactionPayload {
                    request_id: self.new_request_id(),
                    queries,
                    ack,
                }))
                .await
                .expect("Client Stream Manager to always be running");
            let res = rx
                .await
                .expect("To always receive an answer from Client Stream Manager")?;
            match res {
                ApiStreamResponsePayload::Transaction(res) => res,
                ApiStreamResponsePayload::Execute(_) => unreachable!(),
                ApiStreamResponsePayload::Batch(_) => unreachable!(),
            }
        }
    }

    /// Takes an arbitrary SQL String with multiple queries and executes all of them as a batch
    pub async fn batch<S>(&self, sql: S) -> Result<Vec<Result<usize, Error>>, Error>
    where
        S: Into<Cow<'static, str>>,
    {
        let sql = sql.into();
        match self.batch_execute(sql.clone()).await {
            Ok(res) => Ok(res),
            Err(err) => {
                if self.was_leader_update_error(&err).await {
                    // try once again after a leader switch
                    self.batch_execute(sql).await
                } else {
                    Err(err)
                }
            }
        }
    }

    #[inline(always)]
    async fn batch_execute(
        &self,
        sql: Cow<'static, str>,
    ) -> Result<Vec<Result<usize, Error>>, Error> {
        if let Some(state) = self.is_this_local_leader().await {
            let res = state.raft.client_write(QueryWrite::Batch(sql)).await?;
            let resp: Response = res.data;
            match resp {
                Response::Execute(_) => unreachable!(),
                Response::Transaction(_) => unreachable!(),
                Response::Batch(res) => Ok(res.result),
                Response::Empty => unreachable!(),
            }
        } else {
            let (ack, rx) = oneshot::channel();
            self.tx_client
                .send_async(ClientStreamReq::Batch(ClientBatchPayload {
                    request_id: self.new_request_id(),
                    sql,
                    ack,
                }))
                .await
                .expect("Client Stream Manager to always be running");
            let res = rx
                .await
                .expect("To always receive an answer from Client Stream Manager")?;
            match res {
                ApiStreamResponsePayload::Transaction(_) => unreachable!(),
                ApiStreamResponsePayload::Execute(_) => unreachable!(),
                ApiStreamResponsePayload::Batch(res) => Ok(res),
            }
        }
    }

    pub async fn migrate<T: RustEmbed>() -> Result<(), Error> {
        let _migrations = Migrations::build::<T>();
        todo!()
    }

    /// This is the most efficient and fastest way to query data from sqlite into a struct.
    /// It is mandatory, that the struct implements `From<Row<'_>>` for this to work.
    /// If you want a more comfortable and easier way and don't need the most efficiency and
    /// speed, take a look at `.query_as()`.
    pub async fn query_map<T, S>(&self, stmt: S, params: Params) -> Result<Vec<T>, Error>
    where
        T: for<'r> From<&'r crate::Row<'r>> + Send + 'static,
        S: Into<Cow<'static, str>>,
    {
        if let Some(state) = &self.state {
            api::query_map(state, stmt, params).await
        } else {
            todo!("query_map for remote clients")
        }
    }

    /// Works in the same way as `query_map()`, but returns only one result.
    /// Errors if no rows are returned and ignores additional results if more than one row returned.
    pub async fn query_map_one<T, S>(&self, stmt: S, params: Params) -> Result<T, Error>
    where
        T: for<'r> From<&'r crate::Row<'r>> + Send + 'static,
        S: Into<Cow<'static, str>>,
    {
        if let Some(state) = &self.state {
            api::query_map_one(state, stmt, params).await
        } else {
            todo!("query_map_one for remote clients")
        }
    }

    /// Converts data returned from a sql query into a struct. This struct must derive
    /// serde::Deserialize. This is the easiest and most straight forward way of doing it, but not
    /// the fastest and most efficient one. If you want to optimize memory and speed, you should
    /// use `.query_map()`.
    pub async fn query_as<T, S>(&self, stmt: S, params: Params) -> Result<Vec<T>, Error>
    where
        T: DeserializeOwned + Send + 'static,
        S: Into<Cow<'static, str>>,
    {
        if let Some(state) = &self.state {
            api::query_as(state, stmt, params).await
        } else {
            todo!("query_as for remote clients")
        }
    }

    /// Works in the same way as `query_as()`, but returns only one result.
    /// Errors if no rows are returned and ignores additional results if more than one row returned.
    pub async fn query_as_one<T, S>(&self, stmt: S, params: Params) -> Result<T, Error>
    where
        T: DeserializeOwned + Send + 'static,
        S: Into<Cow<'static, str>>,
    {
        if let Some(state) = &self.state {
            api::query_as_one(state, stmt, params).await
        } else {
            todo!("query_as_one for remote clients")
        }
    }

    // TODO impl consistent query fn's

    // /// Consistent Read value by key, in an inconsistent mode.
    // ///
    // /// This method MUST return consistent value or CheckIsLeaderError.
    // /// TODO key can be optimized with proper traits to prevent String allocation
    // pub async fn consistent_read(&self, req: &String) -> Result<Option<String>, ApiError> {
    //     if let Some(state) = self.is_this_local_leader().await {
    //         if let Ok(res) = api::consistent_read_local(state, req).await {
    //             // If this returns an error, it might be the case that our leader information
    //             // is outdated. In that case, we will fall back to a network request, which
    //             // updates this information automatically.
    //             return Ok(res);
    //         }
    //     };
    //     let res = self
    //         .send_with_retry("/api/consistent_read", Some(req))
    //         .await?;
    //     Ok(res)
    // }

    pub async fn init(&self) -> Result<(), Error> {
        // self.send_with_retry("/cluster/init", None::<String>.as_ref())
        //     .await
        let url = self.build_addr("/cluster/init").await;
        let res = self
            .client
            .post(url)
            .header(HEADER_NAME_SECRET, &self.api_secret)
            .send()
            .await
            .unwrap();

        if res.status().is_success() {
            Ok(())
        } else {
            Err(res.json().await.unwrap())
        }
    }

    pub async fn add_learner(&self, req: LearnerReq) -> Result<RaftWriteResponse, Error> {
        self.send_with_retry("/cluster/add-learner", Some(&req))
            .await
    }

    pub async fn change_membership(
        &self,
        req: &BTreeSet<NodeId>,
    ) -> Result<RaftWriteResponse, Error> {
        self.send_with_retry("/cluster/change-membership", Some(req))
            .await
    }

    pub async fn metrics(&self) -> Result<RaftMetrics<NodeId, Node>, Error> {
        if let Some(state) = &self.state {
            let metrics = state.raft.metrics().borrow().clone();
            Ok(metrics)
        } else {
            // let url = self.build_addr("/cluster/metrics").await;
            // let res = self.client.get(url)
            //     .header(HEADER_NAME_SECRET, &self.api_secret)
            //     .send().await?;
            // if res.status().is_success() {
            //     let bytes = res.bytes().await?;
            //     Ok(bincode::deserialize(bytes.as_ref()).unwrap())
            // } else {
            //     Err(res.json().await.unwrap())
            // }

            self.send_with_retry("/cluster/metrics", None::<String>.as_ref())
                .await
        }
    }

    /// Check the Raft health state
    pub async fn is_healthy(&self) -> Result<(), Error> {
        let metrics = self.metrics().await?;
        metrics.running_state.map_err(Error::from)
        // Ok(metrics.current_leader.is_some())
    }

    /// Perform a graceful shutdown for this Raft node.
    /// Works on local clients only and can't shut down remote nodes.
    // #[must_use]
    pub async fn shutdown(self) -> Result<(), Error> {
        if let Some(state) = &self.state {
            match state.raft.shutdown().await {
                Ok(_) => {
                    if let Some(tx) = self.tx_shutdown {
                        tx.send(true).unwrap();
                    }
                    Ok(())
                }
                Err(err) => Err(Error::Error(err.to_string().into())),
            }
        } else {
            Err(Error::Error(
                "Shutdown for remote Raft clients is not yet implemented".into(),
            ))
        }
    }

    #[inline(always)]
    async fn build_addr(&self, path: &str) -> String {
        let scheme = if self.tls { "https" } else { "http" };
        let url = {
            let lock = self.leader.read().await;
            format!("{}://{}{}", scheme, lock.1, path)
        };
        debug!("request url: {}", url);
        url
    }

    async fn send_with_retry<B: Serialize, Resp: for<'a> Deserialize<'a>>(
        &self,
        path: &str,
        body: Option<&B>,
    ) -> Result<Resp, Error> {
        let mut i = 0;
        loop {
            let url = self.build_addr(path).await;
            let res = if let Some(body) = body {
                let body = bincode::serialize(body).unwrap();
                self.client.post(url).body(body)
            } else {
                self.client.get(url)
            }
            .header(HEADER_NAME_SECRET, &self.api_secret)
            .send()
            .await?;
            debug!("request status: {}", res.status());

            if res.status().is_success() {
                let bytes = res.bytes().await?;
                let resp = bincode::deserialize(bytes.as_ref())?;
                return Ok(resp);
            } else {
                let err = res.json::<Error>().await?;
                self.was_leader_update_error(&err).await;

                if i >= 2 {
                    return Err(err);
                }

                i += 1;
                continue;
            }
        }
    }

    #[inline]
    async fn was_leader_update_error(&self, err: &Error) -> bool {
        let mut has_changed = false;

        if let Some((id, node)) = err.is_forward_to_leader() {
            if id.is_some() && node.is_some() {
                let api_addr = node.as_ref().unwrap().addr_api.clone();
                let leader_id = id.unwrap();
                {
                    let mut lock = self.leader.write().await;
                    // we check additionally to prevent race conditions and multiple
                    // re-connect triggers
                    if lock.0 != leader_id {
                        *lock = (leader_id, api_addr.clone());
                        has_changed = true;
                    }
                }

                if has_changed {
                    self.tx_client
                        .send_async(ClientStreamReq::LeaderChange((id, node.clone())))
                        .await
                        .expect("the Client API WebSocket Manager to always be running");
                }
            }
        }

        has_changed
    }
}
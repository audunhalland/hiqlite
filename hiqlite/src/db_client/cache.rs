use crate::db_client::stream::{ClientKVPayload, ClientStreamReq};
use crate::network::api::ApiStreamResponsePayload;
use crate::store::state_machine::memory::state_machine::{CacheRequest, CacheResponse};
use crate::{DbClient, Error};
use serde::{Deserialize, Serialize};
use std::borrow::Cow;
use tokio::sync::oneshot;

impl DbClient {
    pub async fn get<K, V>(&self, key: K) -> Result<V, Error>
    where
        K: AsRef<str>,
        V: for<'a> Deserialize<'a>,
    {
        if let Some(state) = &self.state {
            let lock = state.raft_cache.kv_store.data.read().await;
            if let Some(value) = lock.kvs.get(key.as_ref()) {
                return Ok(bincode::deserialize(value).unwrap());
            }
        } else {
            todo!("CacheGet for remote clients")
        }
        Err(Error::Cache("no value found".into()))
    }

    pub async fn put<K, V>(&self, key: K, value: &V) -> Result<(), Error>
    where
        K: Into<Cow<'static, str>>,
        V: Serialize,
    {
        self.cache_req_retry(CacheRequest::Put {
            key: key.into(),
            value: bincode::serialize(value).unwrap(),
        })
        .await
    }

    pub async fn delete<K>(&self, key: K) -> Result<(), Error>
    where
        K: Into<Cow<'static, str>>,
    {
        self.cache_req_retry(CacheRequest::Delete { key: key.into() })
            .await
    }

    async fn cache_req_retry(&self, cache_req: CacheRequest) -> Result<(), Error> {
        match self.cache_req(cache_req.clone()).await {
            Ok(_) => Ok(()),
            Err(err) => {
                if self.was_leader_update_error(&err).await {
                    self.cache_req(cache_req).await?;
                    Ok(())
                } else {
                    Err(err)
                }
            }
        }
    }

    async fn cache_req(&self, cache_req: CacheRequest) -> Result<CacheResponse, Error> {
        if let Some(state) = self.is_this_local_leader().await {
            let res = state.raft_cache.raft.client_write(cache_req).await?;
            Ok(res.data)
        } else {
            let (ack, rx) = oneshot::channel();
            self.tx_client
                .send_async(ClientStreamReq::KV(ClientKVPayload {
                    request_id: self.new_request_id(),
                    cache_req,
                    ack,
                }))
                .await
                .expect("Client Stream Manager to always be running");
            let res = rx
                .await
                .expect("To always receive an answer from Client Stream Manager")?;
            match res {
                ApiStreamResponsePayload::KV(res) => res,
                _ => unreachable!(),
            }
        }
    }
}

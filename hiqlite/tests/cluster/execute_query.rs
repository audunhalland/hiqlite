use crate::log;
use chrono::Utc;
use hiqlite::{params, DbClient, Error, Param};
use serde::{Deserialize, Serialize};

// serde derives are mandatory if we want to use the `query_as()`
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TestData {
    pub id: i64,
    pub ts: i64,
    pub description: String,
}

// the  From<&'r hiqlite::Row<'r>> is mandatory if we want to use the more efficient `query_map()`
impl<'r> From<&'r hiqlite::Row<'r>> for TestData {
    fn from(row: &'r hiqlite::Row<'r>) -> Self {
        // the fastest but more error-prone method is to use column index
        // with these, the order matters
        Self {
            id: row.get_unwrap(0),
            ts: row.get_unwrap(1),
            description: row.get_unwrap(2),
        }

        // you could also use the get by return column name, which is a
        // bit more safe but at the same time a tiny bit less fast
        // Self {
        //     id: row.get_unwrap("id"),
        //     ts: row.get_unwrap("ts"),
        //     description: row.get_unwrap("description"),
        // }
    }
}

pub async fn test_execute_query(
    client_1: &DbClient,
    client_2: &DbClient,
    client_3: &DbClient,
) -> Result<(), Error> {
    log("Creating test table");
    client_1
        .execute(
            r#"
    CREATE TABLE test
    (
        id          INTEGER NOT NULL
                     CONSTRAINT test_pk
                         PRIMARY KEY,
        ts          INTEGER NOT NULL,
        description TEXT    NOT NULL
    )
    "#,
            params!(),
        )
        .await?;

    log("Inserting test data");

    let data = TestData {
        id: 1,
        ts: Utc::now().timestamp(),
        description: "My First Row from client 1".to_string(),
    };
    let rows_affected = client_1
        .execute(
            "INSERT INTO test VALUES ($1, $2, $3)",
            params!(data.id, data.ts, data.description.clone()),
        )
        .await?;
    assert_eq!(rows_affected, 1);

    log("Making sure clients 2 and 3 can read the same data");

    let res: TestData = client_2
        .query_as_one("SELECT * FROM test WHERE id = $1", params!(1))
        .await?;
    assert_eq!(res.id, data.id);
    assert_eq!(res.ts, data.ts);
    assert_eq!(res.description, data.description);

    let res: TestData = client_3
        .query_map_one("SELECT * FROM test WHERE id = $1", params!(1))
        .await?;
    assert_eq!(res.id, data.id);
    assert_eq!(res.ts, data.ts);
    assert_eq!(res.description, data.description);

    log("Making sure the same insert and read works on the other nodes as well");

    let data = TestData {
        id: 2,
        ts: Utc::now().timestamp(),
        description: "My First Row from client 2".to_string(),
    };
    let rows_affected = client_2
        .execute(
            "INSERT INTO test VALUES ($1, $2, $3)",
            params!(data.id, data.ts, data.description.clone()),
        )
        .await?;
    assert_eq!(rows_affected, 1);

    log("Making sure clients 2 and 3 can read the same data");

    let res: TestData = client_1
        .query_as_one("SELECT * FROM test WHERE id = $1", params!(2))
        .await?;
    assert_eq!(res.id, data.id);
    assert_eq!(res.ts, data.ts);
    assert_eq!(res.description, data.description);

    let res: TestData = client_3
        .query_map_one("SELECT * FROM test WHERE id = $1", params!(2))
        .await?;
    assert_eq!(res.id, data.id);
    assert_eq!(res.ts, data.ts);
    assert_eq!(res.description, data.description);

    let data = TestData {
        id: 3,
        ts: Utc::now().timestamp(),
        description: "My First Row from client 3".to_string(),
    };
    let rows_affected = client_3
        .execute(
            "INSERT INTO test VALUES ($1, $2, $3)",
            params!(data.id, data.ts, data.description.clone()),
        )
        .await?;
    assert_eq!(rows_affected, 1);

    log("Making sure clients 2 and 3 can read the same data");

    let res: TestData = client_1
        .query_as_one("SELECT * FROM test WHERE id = $1", params!(3))
        .await?;
    assert_eq!(res.id, data.id);
    assert_eq!(res.ts, data.ts);
    assert_eq!(res.description, data.description);

    let res: TestData = client_2
        .query_map_one("SELECT * FROM test WHERE id = $1", params!(3))
        .await?;
    assert_eq!(res.id, data.id);
    assert_eq!(res.ts, data.ts);
    assert_eq!(res.description, data.description);

    log("Expecting unique key constraint error from SQLite");
    let res = client_3
        .execute(
            "INSERT INTO test VALUES ($1, $2, $3)",
            params!(data.id, data.ts, data.description.clone()),
        )
        .await;
    assert!(res.is_err());
    let err = format!("{:?}", res);
    assert!(err.starts_with("Err(Sqlite(\"UNIQUE constraint failed"));

    log("DELETE query and make sure data is gone");
    let rows_affected = client_1
        .execute("DELETE FROM test WHERE id = $1", params!(1))
        .await?;
    assert_eq!(rows_affected, 1);

    let res: Result<TestData, Error> = client_1
        .query_as_one("SELECT * FROM test WHERE id = $1", params!(1))
        .await;
    assert!(res.is_err());

    log("Query multiple rows with 'query_as()'");
    let res: Vec<TestData> = client_1.query_as("SELECT * FROM test", params!()).await?;
    assert_eq!(res.len(), 2);

    log("Query multiple rows with 'query_map()'");
    let res: Vec<TestData> = client_1.query_map("SELECT * FROM test", params!()).await?;
    assert_eq!(res.len(), 2);

    Ok(())
}
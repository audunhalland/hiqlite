use crate::execute_query::TestData;
use crate::{debug, log};
use hiqlite::{params, AppliedMigration, DbClient, Error};
use std::time::Duration;
use tokio::time;

// #[derive(rust_embed::Embed)]
// #[folder = "tests/cluster/migrations/bad_1"]
// struct MigrationBad1;

// #[derive(rust_embed::Embed)]
// #[folder = "tests/cluster/migrations/bad_2"]
// struct MigrationBad2;

#[derive(rust_embed::Embed)]
#[folder = "tests/cluster/migrations/bad_3"]
struct MigrationBad3;

#[derive(rust_embed::Embed)]
#[folder = "tests/cluster/migrations/good"]
struct MigrationGood;

pub async fn test_migrations(
    client_1: &DbClient,
    client_2: &DbClient,
    client_3: &DbClient,
) -> Result<(), Error> {
    // TODO the should_panic annotation does not work in this context -> maybe create separate tests
    // to catch these panic properly in the future, even though they do what they should when checking
    // manually

    // no leading integer index -> should panic
    // let res = client_1.migrate::<MigrationBad1>().await;
    // debug(&res);
    // assert!(res.is_err());

    // index does not start at 1 -> should panic
    // let res = client_1.migrate::<MigrationBad2>().await;
    // debug(&res);
    // assert!(res.is_err());

    log("Test bad sql syntax inside migration -> nothing should be applied");
    let res = client_1.migrate::<MigrationBad3>().await;
    debug(&res);
    assert!(res.is_err());

    log("Test migrations for client 1");
    apply_migrations(client_1).await?;
    test_migrations_are_correct(client_1).await?;

    time::sleep(Duration::from_millis(10)).await;

    log("Test migrations for client 2");
    test_migrations_are_correct(client_2).await?;

    log("Test migrations for client 3");
    test_migrations_are_correct(client_3).await?;

    log("Test multiple call to `.migrate()`");
    apply_migrations(client_2).await?;
    apply_migrations(client_3).await?;
    test_migrations_are_correct(client_1).await?;
    test_migrations_are_correct(client_2).await?;
    test_migrations_are_correct(client_3).await?;

    Ok(())
}

async fn apply_migrations(client: &DbClient) -> Result<(), Error> {
    log("Apply correct migration and make sure tables exist");
    let res = client.migrate::<MigrationGood>().await;
    debug(&res);
    assert!(res.is_ok());

    Ok(())
}

async fn test_migrations_are_correct(client: &DbClient) -> Result<(), Error> {
    // sql syntax error is in definition for table `bad_2`
    let res: Result<TestData, Error> = client.query_map_one("SELECT * FROM bad_1", params!()).await;
    assert!(res.is_err());
    if let Err(err) = res {
        let e = err.to_string();
        assert_eq!(e, "Sqlite: no such table: bad_1");
    }

    let res: Vec<TestData> = client.query_map("SELECT * FROM test", params!()).await?;
    assert!(res.is_empty());

    let res: Vec<TestData> = client.query_map("SELECT * FROM test_2", params!()).await?;
    assert!(res.is_empty());

    log("Make sure `_migrations` table exists and contains correct data");
    let migrations: Vec<AppliedMigration> = client
        .query_map("SELECT * FROM _migrations", params!())
        .await?;
    assert_eq!(migrations.len(), 2);
    debug(&migrations);

    assert_eq!(migrations[0].id, 1);
    assert_eq!(migrations[0].name, "init");
    assert_eq!(
        migrations[0].hash,
        "e710ab597974f5f7a8445d8d6827144d6aff6d1194a89fba58c3007915330e29"
    );

    assert_eq!(migrations[1].id, 2);
    assert_eq!(migrations[1].name, "another_migration");
    assert_eq!(
        migrations[1].hash,
        "c61c731c49a33a44ad56112365423f8d654e7ddbe9320f2492746aa61f54a733"
    );

    Ok(())
}

// #[should_panic]
// async fn test_bad_1(client: &DbClient) {
//     let res = client.migrate::<MigrationBad1>().await;
//     debug(&res);
//     assert!(res.is_err());
// }
CREATE TABLE test_2
(
    id          INTEGER NOT NULL
        CONSTRAINT test_pk
            PRIMARY KEY,
    ts          INTEGER NOT NULL,
    description TEXT    NOT NULL
);
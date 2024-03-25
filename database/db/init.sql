CREATE
    DATABASE IF NOT EXISTS mysql_database;
USE
    mysql_database;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id          CHAR(36) UNIQUE PRIMARY KEY NOT NULL,
    firstname   VARCHAR(255)                NOT NULL,
    lastname    VARCHAR(255)                NOT NULL,
    titleAfter  VARCHAR(255)                NULL,
    titleBefore VARCHAR(255)                NULL,
    email       VARCHAR(255) UNIQUE         NOT NULL,
    phone       VARCHAR(255)                NULL,
    birthday    DATE                        NULL,
    image       BLOB                        NULL,
    visibility  CHAR(12) DEFAULT 'ACTIVE'   NOT NULL,
    role        CHAR(12)                    NULL,
    password    CHAR(60)                    NOT NULL
);
INSERT INTO users (id, email, password, role, firstname,lastname)
values (UUID(), "pepa@uhk.cz", "$2a$12$BGdrBjMNbwp0uZ.jYyOVbOuqzLCFrgs7Tc9B1la0IghIYuyecU3Cu","ADMIN",
        "pepa","cervinka");
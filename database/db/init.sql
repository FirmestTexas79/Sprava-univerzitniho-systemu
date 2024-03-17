CREATE
DATABASE IF NOT EXISTS mysql_database;
    USE
mysql_database;
        DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id CHAR(36) UNIQUE PRIMARY KEY NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
);
INSERT INTO users (id, email, password) values (UUID(),"pepa@uhk.cz","$2a$12$BGdrBjMNbwp0uZ.jYyOVbOuqzLCFrgs7Tc9B1la0IghIYuyecU3Cu");
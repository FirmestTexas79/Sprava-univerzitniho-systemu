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
-- Insert sample users into the table
INSERT INTO users (id, firstname, lastname, email, phone, birthday, password, role, titleAfter)
VALUES (UUID(), 'Jan', 'Syn', 'jannovy1@gmail.com', '123456789', '1990-12-12',
        '$2a$12$ZYvSLB2zCe.kz6XzLK12tORVbgldZdEquKWh5DdwbKbfiwRjUN1la', 'TEACHER', 'Ing.'),
       (UUID(), 'Petr', 'Novak', 'petrnovak21@gmail.com', '987654321', '1995-01-01',
        '$2a$12$qom2EcKz1wuDeBr6aNH.6ORr.ohl.7F/IeTkzf70r9Cj1IJZa6lV2', 'STUDENT', null),
       (UUID(), 'Karel', 'Vomacka', 'karel.vomacka@gmail.com', '987654321', '1995-01-01',
        '$2a$12$7sENo8u297FCxIqWxdllqOW/LxpP2d9gR6K0uKrQlXrqgD3UaR6kO', 'ADMIN', null);
-- values (UUID(), "pepa@uhk.cz", "$2a$12$BGdrBjMNbwp0uZ.jYyOVbOuqzLCFrgs7Tc9B1la0IghIYuyecU3Cu","ADMIN",
--         "pepa","cervinka");
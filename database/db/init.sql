-- Drop the database if it exists
DROP DATABASE IF EXISTS mysql_database;

-- Create a new database
CREATE DATABASE IF NOT EXISTS mysql_database;

-- Use the newly created database
USE mysql_database;


-- Remove the tables if it exists
DROP TABLE IF EXISTS exams;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS student_schedule;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS student_activities;
DROP TABLE IF EXISTS auth_tokens;

-- Create a new table for users
CREATE TABLE users
(
    id          CHAR(36) UNIQUE PRIMARY KEY NOT NULL,
    firstname   VARCHAR(255)                NOT NULL,
    lastname    VARCHAR(255)                NOT NULL,
    titleAfter  CHAR(12)                    NULL,
    titleBefore CHAR(12)                    NULL,
    credits     INT                         NULL,
    email       VARCHAR(255) UNIQUE         NOT NULL,
    phone       VARCHAR(255)                NULL,
    birthday    DATE                        NULL,
    sex         INT                         NULL,
    image       BLOB                        NULL,
    visibility  CHAR(12) DEFAULT 'ACTIVE'   NOT NULL,
    role        CHAR(12)                    NULL,
    password    CHAR(60)                    NOT NULL
);

DELIMITER //
CREATE TRIGGER before_insert_users
    BEFORE INSERT
    ON users
    FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
END IF;
END;
//
DELIMITER ;

-- Insert sample users into the table
INSERT INTO users (id, firstname, lastname, email, phone, birthday, password, role, titleAfter, titleBefore, sex)
VALUES (UUID(), 'Jan', 'Syn', 'jannovy1@gmail.com', '123456789', '1990-12-12',
        '$2a$12$ZYvSLB2zCe.kz6XzLK12tORVbgldZdEquKWh5DdwbKbfiwRjUN1la', 'TEACHER', null, 'Ing.', 0),
       (UUID(), 'Petr', 'Novak', 'petrnovak21@gmail.com', '987654321', '1995-01-01',
        '$2a$12$qom2EcKz1wuDeBr6aNH.6ORr.ohl.7F/IeTkzf70r9Cj1IJZa6lV2', 'STUDENT', null, null, 0),
       (UUID(), 'Karel', 'Vomacka', 'karel.vomacka@gmail.com', '987654321', '1995-03-03',
        '$2a$12$7sENo8u297FCxIqWxdllqOW/LxpP2d9gR6K0uKrQlXrqgD3UaR6kO', 'ADMIN', null, null, 0),
       (UUID(), 'Jana', 'Vomackova', 'jana.vomackova@gmail.com', '987654421', '1995-02-02',
        '$2a$12$8ModX2PS/r6/YKesxGfH7.d35KJfIKU3pNEiZ9WUC7y4Yh2nvc6WG', 'TEACHER', 'PhDr.', 'Mgr.', 1),
       (UUID(), 'Adam', 'Novak', 'adamnovak@gmail.com', '123456789', '2000-05-15',
        '$2a$12$Vq4XP08FPn5rkbMUvZojp.SH5b2or3Uw/YQMq/4k5yJdmw8P4d3j6', 'STUDENT', 'Bc.', null, 0),
       (UUID(), 'Eva', 'Kovarova', 'evakovarova@gmail.com', '987654321', '2001-02-28',
        '$2a$12$XjMcXMao4eFyUlOpdWMAheQkvCvlYQ5wIbQWd8MwNSe6.xLRnIpjy', 'STUDENT', null, null, 1),
       (UUID(), 'Jakub', 'Svoboda', 'jakubsvoboda@gmail.com', '555555555', '1999-11-10',
        '$2a$12$OAIYJzb4aUPiUZZX4OSZYeO6XneZ0XHdWa5Z4CtqNaMiK.FidP6w6', 'STUDENT', 'Bc.', null, 0),
       (UUID(), 'Karolina', 'Novotna', 'karolinanovotna@gmail.com', '333333333', '2000-08-20',
        '$2a$12$YXBYz0oFD7nU6l5Xd.hzVuGiFQPKGVbD5HvHNSlySigtf7w9hGk2O', 'STUDENT', null, null, 1),
       (UUID(), 'Vlastimil', 'Kriz', 'petrkriz@gmail.com', '777777777', '2001-04-05',
        '$2a$12$LkR/6lwJbnknHsCCbfzx.OxOErirfivAe6T.ivOx15JRKOvQLHhai', 'STUDENT', 'Bc.', null, 0);

-- Create a new table for subjects
CREATE TABLE subjects
(
    id          CHAR(36) UNIQUE PRIMARY KEY NOT NULL,
    name        VARCHAR(255)                NOT NULL,
    short       VARCHAR(255)                NOT NULL,
    department  VARCHAR(255)                NOT NULL,
    credits     INT                         NOT NULL,
    guarantor   CHAR(36)                    NOT NULL,
    description VARCHAR(255)                NULL,
    category    VARCHAR(255)                NOT NULL,
    visibility  CHAR(12) DEFAULT 'ACTIVE'   NOT NULL,
    FOREIGN KEY (guarantor) REFERENCES users (id)
);

DELIMITER //
CREATE TRIGGER before_insert_subjects
    BEFORE INSERT
    ON subjects
    FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
END IF;
END;
//
DELIMITER ;

-- Insert sample subjects into the table
INSERT INTO subjects (id, name, short, department, guarantor, description, category,credits)
VALUES (UUID(), 'Databázové systémy 1', 'DBS1', 'KIV', (SELECT id FROM users WHERE firstname = 'Jan'),
        'Databázové systémy 1', 'Databázové systémy',6),
       (UUID(), 'Úvod do objektového modelování', 'UOMO', 'KIV', (SELECT id FROM users WHERE firstname = 'Jana'),
        'Úvod do objektového modelování', 'Objektové modelování',4);

-- Create a new table for rooms
CREATE TABLE rooms
(
    id          CHAR(36) UNIQUE PRIMARY KEY NOT NULL,
    name        VARCHAR(255)                NOT NULL,
    floor       INT                         NOT NULL,
    type        CHAR(24)                    NULL,
    description VARCHAR(255)                NULL,
    capacity    INT                         NOT NULL,
    visibility  CHAR(12) DEFAULT 'ACTIVE'   NOT NULL
);

DELIMITER //
CREATE TRIGGER before_insert_rooms
    BEFORE INSERT
    ON rooms
    FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
END IF;
END;
//
DELIMITER ;

-- Insert sample rooms into the table
INSERT INTO rooms (id, name, floor, type, description, capacity)
VALUES (UUID(), 'A1', 1, 'COMPUTERS', 'Počítačová učebna A1', 30),
       (UUID(), 'A2', 1, 'LABORATORY', 'Laboratoř Počítačových Sítí', 30),
       (UUID(), 'A3', 1, 'LABORATORY', 'Laboratoř Robotiky', 18),
       (UUID(), 'A4', 1, 'LECTURE', 'Přednášková A4', 18),
       (UUID(), 'A5', 1, 'LECTURE', 'Přednášková A5', 18),
       (UUID(), 'A6', 1, 'SEMINAR', 'Místnost A6', 30),
       (UUID(), 'A7', 1, 'SEMINAR', 'Místnost A7', 10),
       (UUID(), 'A8', 1, 'SEMINAR', 'Místnost A8', 10),
       (UUID(), 'A9', 2, 'COMPUTERS', 'Počítačová učebna A9', 30);

-- Create a new table for exams
CREATE TABLE exams
(
    id          CHAR(36) UNIQUE PRIMARY KEY NOT NULL,
    name        VARCHAR(255)                NOT NULL,
    type        CHAR(12)                    NOT NULL,
    start       DATETIME                    NOT NULL,
    end         DATETIME                    NOT NULL,
    score       INT                         NULL,
    visibility  CHAR(12) DEFAULT 'ACTIVE'   NOT NULL,
    teacher     CHAR(36)                    NOT NULL,
    subject     CHAR(36)                    NOT NULL,
    capacity    INT                         NOT NULL,
    room        CHAR(36)                    NULL,
    description VARCHAR(255)                NULL,
    FOREIGN KEY (teacher) REFERENCES users (id),
    FOREIGN KEY (subject) REFERENCES subjects (id),
    FOREIGN KEY (room) REFERENCES rooms (id)
);

DELIMITER //
CREATE TRIGGER before_insert_exams
    BEFORE INSERT
    ON exams
    FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
END IF;
END;
//
DELIMITER ;

-- Insert sample exams into the table
INSERT INTO exams (id, name, type, start, end, teacher, subject, capacity, room, description)
VALUES (UUID(), 'Zkouška z Databázových systémů 1', 'EXAM', '2021-06-01 08:00:00', '2021-06-01 10:00:00',
        (SELECT id FROM users WHERE firstname = 'Jan'), (SELECT id FROM subjects WHERE name = 'Databázové systémy 1'),
        30, (SELECT id FROM rooms WHERE name = 'A1'), 'Zkouška z Databázových systémů 1'),
       (UUID(), 'Zkouška z Úvodu do objektového modelování', 'EXAM', '2021-06-01 08:00:00', '2021-06-01 10:00:00',
        (SELECT id FROM users WHERE firstname = 'Jan'),
        (SELECT id FROM subjects WHERE name = 'Úvod do objektového modelování'),
        30, (SELECT id FROM rooms WHERE name = 'A1'), 'Zkouška z Úvodu do objektového modelování');

-- Create a new table for ratings
CREATE TABLE ratings
(
    id         CHAR(36) UNIQUE PRIMARY KEY        NOT NULL,
    student    CHAR(36)                           NOT NULL,
    date       DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    exam       CHAR(36)                           NOT NULL,
    rating     INT                                NOT NULL,
    visibility CHAR(12) DEFAULT 'ACTIVE'          NOT NULL,
    FOREIGN KEY (student) REFERENCES users (id),
    FOREIGN KEY (exam) REFERENCES exams (id)
);

DELIMITER //
CREATE TRIGGER before_insert_ratings
    BEFORE INSERT
    ON ratings
    FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
END IF;
END;
//
DELIMITER ;

-- Insert sample ratings into the table
INSERT INTO ratings (id, student, exam, rating)
VALUES (UUID(), (SELECT id FROM users WHERE firstname = 'Petr'),
        (SELECT id FROM exams WHERE name = 'Zkouška z Databázových systémů 1'), 1),
       (UUID(), (SELECT id FROM users WHERE firstname = 'Petr'),
        (SELECT id FROM exams WHERE name = 'Zkouška z Úvodu do objektového modelování'), 2);

-- Create a new table for student_schedule
CREATE TABLE student_schedule
(
    id         CHAR(36) UNIQUE PRIMARY KEY NOT NULL,
    student    CHAR(36)                    NOT NULL,
    subject    CHAR(36)                    NOT NULL,
    teacher    CHAR(36)                    NOT NULL,
    room       CHAR(36)                    NULL,
    visibility CHAR(12) DEFAULT 'ACTIVE'   NOT NULL,
    start      DATETIME                    NULL,
    end        DATETIME                    NULL,
    FOREIGN KEY (student) REFERENCES users (id),
    FOREIGN KEY (teacher) REFERENCES users (id),
    FOREIGN KEY (subject) REFERENCES subjects (id),
    FOREIGN KEY (room) REFERENCES rooms (id)
);

DELIMITER //
CREATE TRIGGER before_insert_student_schedule
    BEFORE INSERT
    ON student_schedule
    FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
END IF;
END;
//
DELIMITER ;

-- Create a new table for activities
CREATE TABLE activities
(
    id          CHAR(36) UNIQUE PRIMARY KEY NOT NULL,
    name        VARCHAR(255)                NOT NULL,
    visibility  CHAR(12) DEFAULT 'ACTIVE'   NOT NULL,
    description VARCHAR(255)                NULL
);

DELIMITER //
CREATE TRIGGER before_insert_activities
    BEFORE INSERT
    ON activities
    FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
END IF;
END;
//
DELIMITER ;

-- Insert sample activities into the table
INSERT INTO activities (id, name, description)
VALUES (UUID(), 'Sebeobrana', 'Cely semestr se budete snazit lidi zmrzacit, ale nezabit, noveho partaka nedostanete'),
       (UUID(), 'Potapeni', 'Pojedes nekam dopric a budes rad, kdyz se neutopis, snad ti za to ty kredity stoji'),
       (UUID(), 'Fitko', 'Fitness lvl nekonecno, 3krat se tam ukazes a jsi nejvic fit'),
       (UUID(), 'Vikendovka', 'Sice prijdes o obe nohy, ale to nejak rozchodis');


-- Create a new table for auth_tokens
CREATE TABLE auth_tokens
(
    id         CHAR(36) UNIQUE PRIMARY KEY NOT NULL,
    user       CHAR(36) UNIQUE             NOT NULL,
    token      CHAR(255)                   NOT NULL,
    expiration DATETIME                    NOT NULL,
    visibility CHAR(12) DEFAULT 'ACTIVE'   NOT NULL,
    FOREIGN KEY (user) REFERENCES users (id)
);

DELIMITER //
CREATE TRIGGER before_insert_auth_tokens
    BEFORE INSERT
    ON auth_tokens
    FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
END IF;
END;
//
DELIMITER ;
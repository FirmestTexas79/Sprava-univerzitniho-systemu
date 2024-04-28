GRANT ALL PRIVILEGES ON *.* TO 'user'@'%';
FLUSH PRIVILEGES;

INSERT INTO `fields_of_study` (`id`, `name`, `createdAt`, `updatedAt`, `duration`, `type`)
VALUES ('clvh9c4t30004356x7bandnpjA', 'Aplikovaná Informatika', '2021-05-02 00:00:00.000', '2021-05-02 00:00:00.000', 3,
        'BACHELOR'),
       ('clvh9c4t30004356x7bandnpjB', 'Aplikovaná Informatika', '2021-05-02 00:00:00.000', '2021-05-02 00:00:00.000', 2,
        'MAGISTER'),
       ('clvh9c4t30004356x7bandnpjC', 'Aplikovaná Informatika', '2021-05-02 00:00:00.000', '2021-05-02 00:00:00.000', 4,
        'DOCTORAL');

-- password: Password1
INSERT INTO `users` (`id`, `firstname`, `lastname`, `password`, `email`, `birthdate`, `role`, `sex`, `createdAt`,
                     `updatedAt`, `fieldOfStudyId`, `year`)
VALUES ('clvh9c3t30004356x7bandnpjZ', 'Vlastimil', 'Bureš',
        '$argon2id$v=19$m=65536,t=3,p=4$dBtduH+22brzrY3Ogp+fXA$vkpdi9+F7f9Yi1kD45LCtoO1PVv8r8Rq2M0JFT0ch3o',
        'vlastaburak@seznam.cz', '2000-11-02 00:00:00.000', 'ADMIN', 'MALE', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000', null, null),
       ('clvh9c4t31004356x7bandnpjX', 'Jan', 'Novák',
        '$argon2id$v=19$m=65536,t=3,p=4$dBtduH+22brzrY3Ogp+fXA$vkpdi9+F7f9Yi1kD45LCtoO1PVv8r8Rq2M0JFT0ch3o',
        'vlastabures13@gmail.com', '2000-11-02 00:00:00.000', 'STUDENT', 'MALE', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000', 'clvh9c4t30004356x7bandnpjA', null),
       ('clvh9c4t32004356x7bandnpjY', 'Jana', 'Nováková',
        '$argon2id$v=19$m=65536,t=3,p=4$dBtduH+22brzrY3Ogp+fXA$vkpdi9+F7f9Yi1kD45LCtoO1PVv8r8Rq2M0JFT0ch3o',
        'samurajcz222@gmail.com', '2000-11-02 00:00:00.000', 'TEACHER', 'FEMALE', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000', null, null),
       ('clvh9c4t33004356x7bandnpjW', 'Lukáš', 'Nový',
        '$argon2id$v=19$m=65536,t=3,p=4$dBtduH+22brzrY3Ogp+fXA$vkpdi9+F7f9Yi1kD45LCtoO1PVv8r8Rq2M0JFT0ch3o',
        'buresvl2@uhk.cz', '2000-11-02 00:00:00.000', 'TEACHER', 'MALE', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000', null, null);

INSERT INTO `subjects` (`id`, `name`, `createdAt`, `updatedAt`, `credits`, `shortName`, `category`, `department`,
                        `guarantorId`)
VALUES ('clvh9c4t30104356x7bandnpj1', 'Programování 1', '2021-05-02 00:00:00.000', '2021-05-02 00:00:00.000', 5, 'PG1',
        'BASIC', 'KIV', 'clvh9c4t32004356x7bandnpjY'),
       ('clvh9c4t30204356x7bandnpj2', 'Matematika 1', '2021-05-02 00:00:00.000', '2021-05-02 00:00:00.000', 5, 'MAT1',
        'BASIC', 'KIV', 'clvh9c4t33004356x7bandnpjW');

INSERT INTO `rooms` (`id`, `name`, `createdAt`, `updatedAt`, `capacity`, `type`, `floor`)
VALUES ('clvh9c4t30014356x7bandnpjR', 'A1', '2021-05-02 00:00:00.000', '2021-05-02 00:00:00.000', 50, 'LECTURE', 1),
       ('clvh9c4t30024356x7bandnpjT', 'A2', '2021-05-02 00:00:00.000', '2021-05-02 00:00:00.000', 50, 'LECTURE', 1),
       ('clvh9c4t30034356x7bandnpjU', 'A3', '2021-05-02 00:00:00.000', '2021-05-02 00:00:00.000', 18, 'COMPUTERS', 1),
       ('clvh9c4t30044356x7bandnpjV', 'A4', '2021-05-02 00:00:00.000', '2021-05-02 00:00:00.000', 18, 'COMPUTERS', 1),
       ('clvh9c4t30054356x7bandnpjZ', 'A5', '2021-05-02 00:00:00.000', '2021-05-02 00:00:00.000', 8, 'LABORATORY', 1);

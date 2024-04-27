GRANT ALL PRIVILEGES ON *.* TO 'user'@'%';
FLUSH PRIVILEGES;

INSERT INTO `fields_of_study` (`id`, `name`, `duration`, `type`, `createdAt`, `updatedAt`)
VALUES ('clvh9c4t30004356x7bandnpjA', 'Aplikovaná Informatika', 3, 'BACHELOR', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000'),
       ('clvh9c4t30004356x7bandnpjB', 'Aplikovaná Informatika', 2, 'MAGISTER', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000'),
       ('clvh9c4t30004356x7bandnpjC', 'Aplikovaná Informatika', 4, 'DOCTORAL', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000'),
       ('clvh9c4t30004356x7bandnpjD', 'Management', 3, 'BACHELOR', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000'),
       ('clvh9c4t30004356x7bandnpjE', 'Management', 2, 'MAGISTER', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000'),
       ('clvh9c4t30004356x7bandnpjF', 'Management', 4, 'DOCTORAL', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000');

-- password: Password1
INSERT INTO `users` (`id`, `firstname`, `lastname`, `password`, `email`, `birthdate`, `role`, `sex`, `createdAt`,
                     `updatedAt`, `fieldOfStudyId`)
VALUES ('clvh9c4t30004356x7bandnpjZ', 'Vlastimil', 'Bureš',
        '$argon2id$v=19$m=65536,t=3,p=4$dBtduH+22brzrY3Ogp+fXA$vkpdi9+F7f9Yi1kD45LCtoO1PVv8r8Rq2M0JFT0ch3o',
        'vlasaburak@seznam.cz', '2000-11-02 00:00:00.000', 'ADMIN', 'MALE', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000', null),
       ('clvh9c4t30004356x7bandnpjX', 'Jan', 'Novák',
        '$argon2id$v=19$m=65536,t=3,p=4$dBtduH+22brzrY3Ogp+fXA$vkpdi9+F7f9Yi1kD45LCtoO1PVv8r8Rq2M0JFT0ch3o',
        'vlastabures13@gmail.com', '2000-11-02 00:00:00.000', 'STUDENT', 'MALE', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000', null),
       ('clvh9c4t30004356x7bandnpjY', 'Jana', 'Nováková',
        '$argon2id$v=19$m=65536,t=3,p=4$dBtduH+22brzrY3Ogp+fXA$vkpdi9+F7f9Yi1kD45LCtoO1PVv8r8Rq2M0JFT0ch3o',
        'samurajcz222@gmail.com', '2000-11-02 00:00:00.000', 'TEACHER', 'FEMALE', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000', 'clvh9c4t30004356x7bandnpjA');

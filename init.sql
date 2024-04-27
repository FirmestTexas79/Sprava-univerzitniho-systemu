GRANT ALL PRIVILEGES ON *.* TO 'user'@'%';
FLUSH PRIVILEGES;

-- password: Password1
INSERT INTO `users` (`id`, `firstname`, `lastname`, `password`, `email`, `birthdate`, `role`, `sex`, `createdAt`,
                     `updatedAt`)
VALUES ('clvh9c4t31004356x7bandnpjZ', 'Vlastimil', 'Bureš',
        '$argon2id$v=19$m=65536,t=3,p=4$dBtduH+22brzrY3Ogp+fXA$vkpdi9+F7f9Yi1kD45LCtoO1PVv8r8Rq2M0JFT0ch3o',
        'vlastaburak@seznam.cz', '2000-11-02 00:00:00.000', 'ADMIN', 'MALE', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000'),
       ('clvh9c4t32004356x7bandnpjZ', 'Jan', 'Novák',
        '$argon2id$v=19$m=65536,t=3,p=4$dBtduH+22brzrY3Ogp+fXA$vkpdi9+F7f9Yi1kD45LCtoO1PVv8r8Rq2M0JFT0ch3o',
        'vlastabures13@gmail.com', '2000-11-02 00:00:00.000', 'STUDENT', 'MALE', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000'),
       ('clvh9c4t30004356x7bandnpjZ', 'Jana', 'Nováková',
        '$argon2id$v=19$m=65536,t=3,p=4$dBtduH+22brzrY3Ogp+fXA$vkpdi9+F7f9Yi1kD45LCtoO1PVv8r8Rq2M0JFT0ch3o',
        'samurajcz222@gmail.com', '2000-11-02 00:00:00.000', 'TEACHER', 'FEMALE', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000');

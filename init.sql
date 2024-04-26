GRANT ALL PRIVILEGES ON *.* TO 'user'@'%';
FLUSH PRIVILEGES;

INSERT INTO `users` (`id`, `firstname`, `lastname`, `password`, `email`, `birthdate`, `role`, `sex`, `createdAt`,
                     `updatedAt`)
VALUES ('clvh9c4t30004356x7bandnpjZ', 'Vlastimil', 'Bureš',
        '$argon2id$v=19$m=65536,t=3,p=4$5EPt/wjv7qT4820JM5wtsg$FkXLmzFDdOsOYKpS4OcfjaPV3dlyqTDPcs2IhoO+Y5g',
        'vlasaburak@seznam.cz', '2000-11-02 00:00:00.000', 'ADMIN', 'MALE', '2021-05-02 00:00:00.000',
        '2021-05-02 00:00:00.000');

insert into users (id, email, password)
values
(1, 'msbartosik@gmail.com', '$2y$10$.j0E2Z8OkhIu9n7CvTdF5.tUknMUb9eo6cfffSrL7Ua2b02aUsTLi');

insert into movies (id, title, release_date, vote_average, poster_path)
values
(680, 'Pulp Fiction', '1994-09-10', 8.5, '/plnlrtBUULT0rh3Xsjmpubiso3L.jpg'),
(429, 'The Good, the Bad and the Ugly', '1966-12-23', 8.5, '/eWivEg4ugIMAd7d4uWI37b17Cgj.jpg'),
(807, 'Se7en', '1995-09-22', 8.3, '/6yoghtyTpznpBik8EngEmJskVUO.jpg');

insert into genres (id, name)
values
(53, 'Thriller'),
(80, 'Crime'),
(37, 'Western'),
(9648, 'Mystery');

insert into movie_genres (movie_id, genre_id)
values
(680, 53),
(680, 80),
(429, 37),
(807, 80),
(807, 9648),
(807, 53);

insert into favorites (movie_id, user_id)
values
(680, 1),
(429, 1),
(807, 1);

insert into users (id, email, password)
values
(1, 'msbartosik@gmail.com', '$2y$10$VxHQsCWZkQC4c95EdGF5ouj0k9TPFU3.s2DgZ6wbhXNC.G37IytTO');

insert into movies (id, title, release_date, vote_average, poster_path)
values
(680, 'Pulp Fiction', '1994-09-10', 8.5, '/plnlrtBUULT0rh3Xsjmpubiso3L.jpg'),
(429, 'The Good, the Bad and the Ugly', '1966-12-23', 8.5, '/eWivEg4ugIMAd7d4uWI37b17Cgj.jpg'),
(807, 'Se7en', '1995-09-22', 8.3, '/6yoghtyTpznpBik8EngEmJskVUO.jpg'),
(509635, 'Alone', '2020-09-10', 6.2, '/n9OzZmPMnVrV0cMQ7amX0DtBkQH.jpg');

insert into favorites (movie_id, user_id)
values
(680, 1),
(429, 1),
(807, 1);

insert into watchlist (movie_id, user_id)
values
(509635, 1);

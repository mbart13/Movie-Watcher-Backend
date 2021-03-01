![obraz](https://user-images.githubusercontent.com/36601103/109544235-9ada2400-7ac7-11eb-9c34-d19bd1bac74b.png)

# Movie Watcher
https://movie-watcher.vercel.app  
(since backend is deployed on free heroku dyno, some parts of the application will take some time to start)

## Frontend

https://github.com/mbart13/Movie-Watcher


Movie Watcher is an app for browsing movies. Some additional features are available after registering and logging into account.

Tools: 
* Angular;
* Angular Material for some components;
* Spring Boot/Spring Security/Spring Data Jpa;
* PostgreSQL;
* Frontend deployed on Vercel;
* Backend deployed on Heroku;
* Docker;

Some interesting technical aspects:
* code splitting;
* asynchronous and synchronous form validation;
* autologin and autologout depending if token is not expired;
* authorization with JWT;
* REST API;

Application allowes: 
* to filter and search in movie database (powered by TMDB API);
* to view movie details;
* create user account to add movies to favorites and watchlist.

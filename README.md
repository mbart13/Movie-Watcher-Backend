![obraz](https://user-images.githubusercontent.com/36601103/109544235-9ada2400-7ac7-11eb-9c34-d19bd1bac74b.png)

# Movie Watcher
https://movie-watcher.vercel.app  
(since backend is deployed on heroku, some functionalities may work with 30 seconds delay)

## Frontend

https://github.com/mbart13/Movie-Watcher


Movie Watcher is an app for browsing movies. Some additional features are available after registering and logging into account.

Tools: 
* Angular;
* Angular Material for some components;
* Spring Boot/Spring Security/Spring Data Jpa;
* PostgreSQL;

Some interesting technical aspects:
* lazy loading;
* asynchronous and synchronous form validation;
* autologin and autologout depending if token is not expired;
* authorization with JWT;
* REST API;

Application allowes: 
* to filter and search in movie database (powered by TMDB API);
* to view movie details;
* create user Account to add movie to favorites and watchlist.

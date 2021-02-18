package com.codecool.moviewatcher.controller;

import com.codecool.moviewatcher.auth.User;
import com.codecool.moviewatcher.dto.MovieDto;
import com.codecool.moviewatcher.dto.UserDto;
import com.codecool.moviewatcher.dto.mappers.UserMapper;
import com.codecool.moviewatcher.exceptions.EntityNotFoundException;
import com.codecool.moviewatcher.service.MovieService;
import com.codecool.moviewatcher.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:4200", "https://movie-watcher.vercel.app"})
@RequestMapping("/api/v1/users")
public class MoviesController {

    private final MovieService movieService;
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/{userId}/favorites")
    public List<MovieDto> getFavoriteMovies(@PathVariable Long userId) {
        return movieService.getFavoriteMovies(userId);
    }

    @PostMapping("/{userId}/favorites")
    @ResponseStatus(HttpStatus.CREATED)
    public void addMovieToFavorites(@PathVariable Long userId, @RequestBody MovieDto movieDto) {
        movieService.addToFavorites(userId, movieDto);
    }

    @DeleteMapping("/{userId}/favorites/{movieId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeMovieFromFavorites(@PathVariable("userId") Long userId, @PathVariable("movieId") Long movieId) {
        movieService.removeFromFavorites(userId, movieId);
    }

    @GetMapping("/{userId}/watchlist")
    public List<MovieDto> getWatchlistMovies(@PathVariable Long userId) {
        return movieService.getWatchlistMovies(userId);
    }

    @PostMapping("/{userId}/watchlist")
    @ResponseStatus(HttpStatus.CREATED)
    public void addMovieToWatchlist(@PathVariable Long userId, @RequestBody MovieDto movieDto) {
        movieService.addToWatchlist(userId, movieDto);
    }

    @DeleteMapping("/{userId}/watchlist/{movieId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeMovieFromWatchlist(@PathVariable("userId") Long userId, @PathVariable("movieId") Long movieId) {
        movieService.removeFromWatchlist(userId, movieId);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserData(@PathVariable("userId") Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(userMapper.userToUserDto(user));
    }

    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<String> handleNotFoundException(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}

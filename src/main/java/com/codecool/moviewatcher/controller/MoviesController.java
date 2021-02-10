package com.codecool.moviewatcher.controller;

import com.codecool.moviewatcher.auth.User;
import com.codecool.moviewatcher.dto.MovieDto;
import com.codecool.moviewatcher.exceptions.EntityNotFoundException;
import com.codecool.moviewatcher.model.Movie;
import com.codecool.moviewatcher.service.MovieService;
import com.codecool.moviewatcher.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class MoviesController {

    private final MovieService movieService;

    @GetMapping("/{id}/favorites")
    public List<MovieDto> getFavoriteMovies(@PathVariable Long id) {
        return movieService.getFavoriteMovies(id);
    }

    @PostMapping("/{id}/favorites")
    @ResponseStatus(HttpStatus.CREATED)
    public void addMovieToFavorites(@PathVariable Long id, @RequestBody MovieDto movieDto) {
        movieService.addToFavorites(id, movieDto);
    }

    @DeleteMapping("/{user_id}/favorites/{movie_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeMovieFromFavorites(@PathVariable("user_id") Long userId, @PathVariable("movie_id") Long movieId) {
        movieService.removeFromFavorites(userId, movieId);
    }

    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<String> handleNotFoundException(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}

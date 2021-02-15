package com.codecool.moviewatcher.service;

import com.codecool.moviewatcher.auth.User;
import com.codecool.moviewatcher.dto.MovieDto;
import com.codecool.moviewatcher.dto.mappers.MovieMapper;
import com.codecool.moviewatcher.exceptions.EntityNotFoundException;
import com.codecool.moviewatcher.model.Movie;
import com.codecool.moviewatcher.repository.MovieRepository;
import com.codecool.moviewatcher.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;
    private final UserService userService;
    private final UserRepository userRepository;

    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() ->  new EntityNotFoundException(String.format("Movie with id = %d was not found", id)));
    }

    public List<MovieDto> getFavoriteMovies(Long id) {
        User user = userService.getUserById(id);
        return movieMapper.movieListToMovieDtoList(user.getFavorites());
    }

    public void addToFavorites(Long userId, MovieDto movieDto) {
        User user = userService.getUserById(userId);
        user.addMovieToFavorites(handleIncomingMovie(movieDto));
        userRepository.save(user);
    }

    public void removeFromFavorites(Long userId, Long movieId) {
        User user = userService.getUserById(userId);
        Movie movie = getMovieById(movieId);
        user.removeMovieFromFavorites(movie);
        userRepository.save(user);
    }

    public List<MovieDto> getWatchlistMovies(Long id) {
        User user = userService.getUserById(id);
        return movieMapper.movieListToMovieDtoList(user.getWatchlist());
    }

    public void addToWatchlist(Long userId, MovieDto movieDto) {
        User user = userService.getUserById(userId);
        user.addMovieToWatchlist(handleIncomingMovie(movieDto));
        userRepository.save(user);
    }

    public void removeFromWatchlist(Long userId, Long movieId) {
        User user = userService.getUserById(userId);
        Movie movie = getMovieById(movieId);
        user.removeMovieFromWatchlist(movie);
        userRepository.save(user);
    }

    private Movie handleIncomingMovie(MovieDto movieDto) {
        Optional<Movie> maybeMovie = movieRepository.findById(movieDto.getId());
        Movie movie = null;
        if (maybeMovie.isEmpty()) {
            movie = movieMapper.movieDtoToMovie(movieDto);
        }
        return maybeMovie.orElse(movie);
    }
}

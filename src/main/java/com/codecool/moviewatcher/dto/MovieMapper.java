package com.codecool.moviewatcher.dto;

import com.codecool.moviewatcher.model.Movie;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.Set;

@Mapper
@Component
public interface MovieMapper {

    Movie movieDtoToMovie(MovieDto movieDto);

    MovieDto movieToMovieDto(Movie movie);

    Set<MovieDto> movieListToMovieDtoList(Set<Movie> userList);
}

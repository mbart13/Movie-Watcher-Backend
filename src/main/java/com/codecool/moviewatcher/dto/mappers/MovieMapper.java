package com.codecool.moviewatcher.dto.mappers;

import com.codecool.moviewatcher.dto.MovieDto;
import com.codecool.moviewatcher.model.Movie;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface MovieMapper {

    Movie movieDtoToMovie(MovieDto movieDto);

    MovieDto movieToMovieDto(Movie movie);

    List<MovieDto> movieListToMovieDtoList(List<Movie> userList);
}

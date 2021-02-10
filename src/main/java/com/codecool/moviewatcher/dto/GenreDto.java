package com.codecool.moviewatcher.dto;

import com.codecool.moviewatcher.model.Movie;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class GenreDto {

    private Long id;
    private String name;

    private Set<Movie> movies;
}

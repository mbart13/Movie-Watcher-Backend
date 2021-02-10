package com.codecool.moviewatcher.dto;

import com.codecool.moviewatcher.auth.User;
import com.codecool.moviewatcher.model.Genre;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class MovieDto {

    private Long id;
    private String title;
    private double voteAverage;
    private String releaseDate;
    private String posterPath;
    private Set<Genre> genres;
    @JsonIgnore
    private Set<User> favoritedBy;
}

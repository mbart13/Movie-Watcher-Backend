package com.codecool.moviewatcher.dto;

import com.codecool.moviewatcher.auth.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class MovieDto {

    private Long id;
    private String title;
    @JsonProperty("vote_average")
    private double voteAverage;
    @JsonProperty("release_date")
    private String releaseDate;
    @JsonProperty("poster_path")
    private String posterPath;
    @JsonIgnore
    private Set<User> likedBy;
    @JsonIgnore
    private Set<User> watchlistedBy;
}

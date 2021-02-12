package com.codecool.moviewatcher.dto;

import com.codecool.moviewatcher.model.Movie;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class UserDto {

    private Long id;
    private String email;
    @JsonIgnore
    private String password;
    @JsonIgnore
    private Timestamp createdDate;
    private Set<Movie> favorites = new HashSet<>();
    private Set<Movie> watchlist = new HashSet<>();

}

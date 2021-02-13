package com.codecool.moviewatcher.dto;

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
    private Set<MovieDto> favorites = new HashSet<>();
    private Set<MovieDto> watchlist = new HashSet<>();

}

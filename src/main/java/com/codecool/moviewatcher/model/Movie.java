package com.codecool.moviewatcher.model;

import com.codecool.moviewatcher.auth.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "movies")
public class Movie implements Serializable {

    @Id
    private Long id;
    private String title;
    private double voteAverage;
    private String releaseDate;
    private String posterPath;

    @ManyToMany(fetch  = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(
            name = "favorites",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> likedBy = new HashSet<>();

    @ManyToMany(fetch  = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(
            name = "watchlist",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> watchlistedBy = new HashSet<>();

}

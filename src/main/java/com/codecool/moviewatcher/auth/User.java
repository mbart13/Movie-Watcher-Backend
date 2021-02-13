package com.codecool.moviewatcher.auth;

import com.codecool.moviewatcher.model.Movie;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String email;

    private String password;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdDate;

    @ManyToMany(mappedBy = "likedBy", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Movie> favorites = new ArrayList<>();

    @ManyToMany(mappedBy = "watchlistedBy", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Movie> watchlist = new ArrayList<>();

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public void addMovieToFavorites(Movie movie) {
        favorites.add(movie);
        movie.getLikedBy().add(this);
    }

    public void removeMovieFromFavorites(Movie movie) {
        favorites.remove(movie);
        movie.getLikedBy().remove(this);
    }

    public void addMovieToWatchlist(Movie movie) {
        watchlist.add(movie);
        movie.getWatchlistedBy().add(this);
    }

    public void removeMovieFromWatchlist(Movie movie) {
        watchlist.remove(movie);
        movie.getWatchlistedBy().remove(this);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        final SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("USER");
        return Collections.singletonList(simpleGrantedAuthority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

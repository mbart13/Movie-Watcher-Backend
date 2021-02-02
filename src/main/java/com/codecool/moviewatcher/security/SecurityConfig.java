package com.codecool.moviewatcher.security;

import com.codecool.moviewatcher.filters.JsonObjectAuthenticationFilter;
import com.codecool.moviewatcher.filters.JwtTokenVerifier;
import com.codecool.moviewatcher.jwt.JwtConfig;
import com.codecool.moviewatcher.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@AllArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConfig jwtConfig;
    private final JwtUtils jwtUtils;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new JsonObjectAuthenticationFilter(authenticationManager(), jwtUtils))
                .addFilterAfter(new JwtTokenVerifier(jwtUtils, jwtConfig), JsonObjectAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/login", "/register", "/h2-console/**").permitAll()
                .anyRequest()
                .authenticated();

        http.headers().frameOptions().disable();
    }
}

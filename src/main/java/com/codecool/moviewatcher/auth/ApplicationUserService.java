package com.codecool.moviewatcher.auth;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Primary
@Service
public class ApplicationUserService implements UserDetailsService {

    private final UserDaoService userDaoService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userDaoService.findUserByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format("User was not found: %s", email)));
    }
}

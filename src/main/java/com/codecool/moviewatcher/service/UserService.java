package com.codecool.moviewatcher.service;

import com.codecool.moviewatcher.auth.ApplicationUser;
import com.codecool.moviewatcher.dto.CredentialsDto;
import com.codecool.moviewatcher.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public List<ApplicationUser> getAllUsers() {
        return userRepository.findAll();
    }

    public Authentication login(CredentialsDto credentialsDto) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentialsDto.getEmail(),
                credentialsDto.getPassword()));
    }

    public void registerUser(CredentialsDto credentialsDto) {
        userRepository.save(new ApplicationUser(credentialsDto.getEmail(), passwordEncoder.encode(credentialsDto.getPassword())));
    }
}

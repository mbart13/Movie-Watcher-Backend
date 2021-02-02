package com.codecool.moviewatcher.service;

import com.codecool.moviewatcher.auth.ApplicationUser;
import com.codecool.moviewatcher.dto.CredentialsDto;
import com.codecool.moviewatcher.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<ApplicationUser> getAllUsers() {
        return userRepository.findAll();
    }

    public void registerUser(CredentialsDto credentialsDto) {
        userRepository.save(new ApplicationUser(credentialsDto.getEmail(), passwordEncoder.encode(credentialsDto.getPassword())));
    }
}

package com.codecool.moviewatcher.service;

import com.codecool.moviewatcher.auth.User;
import com.codecool.moviewatcher.dto.CredentialsDto;
import com.codecool.moviewatcher.exceptions.ValidationException;
import com.codecool.moviewatcher.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Authentication login(CredentialsDto credentialsDto) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentialsDto.getEmail(),
                credentialsDto.getPassword()));
    }

    public void registerUser(CredentialsDto credentialsDto) {
        User user = new User(credentialsDto.getEmail(), passwordEncoder.encode(credentialsDto.getPassword()));
        checkIfUserExists(user.getEmail());
        userRepository.save(user);
    }

    private void checkIfUserExists(String email) {
        Optional<User> maybeUser = userRepository.findByEmail(email);
        if (maybeUser.isPresent()) {
            throw new ValidationException("Email already exists: " + maybeUser.get().getUsername());
        }
    }
}

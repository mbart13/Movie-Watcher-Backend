package com.codecool.moviewatcher.service;

import com.codecool.moviewatcher.auth.User;
import com.codecool.moviewatcher.dto.CredentialsDto;
import com.codecool.moviewatcher.exceptions.EntityNotFoundException;
import com.codecool.moviewatcher.exceptions.ValidationException;
import com.codecool.moviewatcher.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() ->  new EntityNotFoundException(String.format("User with id = %d was not found", id)));
    }

    public Authentication login(CredentialsDto credentialsDto) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentialsDto.getEmail(),
                credentialsDto.getPassword()));
    }

    public void registerUser(CredentialsDto credentialsDto) {
        User user = new User(credentialsDto.getEmail(), passwordEncoder.encode(credentialsDto.getPassword()));
        checkIfEmailExists(user.getEmail());
        userRepository.save(user);
    }

    public void checkIfEmailExists(String email) {
        Optional<User> maybeUser = userRepository.findByEmail(email);
        if (maybeUser.isPresent()) {
            throw new ValidationException("Email already exists: " + maybeUser.get().getUsername());
        }
    }
}

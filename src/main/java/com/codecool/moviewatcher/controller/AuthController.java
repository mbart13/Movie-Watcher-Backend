package com.codecool.moviewatcher.controller;

import com.codecool.moviewatcher.auth.User;
import com.codecool.moviewatcher.dto.CredentialsDto;
import com.codecool.moviewatcher.dto.EmailDto;
import com.codecool.moviewatcher.exceptions.ValidationException;
import com.codecool.moviewatcher.jwt.JwtConfig;
import com.codecool.moviewatcher.jwt.JwtResponse;
import com.codecool.moviewatcher.jwt.JwtUtils;
import com.codecool.moviewatcher.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:4200", "https://movie-watcher.vercel.app"})
@RequestMapping("/api/v1")
public class AuthController {

    private final JwtUtils jwtUtils;
    private final JwtConfig jwtConfig;
    private final UserService userService;

    @PostMapping("/login")
    @ResponseStatus(OK)
    public JwtResponse login(@RequestBody @Valid  CredentialsDto credentialsDto) {
        Authentication authentication = userService.login(credentialsDto);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return toJwtResponse(authentication);
    }

    @PostMapping("/register")
    @ResponseStatus(CREATED)
    public void registerUser(@RequestBody @Valid CredentialsDto credentialsDto) {
        userService.registerUser(credentialsDto);
    }

    @PostMapping("/sign-out")
    @ResponseStatus(NO_CONTENT)
    public void logout() {
        SecurityContextHolder.getContext().setAuthentication(null);
    }

    @PostMapping("/email-check")
    public ResponseEntity<Boolean> emailCheck(@RequestBody EmailDto emailDto) {
        boolean emailExists = false;
        try {
            userService.checkIfEmailExists(emailDto.getEmail());
        } catch (ValidationException e) {
            emailExists = true;
        }
        return ResponseEntity.ok(emailExists);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleException() {
        return new ResponseEntity<>(List.of("Invalid username or password"), UNAUTHORIZED);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<Object> handleValidationException(ValidationException validationException) {
        return new ResponseEntity<>(List.of(validationException.getMessage()), BAD_REQUEST);
    }

    private JwtResponse toJwtResponse(Authentication authentication) {
        String jwtToken = jwtUtils.generateJwtToken(authentication);
        User user = (User) authentication.getPrincipal();

        return new JwtResponse(user.getId(), user.getUsername(), jwtToken, jwtConfig.getExpirationTime());
    }
}

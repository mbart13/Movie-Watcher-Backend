package com.codecool.moviewatcher.controller;

import com.codecool.moviewatcher.auth.User;
import com.codecool.moviewatcher.dto.CredentialsDto;
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

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleException() {
        return new ResponseEntity<>("Invalid username or password", UNAUTHORIZED);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<String> handleValidationException(ValidationException validationException) {
        return new ResponseEntity<>(validationException.getMessage(), BAD_REQUEST);
    }

    private JwtResponse toJwtResponse(Authentication authentication) {
        String jwtToken = jwtUtils.generateJwtToken(authentication);
        User user = (User) authentication.getPrincipal();

        return new JwtResponse(user.getId(), user.getUsername(), jwtToken, jwtConfig.getExpirationTime());
    }
}

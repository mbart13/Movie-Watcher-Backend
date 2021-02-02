package com.codecool.moviewatcher.controller;

import com.codecool.moviewatcher.auth.ApplicationUser;
import com.codecool.moviewatcher.dto.CredentialsDto;
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
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final JwtUtils jwtUtils;
    private final UserService userService;

    @PostMapping(value = "/login")
    @ResponseStatus(OK)
    public JwtResponse login(@RequestBody CredentialsDto credentialsDto) {
        Authentication authentication = userService.login(credentialsDto);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return toJwtResponse(authentication);
    }

    @PostMapping("/register")
    @ResponseStatus(CREATED)
    public void registerUser(@RequestBody @Valid CredentialsDto credentialsDto) {
        userService.registerUser(credentialsDto);
    }


    @ExceptionHandler(BadCredentialsException.class)
    @ResponseBody
    public ResponseEntity<String> handleException(BadCredentialsException badCredentialsException) {
        return new ResponseEntity<>(badCredentialsException.getMessage(), UNAUTHORIZED);
    }

    private JwtResponse toJwtResponse(Authentication authentication) {
        String jwtToken = jwtUtils.generateJwtToken(authentication);
        ApplicationUser user = (ApplicationUser) authentication.getPrincipal();

        return new JwtResponse(user.getId(), user.getUsername(), jwtToken);
    }
}

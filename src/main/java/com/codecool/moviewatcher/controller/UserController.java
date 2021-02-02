package com.codecool.moviewatcher.controller;

import com.codecool.moviewatcher.auth.ApplicationUser;
import com.codecool.moviewatcher.dto.CredentialsDto;
import com.codecool.moviewatcher.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@AllArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping("/api/v1/users")
    public List<ApplicationUser> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    @ResponseStatus(CREATED)
    public void registerUser(@RequestBody @Valid CredentialsDto credentialsDto) {
        userService.registerUser(credentialsDto);
    }
}

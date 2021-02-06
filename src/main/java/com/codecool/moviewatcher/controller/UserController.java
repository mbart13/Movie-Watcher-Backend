package com.codecool.moviewatcher.controller;

import com.codecool.moviewatcher.auth.User;
import com.codecool.moviewatcher.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    // FOR TESTS ONLY
    @GetMapping("/api/v1/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}

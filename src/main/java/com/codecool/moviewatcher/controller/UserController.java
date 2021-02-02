package com.codecool.moviewatcher.controller;

import com.codecool.moviewatcher.auth.ApplicationUser;
import com.codecool.moviewatcher.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping("/api/v1/users")
    public List<ApplicationUser> getAllUsers() {
        return userService.getAllUsers();
    }


}

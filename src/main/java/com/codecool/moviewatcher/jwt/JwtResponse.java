package com.codecool.moviewatcher.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtResponse {

    private final long userId;
    private final String email;
    private final String jwtToken;
    private final int expiresIn;

}
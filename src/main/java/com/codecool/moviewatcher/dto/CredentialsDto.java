package com.codecool.moviewatcher.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class CredentialsDto {

    @Null
    private Long id;
    @NotBlank(message = "Email field cannot be blank")
    @Pattern(regexp = "\\b[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\\..+\\b", message = "Email address must be valid")
    private String email;

    @NotBlank(message = "Password field cannot be blank")
    @Size(min=8, max = 256, message = "Password field must be between 8 and 256 characters long")
    private String password;
}
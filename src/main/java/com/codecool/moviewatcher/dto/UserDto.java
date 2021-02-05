package com.codecool.moviewatcher.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UserDto {

    private Long id;
    @NotBlank
    @Pattern(regexp = "\\b[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\\..+\\b", message = "Email address must be valid")
    private String email;

    @NotBlank
    @Size(min=2, max = 50)
    private String password;
}

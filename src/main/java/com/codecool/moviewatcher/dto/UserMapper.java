package com.codecool.moviewatcher.dto;

import com.codecool.moviewatcher.auth.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface UserMapper {

    UserDto userToUserDto(User user);

}

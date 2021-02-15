package com.codecool.moviewatcher.dto.mappers;

import com.codecool.moviewatcher.auth.User;
import com.codecool.moviewatcher.dto.UserDto;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface UserMapper {

    UserDto userToUserDto(User user);

}

package com.codecool.moviewatcher.auth;

import java.util.Optional;

public interface UserDaoService {

    Optional<User> findUserByEmail(String email);
}

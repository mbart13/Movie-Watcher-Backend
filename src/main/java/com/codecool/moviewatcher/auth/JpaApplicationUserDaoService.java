package com.codecool.moviewatcher.auth;

import com.codecool.moviewatcher.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class JpaApplicationUserDaoService implements ApplicationUserDao {

    private final UserRepository userRepository;

    @Override
    public Optional<ApplicationUser> findApplicationUserByUsername(String username) {
        return userRepository.findByEmail(username);
    }
}

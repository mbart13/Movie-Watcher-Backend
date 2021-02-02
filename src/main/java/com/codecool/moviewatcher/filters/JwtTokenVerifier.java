package com.codecool.moviewatcher.filters;

import com.codecool.moviewatcher.jwt.JwtConfig;
import com.codecool.moviewatcher.jwt.JwtUtils;
import io.jsonwebtoken.JwtException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

import static java.util.Optional.empty;
import static java.util.Optional.of;

@Slf4j
@AllArgsConstructor
@Component
public class JwtTokenVerifier extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final JwtConfig jwtConfig;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        Optional<String> maybeToken = parseJwt(request);

        if (maybeToken.isPresent()) {
            String token = maybeToken.get();
            try {
                if (jwtUtils.validateJwtToken(token)) {
                    String username = jwtUtils.getUserNameFromJwtToken(token);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(
                            username, null, null);

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (JwtException e) {
                logger.warn(String.format("Token %s cannot be trusted", token));
            }

        }

        filterChain.doFilter(request, response);
    }

    private Optional<String> parseJwt(HttpServletRequest request) {
        String header = request.getHeader(jwtConfig.getHeader());

        if (header != null && header.startsWith(jwtConfig.getPrefix())) {
            return of(header.substring(7));
        }

        return empty();
    }
}

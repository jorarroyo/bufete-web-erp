package com.bufete.backend.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class RoleChecker {

    public boolean hasRole(String[] role) {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(Authentication::getAuthorities)
                .map(Collection::stream)
                .orElse(Stream.empty())
                .map(GrantedAuthority::getAuthority)
                .anyMatch(authority -> Arrays.asList(role).contains(authority));
    }
}
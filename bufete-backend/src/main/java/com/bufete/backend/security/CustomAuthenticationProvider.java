package com.bufete.backend.security;

import com.bufete.backend.service.appConfig.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

  @Autowired
  private UserService userService;

  @Autowired
  private CustomUserDetailsService detailService;

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {

    if (!(authentication instanceof CustomAuthenticationToken)) {
      throw new IllegalArgumentException("Solo CustomAuthenticationManager es suportado");
    }

    CustomAuthenticationToken authenticationToken = (CustomAuthenticationToken) authentication;
    if (!userService.isAuthenticated(authenticationToken.getPrincipal().toString(),
        authenticationToken.getCredentials().toString(), authenticationToken.getCompanyId())) {
      throw new BadCredentialsException("Usuario/Password no son correctos para " + authenticationToken.getPrincipal());
    }
    UserDetails user = detailService.loadUserByUserNameAndCompanyId(authenticationToken.getPrincipal().toString(),
        authenticationToken.getCompanyId());
    return new UsernamePasswordAuthenticationToken(user, null);
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(CustomAuthenticationToken.class);
  }

}

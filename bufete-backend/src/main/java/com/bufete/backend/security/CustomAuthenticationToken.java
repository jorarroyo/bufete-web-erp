package com.bufete.backend.security;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class CustomAuthenticationToken extends UsernamePasswordAuthenticationToken {

  private static final long serialVersionUID = 1L;

  private final Long companyId;

  public CustomAuthenticationToken(Object principal, Object credentials,
      Collection<? extends GrantedAuthority> authorities, Long companyId) {
    super(principal, credentials, authorities);
    this.companyId = companyId;
  }

  public CustomAuthenticationToken(Object principal, Object credentials, GrantedAuthority[] authorities,
      Long companyId) {
    super(principal, credentials, Arrays.asList(authorities));
    this.companyId = companyId;
  }

  public CustomAuthenticationToken(Object principal, Object credentials, Long companyId) {
    super(principal, credentials);
    this.companyId = companyId;
  }

  public Long getCompanyId() {
    return companyId;
  }

}
package com.bufete.backend.security;

public class TokenInfo {

  private Long userId;
  private Long companyId;

  public TokenInfo(Long userId, Long companyId) {
    this.userId = userId;
    this.companyId = companyId;
  }

  public Long getCompanyId() {
    return companyId;
  }

  public Long getUserId() {
    return userId;
  }

}
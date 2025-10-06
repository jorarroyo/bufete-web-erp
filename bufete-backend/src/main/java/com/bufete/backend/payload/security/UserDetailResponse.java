package com.bufete.backend.payload.security;

import com.fasterxml.jackson.annotation.JsonProperty;

final class User {

  private Long id;
  private String username;
  private String name;
  private String email;
  private Long companyId;
  @JsonProperty("company_name")
  private String companyName;
  private String[] roles;

  public User(Long id, String username, String name, String email, Long companyId, String companyName, String[] roles) {

    this.id = id;
    this.username = username;
    this.name = name;
    this.email = email;
    this.companyId = companyId;
    this.companyName = companyName;
    this.roles = roles;
  }

  public Long getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public Long getCompanyId() {
    return companyId;
  }

  public String getCompanyName() {
    return companyName;
  }

  public String[] getRoles() {
    return roles;
  }

}

public class UserDetailResponse {

  private User user;
  @JsonProperty("access_token")
  private String accessToken;
  private String tokenType = "Bearer";

  public UserDetailResponse(Long id, String username, String name, String email, Long companyId, String companyName,
      String[] roles, String accessToken) {
    this.user = new User(id, username, name, email, companyId, companyName, roles);
    this.accessToken = accessToken;
  }

  public String getAccessToken() {
    return accessToken;
  }

  public void setAccessToken(String accessToken) {
    this.accessToken = accessToken;
  }

  public String getTokenType() {
    return tokenType;
  }

  public User getUser() {
    return user;
  }

}
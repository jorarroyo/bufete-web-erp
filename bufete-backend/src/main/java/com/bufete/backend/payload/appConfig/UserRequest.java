package com.bufete.backend.payload.appConfig;

import com.bufete.backend.model.shared.StatusName;

public class UserRequest {

  private Long id;
  private String name;
  private String username;
  private String email;
  private StatusName status;
  private String password;
  private RolesPerCompany permission;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public RolesPerCompany getPermission() {
    return permission;
  }

  public void setPermission(RolesPerCompany permission) {
    this.permission = permission;
  }

  public UserRequest(Long id, String name, String username, String email, StatusName status, String password) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.status = status;
    this.password = password;
  }

}
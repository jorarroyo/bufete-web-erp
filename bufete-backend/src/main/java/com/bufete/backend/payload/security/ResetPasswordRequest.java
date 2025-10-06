package com.bufete.backend.payload.security;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ResetPasswordRequest implements Serializable {

  private Long id;
  @NotBlank
  @Size(min = 6, max = 20)
  private String password;
  
  public Long getId() {
    return id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getPassword() {
    return password;
  }
  
  public void setPassword(String password) {
    this.password = password;
  }
  
  private static final long serialVersionUID = 1L;
  
}
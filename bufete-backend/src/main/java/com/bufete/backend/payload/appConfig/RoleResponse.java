package com.bufete.backend.payload.appConfig;

import com.bufete.backend.model.shared.StatusName;

public class RoleResponse {

  private Long id;
  private String name;
  private StatusName status;

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

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public RoleResponse() {
  }

  public RoleResponse(Long id, String name, StatusName status) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

}
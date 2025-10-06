package com.bufete.backend.payload.appConfig;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.bufete.backend.model.shared.StatusName;

public class RoleRequest {

  private Long id;

  @NotBlank
  @Size(max = 60)
  private String name;

  private StatusName status;

  private List<Long> options;

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

  public List<Long> getOptions() {
    return options;
  }

  public void setOptions(List<Long> options) {
    this.options = options;
  }

  public RoleRequest(Long id, @NotBlank @Size(max = 60) String name, StatusName status, List<Long> options) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.options = options;
  }

  public RoleRequest() {
  }

}
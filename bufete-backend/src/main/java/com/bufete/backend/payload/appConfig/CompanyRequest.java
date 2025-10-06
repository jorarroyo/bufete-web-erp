package com.bufete.backend.payload.appConfig;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.bufete.backend.model.shared.StatusName;

public class CompanyRequest {

  private Long id;

  @NotBlank
  @Size(max = 150)
  private String name;

  private StatusName status;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

}
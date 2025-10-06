package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class EmployeesResponse implements Serializable {

  private Long id;
  private String name;
  private String nit;
  private String igss;
  private StatusName status;
  @JsonProperty("created_by")
  private String created;
  @JsonProperty("updated_by")
  private String modified;

  public EmployeesResponse(Long id, String name, String nit, String igss, StatusName status, String created,
      String modified) {
    this.id = id;
    this.name = name;
    this.nit = nit;
    this.igss = igss;
    this.status = status;
    this.created = created;
    this.modified = modified;
  }

  public EmployeesResponse() {
  }

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

  public String getNit() {
    return nit;
  }

  public void setNit(String nit) {
    this.nit = nit;
  }

  public String getIgss() {
    return igss;
  }

  public void setIgss(String igss) {
    this.igss = igss;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public String getCreated() {
    return created;
  }

  public void setCreated(String created) {
    this.created = created;
  }

  public String getModified() {
    return modified;
  }

  public void setModified(String modified) {
    this.modified = modified;
  }

  private static final long serialVersionUID = 1L;
}
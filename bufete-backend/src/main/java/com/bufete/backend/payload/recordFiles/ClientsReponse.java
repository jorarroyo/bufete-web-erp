package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ClientsReponse implements Serializable {

  private Long id;
  @JsonProperty("client_type")
  private String clientType;
  private String name;
  private String nit;
  private String acronym;
  private StatusName status;
  @JsonProperty("created_by")
  private String created;
  @JsonProperty("updated_by")
  private String modified;

  public ClientsReponse(Long id, String clientType, String name, String nit, String acronym, StatusName status,
      String created, String modified) {
    this.id = id;
    this.clientType = clientType;
    this.name = name;
    this.nit = nit;
    this.acronym = acronym;
    this.status = status;
    this.created = created;
    this.modified = modified;
  }

  public ClientsReponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getClientType() {
    return clientType;
  }

  public void setClientType(String clientType) {
    this.clientType = clientType;
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

  public String getAcronym() {
    return acronym;
  }

  public void setAcronym(String acronym) {
    this.acronym = acronym;
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
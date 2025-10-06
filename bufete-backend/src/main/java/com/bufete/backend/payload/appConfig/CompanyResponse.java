package com.bufete.backend.payload.appConfig;

import java.time.Instant;

public class CompanyResponse {

  private Long id;
  private String name;
  private Instant creationDateTime;

  public CompanyResponse(Long id, String name, Instant creationDateTime) {
    this.id = id;
    this.name = name;
    this.creationDateTime = creationDateTime;
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

  public Instant getCreationDateTime() {
    return creationDateTime;
  }

  public void setCreationDateTime(Instant creationDateTime) {
    this.creationDateTime = creationDateTime;
  }

}
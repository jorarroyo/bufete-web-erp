package com.bufete.backend.payload.shared;

import java.io.Serializable;

public class LocationResponse implements Serializable {

  private Long id;
  private String label;

  public LocationResponse(Long id, String label) {
    super();
    this.id = id;
    this.label = label;
  }

  public LocationResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getLabel() {
    return label;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  private static final long serialVersionUID = 1L;
}
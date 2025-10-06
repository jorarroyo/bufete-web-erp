package com.bufete.backend.payload.inventory;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductPropertyResponse implements Serializable {

  private Long id;
  @JsonProperty("property_name")
  private String propertyName;
  @JsonProperty("property_column_name")
  private String propertyColumnName;

  public ProductPropertyResponse(Long id, String propertyName, String propertyColumnName) {
    this.id = id;
    this.propertyName = propertyName;
    this.propertyColumnName = propertyColumnName;
  }

  public ProductPropertyResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPropertyName() {
    return propertyName;
  }

  public void setPropertyName(String propertyName) {
    this.propertyName = propertyName;
  }

  private static final long serialVersionUID = 1L;

  public String getPropertyColumnName() {
    return propertyColumnName;
  }

  public void setPropertyColumnName(String propertyColumnName) {
    this.propertyColumnName = propertyColumnName;
  }
}
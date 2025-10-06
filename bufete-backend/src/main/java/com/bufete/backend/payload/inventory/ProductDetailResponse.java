package com.bufete.backend.payload.inventory;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductDetailResponse implements Serializable {

  private Long id;
  @JsonProperty("property_name")
  private String propertyName;
  @JsonProperty("property_column_name")
  private String propertyColumnName;
  @JsonProperty("product_property")
  private Long productProperty;
  @JsonProperty("property_value")
  private String propertyValue;

  public ProductDetailResponse(Long id, String propertyName, String propertyColumnName, Long productProperty, String propertyValue) {
    this.id = id;
    this.productProperty = productProperty;
    this.propertyValue = propertyValue;
    this.propertyName = propertyName;
    this.propertyColumnName = propertyColumnName;
  }

  public ProductDetailResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getProductProperty() {
    return productProperty;
  }

  public void setProductProperty(Long productProperty) {
    this.productProperty = productProperty;
  }

  public String getPropertyValue() {
    return propertyValue;
  }

  public void setPropertyValue(String propertyValue) {
    this.propertyValue = propertyValue;
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
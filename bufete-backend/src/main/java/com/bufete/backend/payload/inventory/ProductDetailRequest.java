package com.bufete.backend.payload.inventory;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductDetailRequest implements Serializable {

  private Long id;
  @JsonProperty("product_property")
  private Long productProperty;
  @JsonProperty("property_value")
  private String propertyValue;

  public ProductDetailRequest(Long id, Long productProperty, String propertyValue) {
    this.id = id;
    this.productProperty = productProperty;
    this.propertyValue = propertyValue;
  }

  public ProductDetailRequest() {
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

  private static final long serialVersionUID = 1L;

}
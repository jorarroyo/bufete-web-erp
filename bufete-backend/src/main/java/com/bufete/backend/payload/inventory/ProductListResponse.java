package com.bufete.backend.payload.inventory;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductListResponse implements Serializable {

  private Long id;
  @JsonProperty("product_code")
  private String productCode;
  @JsonProperty("product_name")
  private String productName;
  @JsonProperty("unit_value")
  private Double unitValue;
  @JsonProperty("min_quantity")
  private Double minQuantity;
  @JsonProperty("product_existence")
  private Double productExistence;

  public ProductListResponse(Long id, String productCode, String productName, Double unitValue,
      Double minQuantity, Double productExistence) {
    this.id = id;
    this.productCode = productCode;
    this.productName = productName;
    this.unitValue = unitValue;
    this.minQuantity = minQuantity;
    this.productExistence = productExistence;
  }

  public ProductListResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getProductCode() {
    return productCode;
  }

  public void setProductCode(String productCode) {
    this.productCode = productCode;
  }

  public String getProductName() {
    return productName;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }

  public Double getUnitValue() {
    return unitValue;
  }

  public void setUnitValue(Double unitValue) {
    this.unitValue = unitValue;
  }

  public Double getMinQuantity() {
    return minQuantity;
  }

  public void setMinQuantity(Double minQuantity) {
    this.minQuantity = minQuantity;
  }

  public Double getProductExistence() {
    return productExistence;
  }

  public void setProductExistence(Double productExistence) {
    this.productExistence = productExistence;
  }

  private static final long serialVersionUID = 1L;
}
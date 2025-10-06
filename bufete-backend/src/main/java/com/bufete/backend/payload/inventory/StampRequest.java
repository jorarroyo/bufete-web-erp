package com.bufete.backend.payload.inventory;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StampRequest implements Serializable {

  private Long id;
  @JsonProperty("product_code")
  private String productCode;
  @JsonProperty("product_name")
  private String productName;
  @JsonProperty("product_type")
  private Long productType;
  @JsonProperty("designation_type")
  private Long designationType;
  private Integer year;
  @JsonProperty("unit_value")
  private Double unitValue;
  @JsonProperty("min_quantity")
  private Double minQuantity;

  public StampRequest(Long id, String productCode, String productName, Double unitValue, Double minQuantity) {
    this.id = id;
    this.productCode = productCode;
    this.productName = productName;
    this.unitValue = unitValue;
    this.minQuantity = minQuantity;
  }

  public StampRequest() {
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

  public Long getProductType() {
    return productType;
  }

  public void setProductType(Long productType) {
    this.productType = productType;
  }

  public Long getDesignationType() {
    return designationType;
  }

  public void setDesignationType(Long designationType) {
    this.designationType = designationType;
  }

  public Integer getYear() {
    return year;
  }

  public void setYear(Integer year) {
    this.year = year;
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

  private static final long serialVersionUID = 1L;
}
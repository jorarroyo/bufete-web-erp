package com.bufete.backend.payload.inventory;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class StampInvDetailResponse implements Serializable {

  private Long id;
  @JsonProperty("inventory_id")
  private Long inventoryId;
  @JsonProperty("product_id")
  private Long productId;
  @JsonProperty("product_code")
  private String productCode;
  @JsonProperty("product_name")
  private String productName;
  private StatusName status;
  @JsonProperty("unit_value")
  private Double unitValue;
  @JsonProperty("min_quantity")
  private Double minQuantity;
  @JsonProperty("product_existence")
  private Double productExistence;
  @JsonProperty("quantity_request")
  private Double quantityRequest;

  public StampInvDetailResponse(Long id, Long inventoryId, Long productId, String productCode, String productName,
      StatusName status, Double unitValue, Double minQuantity, Double productExistence, Double quantityRequest) {
    this.id = id;
    this.inventoryId = inventoryId;
    this.productId = productId;
    this.productCode = productCode;
    this.productName = productName;
    this.status = status;
    this.unitValue = unitValue;
    this.minQuantity = minQuantity;
    this.productExistence = productExistence;
    this.quantityRequest = quantityRequest;
  }

  public StampInvDetailResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getInventoryId() {
    return inventoryId;
  }

  public void setInventoryId(Long inventoryId) {
    this.inventoryId = inventoryId;
  }

  public Long getProductId() {
    return productId;
  }

  public void setProductId(Long productId) {
    this.productId = productId;
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

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
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

  public Double getQuantityRequest() {
    return quantityRequest;
  }

  public void setQuantityRequest(Double quantityRequest) {
    this.quantityRequest = quantityRequest;
  }

  private static final long serialVersionUID = 1L;
}
package com.bufete.backend.payload.inventory;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class StampInvDetailRequest implements Serializable {

  private Long id;
  @JsonProperty("product_id")
  private Long productId;
  @JsonProperty("quantity_request")
  private Double quantityRequest;
  private StatusName status;

  public StampInvDetailRequest(Long id, Long productId, Double quantityRequest, StatusName status) {
    this.id = id;
    this.productId = productId;
    this.quantityRequest = quantityRequest;
    this.status = status;
  }

  public StampInvDetailRequest() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getProductId() {
    return productId;
  }

  public void setProductId(Long productId) {
    this.productId = productId;
  }

  public Double getQuantityRequest() {
    return quantityRequest;
  }

  public void setQuantityRequest(Double quantityRequest) {
    this.quantityRequest = quantityRequest;
  }

  private static final long serialVersionUID = 1L;

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }
}
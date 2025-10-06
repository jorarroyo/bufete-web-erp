package com.bufete.backend.payload.inventory;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StampInvReportDetail implements Serializable {

  private Long id;
  @JsonProperty("product_code")
  private String productCode;
  @JsonProperty("request_quantity")
  private Double requestQuantity;

  public StampInvReportDetail(Long id, String productCode, Double requestQuantity) {
    this.id = id;
    this.productCode = productCode;
    this.requestQuantity = requestQuantity;
  }

  public StampInvReportDetail() {
  }

  public String getProductCode() {
    return productCode;
  }

  public void setProductCode(String productCode) {
    this.productCode = productCode;
  }

  public Double getRequestQuantity() {
    return requestQuantity;
  }

  public void setRequestQuantity(Double requestQuantity) {
    this.requestQuantity = requestQuantity;
  }

  private static final long serialVersionUID = 1L;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }
}
package com.bufete.backend.payload.inventory;

import java.io.Serializable;
import java.util.List;

import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductResponse implements Serializable {

  private Long id;
  @JsonProperty("product_code")
  private String productCode;
  @JsonProperty("product_name")
  private String productName;
  @JsonProperty("product_inv_type")
  private ProductType productInvType;
  private StatusName status;
  @JsonProperty("unit_value")
  private Double unitValue;
  @JsonProperty("min_quantity")
  private Double minQuantity;
  @JsonProperty("detail_list")
  private List<ProductDetailResponse> detailList;

  public ProductResponse(Long id, String productCode, String productName, ProductType productInvType,
      StatusName status, Double unitValue, Double minQuantity, List<ProductDetailResponse> detailList) {
    this.id = id;
    this.productCode = productCode;
    this.productName = productName;
    this.productInvType = productInvType;
    this.status = status;
    this.unitValue = unitValue;
    this.minQuantity = minQuantity;
    this.detailList = detailList;
  }

  public ProductResponse() {
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

  public ProductType getProductInvType() {
    return productInvType;
  }

  public void setProductInvType(ProductType productInvType) {
    this.productInvType = productInvType;
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

  public List<ProductDetailResponse> getDetailList() {
    return detailList;
  }

  public void setDetailList(List<ProductDetailResponse> detailList) {
    this.detailList = detailList;
  }

  private static final long serialVersionUID = 1L;
}
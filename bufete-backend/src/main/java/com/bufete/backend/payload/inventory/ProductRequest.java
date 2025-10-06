package com.bufete.backend.payload.inventory;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductRequest implements Serializable {

  private Long id;
  @JsonProperty("product_code")
  private String productCode;
  @JsonProperty("product_name")
  private String productName;
  @JsonProperty("product_type")
  private Long productType;
  @JsonProperty("product_inv_type")
  private ProductType productInvType;
  @Enumerated(EnumType.STRING)
  private StatusName status;
  @JsonProperty("unit_value")
  private Double unitValue;
  @JsonProperty("min_quantity")
  private Double minQuantity;
  @JsonProperty("detail_list")
  private List<ProductDetailRequest> detailList;

  public ProductRequest(Long id, String productCode, String productName, Long productType, StatusName status,
      ProductType productInvType, Double unitValue, Double minQuantity, List<ProductDetailRequest> detailList) {
    this.id = id;
    this.productCode = productCode;
    this.productName = productName;
    this.productType = productType;
    this.status = status;
    this.productInvType = productInvType;
    this.unitValue = unitValue;
    this.minQuantity = minQuantity;
    this.detailList = detailList;
  }

  public ProductRequest() {
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

  private static final long serialVersionUID = 1L;

  public List<ProductDetailRequest> getDetailList() {
    return detailList;
  }

  public void setDetailList(List<ProductDetailRequest> detailList) {
    this.detailList = detailList;
  }

  public ProductType getProductInvType() {
    return productInvType;
  }

  public void setProductInvType(ProductType productInvType) {
    this.productInvType = productInvType;
  }

}
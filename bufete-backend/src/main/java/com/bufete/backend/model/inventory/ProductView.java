package com.bufete.backend.model.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "product_view")
public class ProductView {

  @Id
  private Long id;
  @Column(name = "product_code")
  private String productCode;
  @Column(name = "product_name")
  private String productName;
  @Column(name = "unit_value")
  private Double unitValue;
  @Column(name = "min_quantity")
  private Double minQuantity;
  @Column(name = "product_existence")
  private Double productExistence;
  @Enumerated(EnumType.STRING)
  @Column(name = "product_inv_type", length = 20)
  private ProductType productInvType;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;

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
}
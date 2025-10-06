package com.bufete.backend.model.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "products")
public class Product extends UserDateAudit {

  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "product_code", unique = true)
  private String productCode;
  @Column(name = "product_name")
  private String productName;
  @Enumerated(EnumType.STRING)
  @Column(name = "product_inv_type", length = 20)
  private ProductType productInvType;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "unit_value")
  private Double unitValue;
  @Column(name = "min_quantity")
  private Double minQuantity;
  @Column(name = "product_existence")
  private Double productExistence;

  public Product(Long id, String productCode, String productName, ProductType productInvType, StatusName status,
      Double unitValue, Double minQuantity, Double productExistence) {
    this.id = id;
    this.productCode = productCode;
    this.productName = productName;
    this.productInvType = productInvType;
    this.status = status;
    this.unitValue = unitValue;
    this.minQuantity = minQuantity;
    this.productExistence = productExistence;
  }

  public Product() {
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

  public ProductType getProductInvType() {
    return productInvType;
  }

  public void setProductInvType(ProductType productInvType) {
    this.productInvType = productInvType;
  }
}
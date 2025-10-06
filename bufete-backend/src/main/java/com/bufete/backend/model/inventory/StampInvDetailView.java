package com.bufete.backend.model.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "stamp_inv_detail_view")
public class StampInvDetailView {

  @Id
  private Long id;
  @Column(name = "inventory_id")
  private Long inventoryId;
  @Column(name = "product_id")
  private Long productId;
  @Column(name = "product_code")
  private String productCode;
  @Column(name = "product_name")
  private String productName;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "unit_value")
  private Double unitValue;
  @Column(name = "min_quantity")
  private Double minQuantity;
  @Column(name = "product_existence")
  private Double productExistence;
  @Column(name = "quantity_request")
  private Double quantityRequest;

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

}
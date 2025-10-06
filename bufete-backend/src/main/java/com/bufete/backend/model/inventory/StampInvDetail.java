package com.bufete.backend.model.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stamp_inventory_detail")
public class StampInvDetail {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "inventory_id")
  private Long inventoryId;
  @Column(name = "product_id")
  private Long productId;
  @Column(name = "quantity_request")
  private Double quantityRequest;

  public StampInvDetail(Long id, Long inventoryId, Long productId, Double quantityRequest) {
    this.id = id;
    this.inventoryId = inventoryId;
    this.productId = productId;
    this.quantityRequest = quantityRequest;
  }

  public StampInvDetail() {
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

  public Double getQuantityRequest() {
    return quantityRequest;
  }

  public void setQuantityRequest(Double quantityRequest) {
    this.quantityRequest = quantityRequest;
  }

}
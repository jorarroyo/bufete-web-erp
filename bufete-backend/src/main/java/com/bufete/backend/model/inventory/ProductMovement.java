package com.bufete.backend.model.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.audit.DateAudit;
import com.bufete.backend.model.shared.ActionsName;

@Entity
@Table(name = "product_movement")
public class ProductMovement extends DateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private ActionsName action;
  @Column(name = "product_id")
  private Long productId;
  private Double quantity;
  @Column(name = "inventory_id")
  private Long inventoryId;

  public ProductMovement(Long id, ActionsName action, Long productId, Double quantity, Long inventoryId) {
    this.id = id;
    this.action = action;
    this.productId = productId;
    this.quantity = quantity;
    this.inventoryId = inventoryId;
  }

  public ProductMovement() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public ActionsName getAction() {
    return action;
  }

  public void setAction(ActionsName action) {
    this.action = action;
  }

  public Long getProductId() {
    return productId;
  }

  public void setProductId(Long productId) {
    this.productId = productId;
  }

  public Double getQuantity() {
    return quantity;
  }

  public void setQuantity(Double quantity) {
    this.quantity = quantity;
  }

  private static final long serialVersionUID = 1L;

  public Long getInventoryId() {
    return inventoryId;
  }

  public void setInventoryId(Long inventoryId) {
    this.inventoryId = inventoryId;
  }
}
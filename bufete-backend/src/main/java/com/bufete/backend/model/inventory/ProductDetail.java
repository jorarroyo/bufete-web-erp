package com.bufete.backend.model.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "products_detail")
public class ProductDetail {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "product_id")
  private Long productId;
  @Column(name = "product_property")
  private Long productProperty;
  @Column(name = "property_value")
  private String propertyValue;

  public ProductDetail(Long id, Long productId, Long productProperty, String propertyValue) {
    this.id = id;
    this.productId = productId;
    this.productProperty = productProperty;
    this.propertyValue = propertyValue;
  }

  public ProductDetail() {
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

  public Long getProductProperty() {
    return productProperty;
  }

  public void setProductProperty(Long productProperty) {
    this.productProperty = productProperty;
  }

  public String getPropertyValue() {
    return propertyValue;
  }

  public void setPropertyValue(String propertyValue) {
    this.propertyValue = propertyValue;
  }
}
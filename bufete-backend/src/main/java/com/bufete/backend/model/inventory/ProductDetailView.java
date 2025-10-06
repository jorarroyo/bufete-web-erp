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
@Table(name = "product_detail_view")
public class ProductDetailView {

  @Id
  private Long id;
  @Column(name = "product_id")
  private Long productId;
  @Column(name = "property_name")
  private String propertyName;
  @Column(name = "property_column_name")
  private String propertyColumnName;
  @Column(name = "product_property")
  private Long productProperty;
  @Column(name = "property_value")
  private String propertyValue;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Enumerated(EnumType.STRING)
  @Column(name = "product_type", length = 20)
  private ProductType productType;

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

  public String getPropertyName() {
    return propertyName;
  }

  public void setPropertyName(String propertyName) {
    this.propertyName = propertyName;
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

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public ProductType getProductType() {
    return productType;
  }

  public void setProductType(ProductType productType) {
    this.productType = productType;
  }

  public String getPropertyColumnName() {
    return propertyColumnName;
  }

  public void setPropertyColumnName(String propertyColumnName) {
    this.propertyColumnName = propertyColumnName;
  }

}
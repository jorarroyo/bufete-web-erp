package com.bufete.backend.model.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "product_property")
public class ProductProperty {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Enumerated(EnumType.STRING)
  @Column(name = "product_type", length = 20)
  private ProductType productType;
  @Column(name = "property_name")
  private String propertyName;
  @Column(name = "property_column_name")
  private String propertyColumnName;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;

  public ProductProperty(Long id, ProductType productType, String propertyName, String propertyColumnName, StatusName status) {
    this.id = id;
    this.productType = productType;
    this.propertyName = propertyName;
    this.propertyColumnName = propertyColumnName;
    this.status = status;
  }

  public ProductProperty() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public ProductType getProductType() {
    return productType;
  }

  public void setProductType(ProductType productType) {
    this.productType = productType;
  }

  public String getPropertyName() {
    return propertyName;
  }

  public void setPropertyName(String propertyName) {
    this.propertyName = propertyName;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public String getPropertyColumnName() {
    return propertyColumnName;
  }

  public void setPropertyColumnName(String propertyColumnName) {
    this.propertyColumnName = propertyColumnName;
  }
  
}
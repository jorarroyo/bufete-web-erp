package com.bufete.backend.model.shared;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "addresses")
public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @Column(name = "entity_id")
  private Long entityId;

  /** 1: Client */
  @NotNull
  @Column(name = "entity_type")
  private Integer entityType;

  @NotNull
  @Column(name = "address_type")
  private Integer addressType;

  @Size(max = 150)
  private String address;

  @Size(max = 3)
  private String zone;

  @Column(name = "municipality_id")
  private Long municipalityId;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getEntityId() {
    return entityId;
  }

  public void setEntityId(Long entityId) {
    this.entityId = entityId;
  }

  public Integer getAddressType() {
    return addressType;
  }

  public void setAddressType(Integer addressType) {
    this.addressType = addressType;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getZone() {
    return zone;
  }

  public void setZone(String zone) {
    this.zone = zone;
  }

  public Long getMunicipalityId() {
    return municipalityId;
  }

  public void setMunicipalityId(Long municipalityId) {
    this.municipalityId = municipalityId;
  }

  public Address(Long entityId, Integer entityType, Integer addressType, String address, String zone,
      Long municipalityId, StatusName status) {
    this.entityId = entityId;
    this.entityType = entityType;
    this.addressType = addressType;
    this.address = address;
    this.zone = zone;
    this.municipalityId = municipalityId;
    this.status = status;
  }

  public Address() {
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public Integer getEntityType() {
    return entityType;
  }

  public void setEntityType(Integer entityType) {
    this.entityType = entityType;
  }

}
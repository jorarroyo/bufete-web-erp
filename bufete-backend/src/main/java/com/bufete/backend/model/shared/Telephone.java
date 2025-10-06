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
@Table(name = "phone_contact")
public class Telephone {

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
  @Column(name = "phone_type")
  private Integer phoneType;

  @Column(name = "phone_number")
  @Size(min = 6, max = 16)
  private String phoneNumber;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;

  public Telephone(Long entityId, Integer entityType, Integer phoneType, String phoneNumber, StatusName status) {
    this.entityId = entityId;
    this.entityType = entityType;
    this.phoneType = phoneType;
    this.phoneNumber = phoneNumber;
    this.status = status;
  }

  public Telephone() {
  }

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

  public Integer getPhoneType() {
    return phoneType;
  }

  public void setPhoneType(Integer phoneType) {
    this.phoneType = phoneType;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
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
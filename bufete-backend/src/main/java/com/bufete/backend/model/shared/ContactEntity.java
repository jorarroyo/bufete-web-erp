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
@Table(name = "contact_entity")
public class ContactEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @Column(name = "entity_id")
  private Long entityId;

  /** 1: Client, 2: Employee */
  @NotNull
  @Column(name = "entity_type")
  private Integer entityType;

  @Size(max = 150)
  @Column(name = "contact_name")
  private String name;

  @Size(max = 150)
  @Column(name = "contact_address")
  private String address;

  @Size(max = 100)
  @Column(name = "contact_email")
  private String email;

  @Size(max = 30)
  @Column(name = "contact_phone")
  private String phone;

  /** 1: Legales 2: Retenciones */
  @Column(name = "contact_type")
  private Integer type;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;

  public ContactEntity(Long entityId, Integer entityType, String name, String address, String email, String phone, Integer type, StatusName status) {
    this.entityId = entityId;
    this.entityType = entityType;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.type = type;
    this.status = status;
  }

  public ContactEntity() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getEntityType() {
    return entityType;
  }

  public void setEntityType(Integer entityType) {
    this.entityType = entityType;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public Long getEntityId() {
    return entityId;
  }

  public void setEntityId(Long entityId) {
    this.entityId = entityId;
  }

  public Integer getType() {
    return type;
  }

  public void setType(Integer type) {
    this.type = type;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }
}
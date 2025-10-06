package com.bufete.backend.model.shared;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "status_flow")
public class StatusFlow {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "entity_type")
  private Integer entityType;
  @Enumerated(EnumType.STRING)
  @Column(length = 20, name = "prev_status")
  private StatusName prevStatus;
  @Enumerated(EnumType.STRING)
  @Column(length = 20, name = "next_status")
  private StatusName nextStatus;
  private String privilege;

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

  public StatusName getPrevStatus() {
    return prevStatus;
  }

  public void setPrevStatus(StatusName prevStatus) {
    this.prevStatus = prevStatus;
  }

  public StatusName getNextStatus() {
    return nextStatus;
  }

  public void setNextStatus(StatusName nextStatus) {
    this.nextStatus = nextStatus;
  }

  public String getPrivilege() {
    return privilege;
  }

  public void setPrivilege(String privilege) {
    this.privilege = privilege;
  }

}
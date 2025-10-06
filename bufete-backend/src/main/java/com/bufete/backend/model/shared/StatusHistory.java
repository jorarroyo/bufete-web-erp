package com.bufete.backend.model.shared;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.audit.UserDateAudit;

@Entity
@Table(name = "status_history")
public class StatusHistory extends UserDateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "entity_id")
  private Long entityId;
  @Column(name = "entity_type")
  private Integer entityType;
  private String comment;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName prevStatus;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName nextStatus;

  public StatusHistory(Long entityId, Integer entityType, String comment, StatusName prevStatus,
      StatusName nextStatus) {
    this.entityId = entityId;
    this.entityType = entityType;
    this.comment = comment;
    this.prevStatus = prevStatus;
    this.nextStatus = nextStatus;
  }

  public StatusHistory() {
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

  public Integer getEntityType() {
    return entityType;
  }

  public void setEntityType(Integer entityType) {
    this.entityType = entityType;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  private static final long serialVersionUID = 1L;

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

}
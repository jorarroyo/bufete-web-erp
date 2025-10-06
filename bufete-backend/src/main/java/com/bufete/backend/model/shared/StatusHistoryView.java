package com.bufete.backend.model.shared;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "status_history_view")
public class StatusHistoryView {

  @Id
  private Long id;
  @Column(name = "entity_id")
  private Long entityId;
  @Column(name = "entity_type")
  private Integer entityType;
  private String comment;
  @Enumerated(EnumType.STRING)
  @Column(length = 10, name = "prev_status")
  private StatusName prevStatus;
  @Enumerated(EnumType.STRING)
  @Column(length = 10, name = "next_status")
  private StatusName nextStatus;
  private String created;

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

  public String getCreated() {
    return created;
  }

  public void setCreated(String created) {
    this.created = created;
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

}
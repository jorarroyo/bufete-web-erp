package com.bufete.backend.model.recordFiles;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "record_file_details")
public class RecordFileDetail {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "entity_type")
  private Integer entityType;
  @Column(name = "entity_id")
  private Long entityId;
  @Column(name = "file_record_id")
  private Long fileRecordId;

  public RecordFileDetail(Integer entityType, Long entityId, Long fileRecordId) {
    this.entityType = entityType;
    this.entityId = entityId;
    this.fileRecordId = fileRecordId;
  }

  public RecordFileDetail() {
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

  public Long getEntityId() {
    return entityId;
  }

  public void setEntityId(Long entityId) {
    this.entityId = entityId;
  }

  public Long getFileRecordId() {
    return fileRecordId;
  }

  public void setFileRecordId(Long fileRecordId) {
    this.fileRecordId = fileRecordId;
  }
}
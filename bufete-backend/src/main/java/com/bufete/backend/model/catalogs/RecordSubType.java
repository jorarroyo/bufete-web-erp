package com.bufete.backend.model.catalogs;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "record_subtype")
public class RecordSubType {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 150)
  private String name;

  @Column(name = "record_type_id")
  private Long recordTypeId;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;

  public RecordSubType(String name, Long recordTypeId, StatusName status) {
    this.name = name;
    this.recordTypeId = recordTypeId;
    this.status = status;
  }

  public RecordSubType() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getRecordTypeId() {
    return recordTypeId;
  }

  public void setRecordTypeId(Long recordTypeId) {
    this.recordTypeId = recordTypeId;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

}
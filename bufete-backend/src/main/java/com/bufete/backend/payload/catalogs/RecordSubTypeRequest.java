package com.bufete.backend.payload.catalogs;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RecordSubTypeRequest implements Serializable {
  
  private Long id;
  private String name;
  @JsonProperty("record_type_id")
  private Long recordTypeId;
  private StatusName status;

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

  private static final long serialVersionUID = 1L;
}
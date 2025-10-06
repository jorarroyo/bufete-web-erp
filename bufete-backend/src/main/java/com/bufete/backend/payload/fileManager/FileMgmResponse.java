package com.bufete.backend.payload.fileManager;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FileMgmResponse implements Serializable {

  private Long id;
  @JsonProperty("file_name")
  private String fileName;
  @JsonProperty("file_type")
  private String fileType;
  @JsonProperty("file_size")
  private Long fileSize;
  @JsonProperty("file_owner")
  private String fileOwner;
  private String modified;
  private StatusName status;
  @JsonProperty("entity_id")
  private Long entityId;
  @JsonProperty("entity_type")
  private Integer entityType;

  public FileMgmResponse(Long id, String fileName, String fileType, Long fileSize, String fileOwner,
      String modified, StatusName status, Long entityId, Integer entityType) {
    this.id = id;
    this.fileName = fileName;
    this.fileType = fileType;
    this.fileSize = fileSize;
    this.fileOwner = fileOwner;
    this.modified = modified;
    this.status = status;
    this.entityId = entityId;
    this.entityType = entityType;
  }

  public FileMgmResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public String getFileType() {
    return fileType;
  }

  public void setFileType(String fileType) {
    this.fileType = fileType;
  }

  public Long getFileSize() {
    return fileSize;
  }

  public void setFileSize(Long fileSize) {
    this.fileSize = fileSize;
  }

  public String getFileOwner() {
    return fileOwner;
  }

  public void setFileOwner(String fileOwner) {
    this.fileOwner = fileOwner;
  }

  public String getModified() {
    return modified;
  }

  public void setModified(String modified) {
    this.modified = modified;
  }

  private static final long serialVersionUID = 1L;

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
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
}
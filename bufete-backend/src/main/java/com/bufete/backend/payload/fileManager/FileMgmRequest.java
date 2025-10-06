package com.bufete.backend.payload.fileManager;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FileMgmRequest implements Serializable {

  private Long id;
  
  @JsonProperty("file_name")
  private String fileName;
  
  @JsonProperty("file_path")
  private String filePath;
  
  @JsonProperty("file_type")
  private String fileType;
  
  @JsonProperty("file_size")
  private Long fileSize;
  
  private StatusName status;
  
  @JsonProperty("file_full_name")
  private String fileFullName;
  
  @JsonProperty("entity_id")
  private Long entityId;

  @JsonProperty("entity_type")
  private Integer entityType;

  public FileMgmRequest(String fileName, String filePath, String fileType, Long fileSize,
      StatusName status, String fileFullName, Long entityId, Integer entityType) {
    this.fileName = fileName;
    this.filePath = filePath;
    this.fileType = fileType;
    this.fileSize = fileSize;
    this.status = status;
    this.fileFullName = fileFullName;
    this.entityId = entityId;
    this.entityType = entityType;
  }

  public FileMgmRequest() {
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

  public String getFilePath() {
    return filePath;
  }

  public void setFilePath(String filePath) {
    this.filePath = filePath;
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

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  private static final long serialVersionUID = 1L;

  public String getFileFullName() {
    return fileFullName;
  }

  public void setFileFullName(String fileFullName) {
    this.fileFullName = fileFullName;
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
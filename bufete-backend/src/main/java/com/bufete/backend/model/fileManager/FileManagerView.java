package com.bufete.backend.model.fileManager;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "file_manager_view")
public class FileManagerView {

  @Id
  private Long id;
  @Column(name = "file_name")
  private String fileName;
  @Column(name = "file_type")
  private String fileType;
  @Column(name = "file_size")
  private Long fileSize;
  @Column(name = "file_owner")
  private String fileOwner;
  private String modified;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "entity_id")
  private Long entityId;
  @Column(name = "entity_type")
  private Integer entityType;
  
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
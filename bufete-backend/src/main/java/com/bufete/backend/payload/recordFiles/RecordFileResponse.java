package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class RecordFileResponse implements Serializable {

  private Long id;
  private String type;
  @JsonProperty("file_num")
  private String fileNum;
  private StatusName status;
  @JsonProperty("opening_date")
  @JsonFormat(shape = Shape.STRING, pattern = "dd/MM/yyyy")
  private String openingDate;
  @JsonProperty("created_by")
  private String created;
  @JsonProperty("updated_by")
  private String modified;
  @JsonProperty("client_name")
  private String clientName;
  private String subject;

  public RecordFileResponse(Long id, String type, String fileNum, StatusName status, String openingDate, String created,
      String modified, String clientName, String subject) {
    this.id = id;
    this.type = type;
    this.fileNum = fileNum;
    this.status = status;
    this.openingDate = openingDate;
    this.created = created;
    this.modified = modified;
    this.clientName = clientName;
    this.subject = subject;
  }

  public RecordFileResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getFileNum() {
    return fileNum;
  }

  public void setFileNum(String fileNum) {
    this.fileNum = fileNum;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public String getOpeningDate() {
    return openingDate;
  }

  public void setOpeningDate(String openingDate) {
    this.openingDate = openingDate;
  }

  public String getCreated() {
    return created;
  }

  public void setCreated(String created) {
    this.created = created;
  }

  public String getModified() {
    return modified;
  }

  public void setModified(String modified) {
    this.modified = modified;
  }

  public String getClientName() { return clientName; }

  public void setClientName(String clientName) { this.clientName = clientName; }

  public String getSubject() { return subject; }

  public void setSubject(String subject) { this.subject = subject; }

  private static final long serialVersionUID = 1L;
}
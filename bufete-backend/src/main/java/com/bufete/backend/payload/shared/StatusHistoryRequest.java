package com.bufete.backend.payload.shared;

import java.io.Serializable;
import java.util.Date;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class StatusHistoryRequest implements Serializable {

  private Long id;
  private String comment;
  private StatusName status;
  @JsonProperty("assign_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd")
  private Date assignDate;
  
  public StatusHistoryRequest(Long id, String comment, StatusName status, Date assigDate) {
    this.id = id;
    this.comment = comment;
    this.status = status;
    this.assignDate = assigDate;
  }
  
  public StatusHistoryRequest() {
  }
  
  public Long getId() {
    return id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getComment() {
    return comment;
  }
  
  public void setComment(String comment) {
    this.comment = comment;
  }
  
  public StatusName getStatus() {
    return status;
  }
  
  public void setStatus(StatusName status) {
    this.status = status;
  }
  
  private static final long serialVersionUID = 1L;

  public Date getAssignDate() {
    return assignDate;
  }

  public void setAssignDate(Date assignDate) {
    this.assignDate = assignDate;
  }
}
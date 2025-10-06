package com.bufete.backend.payload.shared;

import java.io.Serializable;

public class StatusHistoryResponse implements Serializable {

  private Long id;
  private String comment;
  private String status;
  private String created;

  public StatusHistoryResponse(Long id, String comment, String created, String status) {
    this.id = id;
    this.comment = comment;
    this.created = created;
    this.status = status;
  }

  public StatusHistoryResponse() {
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

  public String getCreated() {
    return created;
  }

  public void setCreated(String created) {
    this.created = created;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  private static final long serialVersionUID = 1L;
}
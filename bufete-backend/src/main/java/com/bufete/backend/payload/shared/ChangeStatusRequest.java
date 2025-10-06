package com.bufete.backend.payload.shared;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;

public class ChangeStatusRequest implements Serializable {

  private Long id;
  private StatusName status;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  private static final long serialVersionUID = 1L;
}
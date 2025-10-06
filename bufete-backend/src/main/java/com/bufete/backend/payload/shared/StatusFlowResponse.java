package com.bufete.backend.payload.shared;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class StatusFlowResponse implements Serializable {

  private Long id;
  @JsonProperty("prev_status")
  private StatusName prevStatus;
  @JsonProperty("next_status")
  private StatusName nextStatus;
  
  public StatusFlowResponse(Long id, StatusName prevStatus, StatusName nextStatus) {
    this.id = id;
    this.prevStatus = prevStatus;
    this.nextStatus = nextStatus;
  }
  
  public StatusFlowResponse() {
  }
  
  public Long getId() {
    return id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public StatusName getPrevStatus() {
    return prevStatus;
  }
  
  public void setPrevStatus(StatusName prevStatus) {
    this.prevStatus = prevStatus;
  }
  
  public StatusName getNextStatus() {
    return nextStatus;
  }
  
  public void setNextStatus(StatusName nextStatus) {
    this.nextStatus = nextStatus;
  }
  
  private static final long serialVersionUID = 1L;
}
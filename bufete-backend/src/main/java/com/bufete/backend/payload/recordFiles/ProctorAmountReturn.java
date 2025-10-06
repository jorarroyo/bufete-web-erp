package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProctorAmountReturn implements Serializable {

  private Long id;
  @JsonProperty("local_amount")
  private Double localAmount;
  @JsonProperty("outer_amount")
  private Double outerAmount;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Double getLocalAmount() {
    return localAmount;
  }

  public void setLocalAmount(Double localAmount) {
    this.localAmount = localAmount;
  }

  public Double getOuterAmount() {
    return outerAmount;
  }

  public void setOuterAmount(Double outerAmount) {
    this.outerAmount = outerAmount;
  }

  private static final long serialVersionUID = 1L;

  public ProctorAmountReturn(Long id, Double localAmount, Double outerAmount) {
    this.id = id;
    this.localAmount = localAmount;
    this.outerAmount = outerAmount;
  }

  public ProctorAmountReturn() {
  }
}
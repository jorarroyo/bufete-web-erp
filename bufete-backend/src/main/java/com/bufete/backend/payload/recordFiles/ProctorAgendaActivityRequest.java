package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProctorAgendaActivityRequest implements Serializable {

  @JsonProperty("activity_id")
  private Long activityId;
  @JsonProperty("activity_cost")
  private Double activityCost;
  @JsonProperty("currency_type")
  private Integer currencyType;
  
  public Long getActivityId() {
    return activityId;
  }
  
  public void setActivityId(Long activityId) {
    this.activityId = activityId;
  }
  
  public Double getActivityCost() {
    return activityCost;
  }
  
  public void setActivityCost(Double activityCost) {
    this.activityCost = activityCost;
  }
  
  private static final long serialVersionUID = 1L;

  public Integer getCurrencyType() {
    return currencyType;
  }

  public void setCurrencyType(Integer currencyType) {
    this.currencyType = currencyType;
  }
}
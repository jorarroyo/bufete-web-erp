package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ActivitySettleDetailRequest implements Serializable {

  private Long Id;
  @JsonProperty("case_activity_id")
  private Long caseActivityId;
  @JsonProperty("cost_detail")
  private Double costDetail;

  public ActivitySettleDetailRequest(Long id, Long caseActivityId, Double costDetail) {
    Id = id;
    this.caseActivityId = caseActivityId;
    this.costDetail = costDetail;
  }

  public ActivitySettleDetailRequest() {
  }

  public Long getId() {
    return Id;
  }

  public void setId(Long id) {
    Id = id;
  }

  public Long getCaseActivityId() {
    return caseActivityId;
  }

  public void setCaseActivityId(Long caseActivityId) {
    this.caseActivityId = caseActivityId;
  }

  public Double getCostDetail() {
    return costDetail;
  }

  public void setCostDetail(Double costDetail) {
    this.costDetail = costDetail;
  }

  private static final long serialVersionUID = 1L;
}
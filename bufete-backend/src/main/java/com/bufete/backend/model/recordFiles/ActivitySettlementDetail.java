package com.bufete.backend.model.recordFiles;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "activity_settlement_detail")
public class ActivitySettlementDetail {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long Id;
  @Column(name = "activity_settlement_id")
  private Long activitySettlementId;
  @Column(name = "case_activity_id")
  private Long caseActivityId;
  @Column(name = "cost_detail")
  private Double costDetail;

  public ActivitySettlementDetail(Long activitySettlementId, Long caseActivityId, Double costDetail) {
    this.activitySettlementId = activitySettlementId;
    this.caseActivityId = caseActivityId;
    this.costDetail = costDetail;
  }

  public ActivitySettlementDetail() {
  }

  public Long getId() {
    return Id;
  }

  public void setId(Long id) {
    Id = id;
  }

  public Long getActivitySettlementId() {
    return activitySettlementId;
  }

  public void setActivitySettlementId(Long activitySettlementId) {
    this.activitySettlementId = activitySettlementId;
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

}
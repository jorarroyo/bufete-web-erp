package com.bufete.backend.model.recordFiles;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "proctor_agenda_detail")
public class ProctorAgendaDetail {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "proctor_agenda_id")
  private Long proctorAgendaId;
  @Column(name = "case_activity_id")
  private Long caseActivityId;
  private String comment;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "activity_cost")
  private Double activityCost;
  @Column(name = "currency_type")
  private Integer currencyType;

  public ProctorAgendaDetail(Long proctorAgendaId, Long caseActivityId, String comment, StatusName status, Double activityCost, Integer currencyType) {
    this.proctorAgendaId = proctorAgendaId;
    this.caseActivityId = caseActivityId;
    this.comment = comment;
    this.status = status;
    this.activityCost = activityCost;
    this.currencyType = currencyType;
  }

  public ProctorAgendaDetail() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getProctorAgendaId() {
    return proctorAgendaId;
  }

  public void setProctorAgendaId(Long proctorAgendaId) {
    this.proctorAgendaId = proctorAgendaId;
  }

  public Long getCaseActivityId() {
    return caseActivityId;
  }

  public void setCaseActivityId(Long caseActivityId) {
    this.caseActivityId = caseActivityId;
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

  public Double getActivityCost() {
    return activityCost;
  }

  public void setActivityCost(Double activityCost) {
    this.activityCost = activityCost;
  }

  public Integer getCurrencyType() {
    return currencyType;
  }

  public void setCurrencyType(Integer currencyType) {
    this.currencyType = currencyType;
  }

}
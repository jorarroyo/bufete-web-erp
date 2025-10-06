package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.bufete.backend.model.shared.CaseActivityType;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class CaseActivityRequest implements Serializable {

  private Long id;
  @JsonProperty("activity_id")
  private Long activityId;
  @JsonProperty("institution_id")
  private Long institutionId;
  private String comment;
  @JsonProperty("activity_time")
  private Double activityTime;
  @JsonProperty("assign_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy/MM/dd")
  private Date assignDate;
  private StatusName status;
  @JsonProperty("file_record_id")
  private Long recordFileId;
  @JsonProperty("employee_id")
  private Long employeeId;
  @JsonProperty("activity_cost")
  private Double activityCost;
  @JsonProperty("currency_type")
  private Integer currencyType;
  @JsonProperty("check_number")
  private String checkNumber;
  @JsonProperty("check_amount")
  private Double checkAmount;
  @JsonProperty("activity_start_date")
  private Date activityStartDate;
  @JsonProperty("activity_end_date")
  private Date activityEndDate;
  @JsonProperty("case_activity_type")
  private CaseActivityType caseActivityType;
  @JsonProperty("activity_name")
  private String activityName;
  @JsonProperty("activity_details")
  private List<CaseActivityDetailRequest> caseActivityDetailRequest;

  public CaseActivityRequest(Long id, Long activityId, Long institutionId, String comment, Double activityTime,
      Date assignDate, StatusName status, Long recordFileId, Long employeeId, Double activityCost, Integer currencyType,
      String checkNumber, Double checkAmount, Date activityStartDate, Date activityEndDate,
                             CaseActivityType caseActivityType, String activityName, List<CaseActivityDetailRequest> caseActivityDetailRequest) {
    this.id = id;
    this.activityId = activityId;
    this.institutionId = institutionId;
    this.comment = comment;
    this.activityTime = activityTime;
    this.assignDate = assignDate;
    this.status = status;
    this.recordFileId = recordFileId;
    this.employeeId = employeeId;
    this.activityCost = activityCost;
    this.currencyType = currencyType;
    this.checkNumber = checkNumber;
    this.checkAmount = checkAmount;
    this.activityStartDate = activityStartDate;
    this.activityEndDate = activityEndDate;
    this.caseActivityType = caseActivityType;
    this.activityName = activityName;
    this.caseActivityDetailRequest = caseActivityDetailRequest;
  }

  public CaseActivityRequest() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getActivityId() {
    return activityId;
  }

  public void setActivityId(Long activityId) {
    this.activityId = activityId;
  }

  public Long getInstitutionId() {
    return institutionId;
  }

  public void setInstitutionId(Long institutionId) {
    this.institutionId = institutionId;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Double getActivityTime() {
    return activityTime;
  }

  public void setActivityTime(Double activityTime) {
    this.activityTime = activityTime;
  }

  public Date getAssignDate() {
    return assignDate;
  }

  public void setAssignDate(Date assignDate) {
    this.assignDate = assignDate;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  private static final long serialVersionUID = 1L;

  public Long getRecordFileId() {
    return recordFileId;
  }

  public void setRecordFileId(Long recordFileId) {
    this.recordFileId = recordFileId;
  }

  public Long getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(Long employeeId) {
    this.employeeId = employeeId;
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

  public String getCheckNumber() {
    return checkNumber;
  }

  public void setCheckNumber(String checkNumber) {
    this.checkNumber = checkNumber;
  }

  public Double getCheckAmount() {
    return checkAmount;
  }

  public void setCheckAmount(Double checkAmount) {
    this.checkAmount = checkAmount;
  }

  public Date getActivityStartDate() {
    return activityStartDate;
  }

  public void setActivityStartDate(Date activityStartDate) {
    this.activityStartDate = activityStartDate;
  }

  public Date getActivityEndDate() {
    return activityEndDate;
  }

  public void setActivityEndDate(Date activityEndDate) {
    this.activityEndDate = activityEndDate;
  }

  public CaseActivityType getCaseActivityType() { return caseActivityType; }

  public void setCaseActivityType(CaseActivityType caseActivityType) { this.caseActivityType = caseActivityType; }

  public String getActivityName() { return activityName; }

  public void setActivityName(String activityName) { this.activityName = activityName; }

  public List<CaseActivityDetailRequest> getCaseActivityDetailRequest() {
    return caseActivityDetailRequest;
  }

  public void setCaseActivityDetailRequest(List<CaseActivityDetailRequest> caseActivityDetailRequest) {
    this.caseActivityDetailRequest = caseActivityDetailRequest;
  }
}
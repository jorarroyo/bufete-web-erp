package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.bufete.backend.model.shared.CaseActivityType;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class CaseActivityResponse implements Serializable {

  private Long id;
  @JsonProperty("activity_name")
  private String activityName;
  @JsonProperty("institution_name")
  private String institutionName;
  private String comment;
  @JsonProperty("activity_time")
  private Double activityTime;
  @JsonProperty("assign_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy/MM/dd")
  private Date assignDate;
  private StatusName status;
  @JsonProperty("file_record_id")
  private Long recordFileId;
  @JsonProperty("employee_name")
  private String employeeName;
  private String created;
  private String modified;
  @JsonProperty("file_num")
  private String fileNum;
  private String priority;
  @JsonProperty("activity_cost")
  private Double activityCost;
  @JsonProperty("currency_type")
  private Integer currencyType;
  @JsonProperty("activity_id")
  private Long activityId;
  @JsonProperty("institution_id")
  private Long institutionId;
  @JsonProperty("employee_id")
  private Long employeeId;
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
  @JsonProperty("activity_details")
  private List<CaseActivityDetailResponse> caseActivityDetailRequest;

  public CaseActivityResponse(Long id, String activityName, String institutionName, String comment, Double activityTime,
      Date assignDate, StatusName status, Long recordFileId, String employeeName, String created, String modified,
      String fileNum, String priority, Double activityCost, Integer currencyType,
      String checkNumber, Double checkAmount, Date activityStartDate, Date activityEndDate, CaseActivityType caseActivityType,
                              List<CaseActivityDetailResponse> caseActivityDetailRequest) {
    this.id = id;
    this.activityName = activityName;
    this.institutionName = institutionName;
    this.comment = comment;
    this.activityTime = activityTime;
    this.assignDate = assignDate;
    this.status = status;
    this.recordFileId = recordFileId;
    this.employeeName = employeeName;
    this.created = created;
    this.modified = modified;
    this.fileNum = fileNum;
    this.priority = priority;
    this.activityCost = activityCost;
    this.currencyType = currencyType;
    this.checkNumber = checkNumber;
    this.checkAmount = checkAmount;
    this.activityStartDate = activityStartDate;
    this.activityEndDate = activityEndDate;
    this.caseActivityType = caseActivityType;
    this.caseActivityDetailRequest = caseActivityDetailRequest;
  }

  public CaseActivityResponse() {
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

  public void setActivityName(String activityName) {
    this.activityName = activityName;
  }

  public void setInstitutionName(String institutionName) {
    this.institutionName = institutionName;
  }

  public String getActivityName() {
    return activityName;
  }

  public String getInstitutionName() {
    return institutionName;
  }

  public String getEmployeeName() {
    return employeeName;
  }

  public void setEmployeeName(String employeeName) {
    this.employeeName = employeeName;
  }

  public String getCreated() {
    return created;
  }

  public void setCreated(String created) {
    this.created = created;
  }

  public String getModified() {
    return modified;
  }

  public void setModified(String modified) {
    this.modified = modified;
  }

  public String getFileNum() {
    return fileNum;
  }

  public void setFileNum(String fileNum) {
    this.fileNum = fileNum;
  }

  public String getPriority() {
    return priority;
  }

  public void setPriority(String priority) {
    this.priority = priority;
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

  public Long getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(Long employeeId) {
    this.employeeId = employeeId;
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

  public Date getActivityStartDate() { return activityStartDate; }

  public void setActivityStartDate(Date activityStartDate) { this.activityStartDate = activityStartDate; }

  public Date getActivityEndDate() { return activityEndDate; }

  public void setActivityEndDate(Date activityEndDate) { this.activityEndDate = activityEndDate; }

  public CaseActivityType getCaseActivityType() { return caseActivityType; }

  public void setCaseActivityType(CaseActivityType caseActivityType) { this.caseActivityType = caseActivityType; }

  public List<CaseActivityDetailResponse> getCaseActivityDetailRequest() {
    return caseActivityDetailRequest;
  }

  public void setCaseActivityDetailRequest(List<CaseActivityDetailResponse> caseActivityDetailRequest) {
    this.caseActivityDetailRequest = caseActivityDetailRequest;
  }
}
package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.Date;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ActivitySettleDetailResponse implements Serializable {

  private Long id;
  @JsonProperty("case_activity_id")
  private Long caseActivityId;
  @JsonProperty("cost_detail")
  private Double costDetail;
  @JsonProperty("activity_name")
  private String activityName;
  @JsonProperty("institution_name")
  private String institutionName;
  private String comment;
  @JsonProperty("assign_date")
  private Date assignDate;
  @JsonProperty("activity_time")
  private Double activityTime;
  private StatusName status;
  @JsonProperty("employee_name")
  private String employeeName;
  @JsonProperty("file_num")
  private String fileNum;
  private String priority;

  public ActivitySettleDetailResponse(Long id, Long caseActivityId, Double costDetail, String activityName,
      String institutionName, String comment, Date assignDate, Double activityTime, StatusName status,
      String employeeName, String fileNum, String priority) {
    this.id = id;
    this.caseActivityId = caseActivityId;
    this.costDetail = costDetail;
    this.activityName = activityName;
    this.institutionName = institutionName;
    this.comment = comment;
    this.assignDate = assignDate;
    this.activityTime = activityTime;
    this.status = status;
    this.employeeName = employeeName;
    this.fileNum = fileNum;
    this.priority = priority;
  }

  public ActivitySettleDetailResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public String getActivityName() {
    return activityName;
  }

  public void setActivityName(String activityName) {
    this.activityName = activityName;
  }

  public String getInstitutionName() {
    return institutionName;
  }

  public void setInstitutionName(String institutionName) {
    this.institutionName = institutionName;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Date getAssignDate() {
    return assignDate;
  }

  public void setAssignDate(Date assignDate) {
    this.assignDate = assignDate;
  }

  public Double getActivityTime() {
    return activityTime;
  }

  public void setActivityTime(Double activityTime) {
    this.activityTime = activityTime;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public String getEmployeeName() {
    return employeeName;
  }

  public void setEmployeeName(String employeeName) {
    this.employeeName = employeeName;
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
  
  private static final long serialVersionUID = 1L;
}
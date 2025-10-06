package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.Date;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class ProctorAgendaDetailResponse implements Serializable {

  private Long id;
  @JsonProperty("activity_name")
  private String activityName;
  @JsonProperty("institution_name")
  private String institutionName;
  @JsonProperty("assign_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd")
  private Date assignDate;
  private StatusName status;
  @JsonProperty("employee_name")
  private String employeeName;
  @JsonProperty("file_num")
  private String fileNum;
  private String priority;
  @JsonProperty("proctor_detail_id")
  private Long proctorDetailId;
  @JsonProperty("activity_cost")
  private Double activityCost;
  private String comment;
  @JsonProperty("currency_type")
  private Integer currencyType;
  @JsonProperty("client_name")
  private String clientName;
  @JsonProperty("check_number")
  private String checkNumber;
  @JsonProperty("check_amount")
  private Double checkAmount;

  public ProctorAgendaDetailResponse(Long id, String activityName, String institutionName, Date assignDate,
      StatusName status, String employeeName, String fileNum, String priority, Long proctorDetailId, Double activityCost,
      String comment, Integer currencyType, String clientName, String checkNumber, Double checkAmount) {
    this.id = id;
    this.activityName = activityName;
    this.institutionName = institutionName;
    this.assignDate = assignDate;
    this.status = status;
    this.employeeName = employeeName;
    this.fileNum = fileNum;
    this.priority = priority;
    this.proctorDetailId = proctorDetailId;
    this.activityCost = activityCost;
    this.comment = comment;
    this.currencyType = currencyType;
    this.clientName = clientName;
    this.checkNumber = checkNumber;
    this.checkAmount = checkAmount;
  }

  public ProctorAgendaDetailResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public Long getProctorDetailId() {
    return proctorDetailId;
  }

  public void setProctorDetailId(Long proctorDetailId) {
    this.proctorDetailId = proctorDetailId;
  }

  public Double getActivityCost() {
    return activityCost;
  }

  public void setActivityCost(Double activityCost) {
    this.activityCost = activityCost;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Integer getCurrencyType() {
    return currencyType;
  }

  public void setCurrencyType(Integer currencyType) {
    this.currencyType = currencyType;
  }

  public String getClientName() {
    return clientName;
  }

  public void setClientName(String clientName) {
    this.clientName = clientName;
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

}
package com.bufete.backend.model.recordFiles;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.shared.CaseActivityType;
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "case_activity_view")
public class CaseActivityView {

  @Id
  private Long id;
  @Column(name = "activity_name")
  private String activityName;
  @Column(name = "institution_name")
  private String institutionName;
  private String comment;
  @Column(name = "assign_date")
  private Date assignDate;
  @Column(name = "activity_time")
  private Double activityTime;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "file_record_id")
  private Long recordFileId;
  @Column(name = "employee_name")
  private String employeeName;
  @Column(name = "employee_id")
  private Long employeeId;
  private String created;
  private String modified;
  @Column(name = "file_num")
  private String fileNum;
  private String priority;
  @Column(name = "proctor_agenda_id")
  private Long proctorAgendaId;
  @Column(name = "activity_cost")
  private Double activityCost;
  @Column(name = "currency_type")
  private Integer currencyType;
  @Column(name = "activity_id")
  private Long activityId;
  @Column(name = "institution_id")
  private Long institutionId;
  @Column(name = "check_number")
  private String checkNumber;
  @Column(name = "check_amount")
  private Double checkAmount;
  private Long position;
  @Column(name = "activity_start_date")
  private Date activityStartDate;
  @Column(name = "activity_end_date")
  private Date activityEndDate;
  @Enumerated(EnumType.STRING)
  @Column(name = "case_activity_type", length = 20)
  private CaseActivityType caseActivityType;

  public Long getPosition() {
    return position;
  }

  public void setPosition(Long position) {
    this.position = position;
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

  public Long getRecordFileId() {
    return recordFileId;
  }

  public void setRecordFileId(Long recordFileId) {
    this.recordFileId = recordFileId;
  }

  public String getEmployeeName() {
    return employeeName;
  }

  public void setEmployeeName(String employeeName) {
    this.employeeName = employeeName;
  }

  public Long getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(Long employeeId) {
    this.employeeId = employeeId;
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

  public Long getProctorAgendaId() {
    return proctorAgendaId;
  }

  public void setProctorAgendaId(Long proctorAgendaId) {
    this.proctorAgendaId = proctorAgendaId;
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

  public void setCaseActivityType(CaseActivityType caseActivityType) {
    this.caseActivityType = caseActivityType;
  }
}
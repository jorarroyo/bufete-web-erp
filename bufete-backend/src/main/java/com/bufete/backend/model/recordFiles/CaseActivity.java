package com.bufete.backend.model.recordFiles;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.shared.CaseActivityType;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.lang.Nullable;

@Entity
@Table(name = "case_activity")
public class CaseActivity extends UserDateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "activity_id")
  private Long activityId;
  @Column(name = "institution_id")
  @Nullable
  private Long institutionId;
  private String comment;
  @Column(name = "activity_time")
  private Double activityTime;
  @Column(name = "assign_date")
  private Date assignDate;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "file_record_id")
  private Long recordFileId;
  @Column(name = "employee_id")
  private Long employeeId;
  @Column(name = "activity_cost")
  private Double activityCost;
  @Column(name = "proctor_agenda_id")
  private Long proctorAgendaId;
  @Column(name = "currency_type")
  private Integer currencyType;
  @Column(name = "check_number")
  private String checkNumber;
  @Column(name = "check_amount")
  private Double checkAmount;
  @Column(name = "activity_start_date")
  private Date activityStartDate;
  @Column(name = "activity_end_date")
  private Date activityEndDate;
  @Enumerated(EnumType.STRING)
  @Column(name = "case_activity_type", length = 20)
  private CaseActivityType caseActivityType;
  @Column(name = "activity_name")
  private String activityName;

  public CaseActivity(Long id, Long activityId, Long institutionId, String comment, Double activityTime,
      Date assignDate, StatusName status, Long recordFileId, Long employeeId, Double activityCost, Integer currencyType,
      String checkNumber, Double checkAmount, Date activityStartDate, Date activityEndDate, CaseActivityType caseActivityType,
                      String activityName) {
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
  }

  public CaseActivity() {
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

  private static final long serialVersionUID = 1L;

  public Double getActivityCost() {
    return activityCost;
  }

  public void setActivityCost(Double activityCost) {
    this.activityCost = activityCost;
  }

  public Long getProctorAgendaId() {
    return proctorAgendaId;
  }

  public void setProctorAgendaId(Long proctorAgendaId) {
    this.proctorAgendaId = proctorAgendaId;
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

  public Date getActivityStartDate() { return activityStartDate; }

  public void setActivityStartDate(Date activityStartDate) { this.activityStartDate = activityStartDate; }

  public Date getActivityEndDate() { return activityEndDate; }

  public void setActivityEndDate(Date activityEndDate) { this.activityEndDate = activityEndDate; }

  public CaseActivityType getCaseActivityType() { return caseActivityType; }

  public void setCaseActivityType(CaseActivityType caseActivityType) { this.caseActivityType = caseActivityType; }

  public String getActivityName() { return activityName; }

  public void setActivityName(String activityName) { this.activityName = activityName; }
}
package com.bufete.backend.model.inventory;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.shared.ActionsName;

@Entity
@Table(name = "stamp_duty_action")
public class StampDutyAction extends UserDateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long stampId;
  private String comment;
  @Column(name = "stamp_number")
  private Double stampNumber;
  @Column(name = "purchase_date")
  private Date purchaseDate;
  @Column(name = "employee_id")
  private Long employeeId;
  @Column(name = "form_number")
  private String formNumber;
  @Column(name = "form_range")
  private String formRange;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private ActionsName action;
  @Column(name = "activity_id")
  private Long activityId;

  public StampDutyAction(Long stampId, String comment, Double stampNumber, Date purchaseDate, Long employeeId,
      String formNumber, String formRange, ActionsName action, Long activityId) {
    this.stampId = stampId;
    this.comment = comment;
    this.stampNumber = stampNumber;
    this.purchaseDate = purchaseDate;
    this.employeeId = employeeId;
    this.formNumber = formNumber;
    this.formRange = formRange;
    this.action = action;
    this.activityId = activityId;
  }

  public StampDutyAction() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getStampId() {
    return stampId;
  }

  public void setStampId(Long stampId) {
    this.stampId = stampId;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Double getStampNumber() {
    return stampNumber;
  }

  public void setStampNumber(Double stampNumber) {
    this.stampNumber = stampNumber;
  }

  public Date getPurchaseDate() {
    return purchaseDate;
  }

  public void setPurchaseDate(Date purchaseDate) {
    this.purchaseDate = purchaseDate;
  }

  public Long getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(Long employeeId) {
    this.employeeId = employeeId;
  }

  public String getFormNumber() {
    return formNumber;
  }

  public void setFormNumber(String formNumber) {
    this.formNumber = formNumber;
  }

  public String getFormRange() {
    return formRange;
  }

  public void setFormRange(String formRange) {
    this.formRange = formRange;
  }

  public ActionsName getAction() {
    return action;
  }

  public void setAction(ActionsName action) {
    this.action = action;
  }

  private static final long serialVersionUID = 1L;

  public Long getActivityId() {
    return activityId;
  }

  public void setActivityId(Long activityId) {
    this.activityId = activityId;
  }
}
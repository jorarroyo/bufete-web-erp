package com.bufete.backend.payload.inventory;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.bufete.backend.model.shared.ActionsName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class StampDutyRequest implements Serializable {

  private Long id;
  @JsonProperty("stamp_type")
  private Long stampType;
  @JsonProperty("designation_type")
  private Long designationType;
  private Integer year;
  private String comment;
  @JsonProperty("stamp_number")
  private Double stampNumber;
  @JsonProperty("purchase_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd")
  private Date purchaseDate;
  @JsonProperty("employee_id")
  private Long employeeId;
  @JsonProperty("form_number")
  private String formNumber;
  @JsonProperty("form_range")
  private String formRange;
  @Enumerated(EnumType.STRING)
  private ActionsName action;
  @JsonProperty("activity_id")
  private Long activityId;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getStampType() {
    return stampType;
  }

  public void setStampType(Long stampType) {
    this.stampType = stampType;
  }

  public Long getDesignationType() {
    return designationType;
  }

  public void setDesignationType(Long designationType) {
    this.designationType = designationType;
  }

  public Integer getYear() {
    return year;
  }

  public void setYear(Integer year) {
    this.year = year;
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
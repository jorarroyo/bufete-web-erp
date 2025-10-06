package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class ActivityAvailableRequest implements Serializable {

  @JsonProperty("employee_id")
  private Long employeeId;
  @JsonProperty("assign_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy/MM/dd")
  private Date assignDate;

  public ActivityAvailableRequest(Long employeeId, Date assignDate) {
    this.employeeId = employeeId;
    this.assignDate = assignDate;
  }

  public ActivityAvailableRequest() {
  }

  public Long getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(Long employeeId) {
    this.employeeId = employeeId;
  }

  public Date getAssignDate() {
    return assignDate;
  }

  public void setAssignDate(Date assignDate) {
    this.assignDate = assignDate;
  }

  private static final long serialVersionUID = 1L;

}
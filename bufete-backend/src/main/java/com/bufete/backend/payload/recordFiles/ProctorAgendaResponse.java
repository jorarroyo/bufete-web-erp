package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.Date;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class ProctorAgendaResponse implements Serializable {

  private Long id;
  @JsonProperty("employee_id")
  private Long employeeId;
  @JsonProperty("employee_name")
  private String employeeName;
  @JsonProperty("assign_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd")
  private Date assignDate;
  private String comment;
  private StatusName status;
  @JsonProperty("proctor_agenda_cost_local")
  private Double proctorAgendaCostLocal;
  @JsonProperty("proctor_agenda_cost_outer")
  private Double proctorAgendaCostOuter;
  private String created;
  private String modified;

  public ProctorAgendaResponse(Long id, Long employeeId, String employeeName, Date assignDate, String comment,
      StatusName status, Double proctorAgendaCostLocal, Double proctorAgendaCostOuter, String created, String modified) {
    this.id = id;
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.assignDate = assignDate;
    this.comment = comment;
    this.status = status;
    this.proctorAgendaCostLocal = proctorAgendaCostLocal;
    this.proctorAgendaCostOuter = proctorAgendaCostOuter;
    this.created = created;
    this.modified = modified;
  }

  public ProctorAgendaResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(Long employeeId) {
    this.employeeId = employeeId;
  }

  public String getEmployeeName() {
    return employeeName;
  }

  public void setEmployeeName(String employeeName) {
    this.employeeName = employeeName;
  }

  public Date getAssignDate() {
    return assignDate;
  }

  public void setAssignDate(Date assignDate) {
    this.assignDate = assignDate;
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

  public Double getProctorAgendaCostLocal() {
    return proctorAgendaCostLocal;
  }

  public void setProctorAgendaCostLocal(Double proctorAgendaCostLocal) {
    this.proctorAgendaCostLocal = proctorAgendaCostLocal;
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
  
  private static final long serialVersionUID = 1L;

  public Double getProctorAgendaCostOuter() {
    return proctorAgendaCostOuter;
  }

  public void setProctorAgendaCostOuter(Double proctorAgendaCostOuter) {
    this.proctorAgendaCostOuter = proctorAgendaCostOuter;
  }

}
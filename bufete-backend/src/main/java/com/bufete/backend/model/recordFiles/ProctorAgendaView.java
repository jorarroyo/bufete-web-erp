package com.bufete.backend.model.recordFiles;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "proctor_agenda_view")
public class ProctorAgendaView {

  @Id
  private Long id;
  @Column(name = "employee_id")
  private Long employeeId;
  @Column(name = "employee_name")
  private String employeeName;
  @Column(name = "assign_date")
  private Date assignDate;
  private String comment;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "proctor_agenda_cost_local")
  private Double proctorAgendaCostLocal;
  @Column(name = "proctor_agenda_cost_outer")
  private Double proctorAgendaCostOuter;
  @Column(name = "agenda_return_amount_local")
  private Double agendaReturnAmountLocal;
  @Column(name = "agenda_return_amount_outer")
  private Double agendaReturnAmountOuter;
  private String created;
  private String modified;

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

  public Double getProctorAgendaCostOuter() {
    return proctorAgendaCostOuter;
  }

  public void setProctorAgendaCostOuter(Double proctorAgendaCostOuter) {
    this.proctorAgendaCostOuter = proctorAgendaCostOuter;
  }

  public Double getAgendaReturnAmountLocal() {
    return agendaReturnAmountLocal;
  }

  public void setAgendaReturnAmountLocal(Double agendaReturnAmountLocal) {
    this.agendaReturnAmountLocal = agendaReturnAmountLocal;
  }

  public Double getAgendaReturnAmountOuter() {
    return agendaReturnAmountOuter;
  }

  public void setAgendaReturnAmountOuter(Double agendaReturnAmountOuter) {
    this.agendaReturnAmountOuter = agendaReturnAmountOuter;
  }

}
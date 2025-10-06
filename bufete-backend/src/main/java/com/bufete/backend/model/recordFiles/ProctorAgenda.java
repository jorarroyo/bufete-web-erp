package com.bufete.backend.model.recordFiles;

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
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "proctor_agenda")
public class ProctorAgenda extends UserDateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "employee_id")
  private Long employeeId;
  @Column(name = "assign_date")
  private Date assignDate;
  private String comment;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "proctor_agenda_cost_local")
  private Double proctorAgendaCostLocal;
  @Column(name = "agenda_invoice_amount_local")
  private Double agendaInvoiceAmountLocal;
  @Column(name = "agenda_return_amount_local")
  private Double agendaReturnAmountLocal;
  @Column(name = "proctor_agenda_cost_outer")
  private Double proctorAgendaCostOuter;
  @Column(name = "agenda_invoice_amount_outer")
  private Double agendaInvoiceAmountOuter;
  @Column(name = "agenda_return_amount_outer")
  private Double agendaReturnAmountOuter;

  public ProctorAgenda(Long employeeId, Date assignDate, String comment, StatusName status,
      Double proctorAgendaCostLocal, Double agendaInvoiceAmountLocal, Double proctorAgendaCostOuter, 
      Double agendaInvoiceAmountOuter, Double agendaReturnAmountLocal, Double agendaReturnAmountOuter) {
    this.employeeId = employeeId;
    this.assignDate = assignDate;
    this.comment = comment;
    this.status = status;
    this.proctorAgendaCostLocal = proctorAgendaCostLocal;
    this.agendaInvoiceAmountLocal = agendaInvoiceAmountLocal;
    this.proctorAgendaCostOuter = proctorAgendaCostOuter;
    this.agendaInvoiceAmountOuter = agendaInvoiceAmountOuter;
    this.agendaReturnAmountLocal = agendaReturnAmountLocal;
    this.agendaReturnAmountOuter = agendaReturnAmountOuter;
  }

  public ProctorAgenda() {
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

  private static final long serialVersionUID = 1L;

  public Double getAgendaReturnAmountLocal() {
    return agendaReturnAmountLocal;
  }

  public void setAgendaReturnAmountLocal(Double agendaReturnAmountLocal) {
    this.agendaReturnAmountLocal = agendaReturnAmountLocal;
  }

  public Double getProctorAgendaCostOuter() {
    return proctorAgendaCostOuter;
  }

  public void setProctorAgendaCostOuter(Double proctorAgendaCostOuter) {
    this.proctorAgendaCostOuter = proctorAgendaCostOuter;
  }

  public Double getAgendaReturnAmountOuter() {
    return agendaReturnAmountOuter;
  }

  public void setAgendaReturnAmountOuter(Double agendaReturnAmountOuter) {
    this.agendaReturnAmountOuter = agendaReturnAmountOuter;
  }

  public Double getAgendaInvoiceAmountLocal() {
    return agendaInvoiceAmountLocal;
  }

  public void setAgendaInvoiceAmountLocal(Double agendaInvoiceAmountLocal) {
    this.agendaInvoiceAmountLocal = agendaInvoiceAmountLocal;
  }

  public Double getAgendaInvoiceAmountOuter() {
    return agendaInvoiceAmountOuter;
  }

  public void setAgendaInvoiceAmountOuter(Double agendaInvoiceAmountOuter) {
    this.agendaInvoiceAmountOuter = agendaInvoiceAmountOuter;
  }

}
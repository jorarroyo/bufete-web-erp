package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class ProctorAgendaListResponse implements Serializable {

  private Long id;
  @JsonProperty("employee_id")
  private Long employeeId;
  @JsonProperty("employee_name")
  private String employeeName;
  @JsonProperty("assign_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy/MM/dd")
  private Date assignDate;
  private String comment;
  private StatusName status;
  @JsonProperty("proctor_agenda_cost_local")
  private Double proctorAgendaCostLocal;
  @JsonProperty("proctor_agenda_cost_outer")
  private Double proctorAgendaCostOuter;
  @JsonProperty("agenda_return_amount_local")
  private Double agendaReturnAmountLocal;
  @JsonProperty("agenda_return_amount_outer")
  private Double agendaReturnAmountOuter;
  @JsonProperty("activity_list")
  private List<ProctorAgendaDetailResponse> activityList;
  @JsonProperty("invoice_list")
  private List<ActivitySettleResponseList> invoiceList;
  
  public ProctorAgendaListResponse(Long id, Long employeeId, String employeeName, Date assignDate, String comment,
  StatusName status, Double proctorAgendaCostLocal, Double proctorAgendaCostOuter, Double agendaReturnAmountLocal, 
  Double agendaReturnAmountOuter, List<ProctorAgendaDetailResponse> activityList) {
    this.id = id;
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.assignDate = assignDate;
    this.comment = comment;
    this.status = status;
    this.proctorAgendaCostLocal = proctorAgendaCostLocal;
    this.proctorAgendaCostOuter = proctorAgendaCostOuter;
    this.agendaReturnAmountLocal = agendaReturnAmountLocal;
    this.agendaReturnAmountOuter = agendaReturnAmountOuter;
    this.activityList = activityList;
  }
  
  public ProctorAgendaListResponse() {
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
  
  public List<ProctorAgendaDetailResponse> getActivityList() {
    return activityList;
  }
  
  public void setActivityList(List<ProctorAgendaDetailResponse> activityList) {
    this.activityList = activityList;
  }
  
  private static final long serialVersionUID = 1L;

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

  public List<ActivitySettleResponseList> getInvoiceList() {
    return invoiceList;
  }

  public void setInvoiceList(List<ActivitySettleResponseList> invoiceList) {
    this.invoiceList = invoiceList;
  }
  
}
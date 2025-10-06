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
@Table(name = "activity_settlement")
public class ActivitySettlement extends UserDateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String comments;
  @Column(name = "invoice_num")
  private String invoiceNum;
  @Column(name = "invoice_range")
  private String invoiceRange;
  @Column(name = "invoice_name")
  private String invoiceName;
  @Column(name = "invoice_description")
  private String invoiceDescription;
  @Column(name = "invoice_total")
  private Double invoiceTotal;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "assign_date")
  private Date assignDate;
  @Column(name = "proctor_agenda_id")
  private Long proctorAgendaId;
  @Column(name = "invoice_type")
  private Integer invoiceType;
  @Column(name = "invoice_currency")
  private Integer invoiceCurrency;

  public ActivitySettlement(String comments, String invoiceNum, String invoiceRange, String invoiceName,
      String invoiceDescription, Double invoiceTotal, StatusName status, Date assignDate, Long proctorAgendaId, 
      Integer invoiceType, Integer invoiceCurrency) {
    this.comments = comments;
    this.invoiceNum = invoiceNum;
    this.invoiceRange = invoiceRange;
    this.invoiceName = invoiceName;
    this.invoiceDescription = invoiceDescription;
    this.invoiceTotal = invoiceTotal;
    this.status = status;
    this.assignDate = assignDate;
    this.proctorAgendaId = proctorAgendaId;
    this.invoiceType = invoiceType;
    this.invoiceCurrency = invoiceCurrency;
  }

  public ActivitySettlement() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getComments() {
    return comments;
  }

  public void setComments(String comments) {
    this.comments = comments;
  }

  public String getInvoiceNum() {
    return invoiceNum;
  }

  public void setInvoiceNum(String invoiceNum) {
    this.invoiceNum = invoiceNum;
  }

  public String getInvoiceRange() {
    return invoiceRange;
  }

  public void setInvoiceRange(String invoiceRange) {
    this.invoiceRange = invoiceRange;
  }

  public String getInvoiceName() {
    return invoiceName;
  }

  public void setInvoiceName(String invoiceName) {
    this.invoiceName = invoiceName;
  }

  public String getInvoiceDescription() {
    return invoiceDescription;
  }

  public void setInvoiceDescription(String invoiceDescription) {
    this.invoiceDescription = invoiceDescription;
  }

  public Double getInvoiceTotal() {
    return invoiceTotal;
  }

  public void setInvoiceTotal(Double invoiceTotal) {
    this.invoiceTotal = invoiceTotal;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  private static final long serialVersionUID = 1L;

  public Date getAssignDate() {
    return assignDate;
  }

  public void setAssignDate(Date assignDate) {
    this.assignDate = assignDate;
  }

  public Long getProctorAgendaId() {
    return proctorAgendaId;
  }

  public void setProctorAgendaId(Long proctorAgendaId) {
    this.proctorAgendaId = proctorAgendaId;
  }

  public Integer getInvoiceType() {
    return invoiceType;
  }

  public void setInvoiceType(Integer invoiceType) {
    this.invoiceType = invoiceType;
  }

  public Integer getInvoiceCurrency() {
    return invoiceCurrency;
  }

  public void setInvoiceCurrency(Integer invoiceCurrency) {
    this.invoiceCurrency = invoiceCurrency;
  }

}
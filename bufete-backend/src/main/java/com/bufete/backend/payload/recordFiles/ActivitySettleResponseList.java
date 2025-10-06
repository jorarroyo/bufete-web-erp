package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.Date;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class ActivitySettleResponseList implements Serializable {

  private Long id;
  private String comments;
  @JsonProperty("invoice_num")
  private String invoiceNum;
  @JsonProperty("invoice_range")
  private String invoiceRange;
  @JsonProperty("invoice_name")
  private String invoiceName;
  @JsonProperty("invoice_description")
  private String invoiceDescription;
  @JsonProperty("invoice_total")
  private Double invoiceTotal;
  private StatusName status;
  @JsonProperty("assign_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd")
  private Date assignDate;
  @JsonProperty("invoice_type")
  private Integer invoiceType;
  @JsonProperty("invoice_currency")
  private Integer invoiceCurrency;

  public ActivitySettleResponseList(Long id, String comments, String invoiceNum, String invoiceRange,
      String invoiceName, String invoiceDescription, Double invoiceTotal, StatusName status, Date assignDate, Integer invoiceType, Integer invoiceCurrency) {
    this.id = id;
    this.comments = comments;
    this.invoiceNum = invoiceNum;
    this.invoiceRange = invoiceRange;
    this.invoiceName = invoiceName;
    this.invoiceDescription = invoiceDescription;
    this.invoiceTotal = invoiceTotal;
    this.status = status;
    this.assignDate = assignDate;
    this.invoiceType = invoiceType;
    this.invoiceCurrency = invoiceCurrency;
  }

  public ActivitySettleResponseList() {
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

  public Date getAssignDate() {
    return assignDate;
  }

  public void setAssignDate(Date assignDate) {
    this.assignDate = assignDate;
  }

  private static final long serialVersionUID = 1L;

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
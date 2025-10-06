package com.bufete.backend.model.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.shared.StatusName;

import java.util.Date;

@Entity
@Table(name = "stamp_report_view")
public class StampReportView {

  @Id
  private Long id;
  @Column(name = "request_date")
  private Date requestDate;
  @Column(name = "requester_name")
  private String requesterName;
  @Column(name = "file_num")
  private String fileNum;
  @Column(name = "client_name")
  private String clientName;
  private String reference;
  private Double total;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "file_record_id")
  private Long fileRecordId;
  @Column(name = "request_type")
  private Integer requestType;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Date getRequestDate() {
    return requestDate;
  }

  public void setRequestDate(Date requestDate) {
    this.requestDate = requestDate;
  }

  public String getRequesterName() {
    return requesterName;
  }

  public void setRequesterName(String requesterName) {
    this.requesterName = requesterName;
  }

  public String getFileNum() {
    return fileNum;
  }

  public void setFileNum(String fileNum) {
    this.fileNum = fileNum;
  }

  public String getClientName() {
    return clientName;
  }

  public void setClientName(String clientName) {
    this.clientName = clientName;
  }

  public Double getTotal() {
    return total;
  }

  public void setTotal(Double total) {
    this.total = total;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public Long getFileRecordId() {
    return fileRecordId;
  }

  public void setFileRecordId(Long fileRecordId) {
    this.fileRecordId = fileRecordId;
  }

  public String getReference() {
    return reference;
  }

  public void setReference(String reference) {
    this.reference = reference;
  }

  public Integer getRequestType() {
    return requestType;
  }

  public void setRequestType(Integer requestType) {
    this.requestType = requestType;
  }
  
}
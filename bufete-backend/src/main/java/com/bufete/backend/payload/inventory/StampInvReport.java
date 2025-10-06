package com.bufete.backend.payload.inventory;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class StampInvReport implements Serializable {

  private Long id;
  @JsonProperty("request_date")
  @JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy")
  private Date requestDate;
  @JsonProperty("requester_name")
  private String requesterName;
  @JsonProperty("file_num")
  private String fileNum;
  @JsonProperty("client_name")
  private String clientName;
  private String reference;
  private Double total;
  @JsonProperty("request_type")
  private Integer requestType; 
  @JsonProperty("detail_list")
  private List<StampInvReportDetail> detailList;

  public StampInvReport(Long id, Date requestDate, String requesterName, String fileNum, String clientName,
      String reference, Double total, Integer requestType, List<StampInvReportDetail> detailList) {
    this.id = id;
    this.requestDate = requestDate;
    this.requesterName = requesterName;
    this.fileNum = fileNum;
    this.clientName = clientName;
    this.reference = reference;
    this.total = total;
    this.requestType = requestType;
    this.detailList = detailList;
  }

  public StampInvReport() {
  }

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

  public String getReference() {
    return reference;
  }

  public void setReference(String reference) {
    this.reference = reference;
  }

  public Double getTotal() {
    return total;
  }

  public void setTotal(Double total) {
    this.total = total;
  }

  public List<StampInvReportDetail> getDetailList() {
    return detailList;
  }
  
  public void setDetailList(List<StampInvReportDetail> detailList) {
    this.detailList = detailList;
  }
  
  private static final long serialVersionUID = 1L;

  public Integer getRequestType() {
    return requestType;
  }

  public void setRequestType(Integer requestType) {
    this.requestType = requestType;
  }
}
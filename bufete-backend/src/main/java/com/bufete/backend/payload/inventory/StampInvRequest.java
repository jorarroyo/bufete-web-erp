package com.bufete.backend.payload.inventory;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class StampInvRequest implements Serializable {

  private Long id;
  @JsonProperty("request_type")
  private Integer requestType;
  @JsonProperty("requester_id")
  private Long requesterId;
  @JsonProperty("request_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy/MM/dd")
  private Date requestDate;
  private String reference;
  @JsonProperty("file_record_id")
  private Long recordId;
  private Double total;
  @JsonProperty("detail_list")
  private List<StampInvDetailRequest> detailList;
  private StatusName status;
  @JsonProperty("receipt_number")
  private String receiptNumber;

  public StampInvRequest(Long id, Integer requestType, Long requesterId, Date requestDate, String reference,
      Long recordId, Double total, List<StampInvDetailRequest> detailList, StatusName status, String receiptNumber) {
    this.id = id;
    this.requestType = requestType;
    this.requesterId = requesterId;
    this.requestDate = requestDate;
    this.reference = reference;
    this.recordId = recordId;
    this.total = total;
    this.detailList = detailList;
    this.status = status;
    this.receiptNumber = receiptNumber;
  }

  public StampInvRequest() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getRequestType() {
    return requestType;
  }

  public void setRequestType(Integer requestType) {
    this.requestType = requestType;
  }

  public Long getRequesterId() {
    return requesterId;
  }

  public void setRequesterId(Long requesterId) {
    this.requesterId = requesterId;
  }

  public Date getRequestDate() {
    return requestDate;
  }

  public void setRequestDate(Date requestDate) {
    this.requestDate = requestDate;
  }

  public String getReference() {
    return reference;
  }

  public void setReference(String reference) {
    this.reference = reference;
  }

  public Long getRecordId() {
    return recordId;
  }

  public void setRecordId(Long recordId) {
    this.recordId = recordId;
  }

  public Double getTotal() {
    return total;
  }

  public void setTotal(Double total) {
    this.total = total;
  }

  private static final long serialVersionUID = 1L;

  public List<StampInvDetailRequest> getDetailList() {
    return detailList;
  }

  public void setDetailList(List<StampInvDetailRequest> detailList) {
    this.detailList = detailList;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public String getReceiptNumber() {
    return receiptNumber;
  }

  public void setReceiptNumber(String receiptNumber) {
    this.receiptNumber = receiptNumber;
  }
}
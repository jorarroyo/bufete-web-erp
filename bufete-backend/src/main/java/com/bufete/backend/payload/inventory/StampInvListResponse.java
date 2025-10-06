package com.bufete.backend.payload.inventory;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class StampInvListResponse implements Serializable {

  private Long id;
  @JsonProperty("inventory_type_name")
  private String inventoryTypeName;
  @JsonProperty("request_date")
  private String requestDate;
  @JsonProperty("requester_name")
  private String requesterName;
  @JsonProperty("file_num")
  private String fileNum;
  private Double total;
  private String created;
  private StatusName status;
  @JsonProperty("request_type")
  private Integer requestType;

  public StampInvListResponse(Long id, String inventoryTypeName, String requestDate, String requesterName, String fileNum,
      Double total, String created, StatusName status, Integer requestType) {
    this.id = id;
    this.inventoryTypeName = inventoryTypeName;
    this.requestDate = requestDate;
    this.requesterName = requesterName;
    this.fileNum = fileNum;
    this.total = total;
    this.created = created;
    this.status = status;
    this.requestType = requestType;
  }

  public StampInvListResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getInventoryTypeName() {
    return inventoryTypeName;
  }

  public void setInventoryTypeName(String inventoryTypeName) {
    this.inventoryTypeName = inventoryTypeName;
  }

  public String getRequestDate() {
    return requestDate;
  }

  public void setRequestDate(String requestDate) {
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

  public Double getTotal() {
    return total;
  }

  public void setTotal(Double total) {
    this.total = total;
  }

  public String getCreated() {
    return created;
  }

  public void setCreated(String created) {
    this.created = created;
  }

  private static final long serialVersionUID = 1L;

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public Integer getInventoryType() {
    return requestType;
  }

  public void setInventoryType(Integer requestType) {
    this.requestType = requestType;
  }
}
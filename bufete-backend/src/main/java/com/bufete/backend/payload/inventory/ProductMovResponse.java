package com.bufete.backend.payload.inventory;

import java.io.Serializable;

import com.bufete.backend.model.shared.ActionsName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductMovResponse implements Serializable {

  private Long id;
  @JsonProperty("request_date")
  private String requestDate;
  @JsonProperty("requester_name")
  private String requesterName;
  @JsonProperty("file_num")
  private String fileNum;
  private ActionsName action;
  private Double quantity;
  @JsonProperty("product_id")
  private Long productId;

  public ProductMovResponse(Long id, String requestDate, String requesterName, String fileNum, ActionsName action,
      Double quantity, Long productId) {
    this.id = id;
    this.requestDate = requestDate;
    this.requesterName = requesterName;
    this.fileNum = fileNum;
    this.action = action;
    this.quantity = quantity;
    this.productId = productId;
  }

  public ProductMovResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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

  public ActionsName getAction() {
    return action;
  }

  public void setAction(ActionsName action) {
    this.action = action;
  }

  public Double getQuantity() {
    return quantity;
  }

  public void setQuantity(Double quantity) {
    this.quantity = quantity;
  }

  public Long getProductId() {
    return productId;
  }

  public void setProductId(Long productId) {
    this.productId = productId;
  }

  private static final long serialVersionUID = 1L;
}
package com.bufete.backend.model.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.shared.ActionsName;

@Entity
@Table(name = "product_mov_view")
public class ProductMovView {

  @Id
  private Long id;
  @Column(name = "request_date")
  private String requestDate;
  @Column(name = "requester_name")
  private String requesterName;
  @Column(name = "file_num")
  private String fileNum;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private ActionsName action;
  private Double quantity;
  @Column(name = "product_id")
  private Long productId;

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

}
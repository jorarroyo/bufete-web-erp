package com.bufete.backend.model.inventory;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "stamp_inventory_view")
public class StampInventoryView {

  @Id
  private Long id;
  @Column(name = "inventory_type_name")
  private String inventoryTypeName;
  @Column(name = "request_date")
  private String requestDate;
  @Column(name = "request_date_original")
  private Date requestDateOriginal;
  @Column(name = "requester_name")
  private String requesterName;
  @Column(name = "file_num")
  private String fileNum;
  private Double total;
  private String created;
  @Enumerated(EnumType.STRING)
  @Column(name = "inventory_type", length = 20)
  private ProductType inventoryType;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "file_record_id")
  private Long fileRecordId;
  @Column(name = "request_type")
  private Integer requestType;
  @Column(name = "requester_id")
  private Long requesterId;
  private String reference;
  @Column(name = "receipt_number")
  private String receiptNumber;

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

  public ProductType getInventoryType() {
    return inventoryType;
  }

  public void setInventoryType(ProductType inventoryType) {
    this.inventoryType = inventoryType;
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

  public String getReference() {
    return reference;
  }

  public void setReference(String reference) {
    this.reference = reference;
  }

  public Date getRequestDateOriginal() {
    return requestDateOriginal;
  }

  public void setRequestDateOriginal(Date requestDateOriginal) {
    this.requestDateOriginal = requestDateOriginal;
  }

  public String getReceiptNumber() {
    return receiptNumber;
  }

  public void setReceiptNumber(String receiptNumber) {
    this.receiptNumber = receiptNumber;
  }
  
}
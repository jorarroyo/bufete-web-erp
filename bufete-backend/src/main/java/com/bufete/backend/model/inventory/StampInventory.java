package com.bufete.backend.model.inventory;

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
import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "stamp_inventory")
public class StampInventory extends UserDateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "request_type")
  private Integer requestType;
  @Column(name = "requester_id")
  private Long requesterId;
  @Column(name = "request_date")
  private Date requestDate;
  private String reference;
  @Column(name = "file_record_id")
  private Long recordId;
  private Double total;
  @Enumerated(EnumType.STRING)
  @Column(name = "inventory_type", length = 20)
  private ProductType inventoryType;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  @Column(name = "receipt_number")
  private String receiptNumber;
  
  public StampInventory(Long id, Integer requestType, Long requesterId, Date requestDate, String reference, Long recordId, Double total, 
  ProductType inventoryType, StatusName status, String receiptNumber) {
    this.id = id;
    this.requestType = requestType;
    this.requesterId = requesterId;
    this.requestDate = requestDate;
    this.reference = reference;
    this.recordId = recordId;
    this.total = total;
    this.inventoryType = inventoryType;
    this.status = status;
    this.receiptNumber = receiptNumber;
  }
  
  public StampInventory() {
  }
  
  public Long getId() {
    return id;
  }
  
  public void setId(Long id) {
    this.id = id;
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
  
  private static final long serialVersionUID = 1L;

  public Integer getRequestType() {
    return requestType;
  }

  public void setRequestType(Integer requestType) {
    this.requestType = requestType;
  }

  public Double getTotal() {
    return total;
  }

  public void setTotal(Double total) {
    this.total = total;
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

  public String getReceiptNumber() {
    return receiptNumber;
  }

  public void setReceiptNumber(String receiptNumber) {
    this.receiptNumber = receiptNumber;
  }
}
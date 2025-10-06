package com.bufete.backend.model.recordFiles;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.accountReceivable.PaymentReceipt;
import com.bufete.backend.model.billingProcess.Receipt;
import com.bufete.backend.model.billingProcess.ReceiptSettlement;
import com.bufete.backend.model.shared.StatusName;

import java.util.List;

@Entity
@Table(name = "clients")
public class Client extends UserDateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(min = 2, max = 100)
  private String name;

  @Size(max = 100)
  private String lastName;

  @Size(max = 10)
  private String nit;

  @Size(max = 10)
  private String acronym;

  /** 1: Empresa, 2: Individual, 3: Grupo */
  @NotNull
  private Integer clientType;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;

  @OneToMany(mappedBy = "client")
  private List<ReceiptSettlement> receiptSettlementList;

  @OneToMany(mappedBy = "client")
  private List<Receipt> receipts;

  @OneToMany(mappedBy = "client")
  private List<PaymentReceipt> paymentReceiptList;

  @OneToMany(mappedBy="parentClient")
  private List<Client> childClients;

  @ManyToOne
  private Client parentClient;

  public Client(String name, String lastName, String nit, String acronym, Integer clientType, StatusName status) {
    this.name = name;
    this.lastName = lastName;
    this.nit = nit;
    this.acronym = acronym;
    this.clientType = clientType;
    this.status = status;
  }

  public Client() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getNit() {
    return nit;
  }

  public void setNit(String nit) {
    this.nit = nit;
  }

  public String getAcronym() {
    return acronym;
  }

  public void setAcronym(String acronym) {
    this.acronym = acronym;
  }

  public Integer getClientType() {
    return clientType;
  }

  public void setClientType(Integer clientType) {
    this.clientType = clientType;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public List<ReceiptSettlement> getReceiptSettlementList() { return receiptSettlementList; }

  public void setReceiptSettlementList(List<ReceiptSettlement> receiptSettlementList) { this.receiptSettlementList = receiptSettlementList; }

  public List<Receipt> getReceipts() { return receipts; }

  public void setReceipts(List<Receipt> receipts) { this.receipts = receipts; }

  public List<PaymentReceipt> getPaymentReceiptList() {
    return paymentReceiptList;
  }

  public void setPaymentReceiptList(List<PaymentReceipt> paymentReceiptList) {
    this.paymentReceiptList = paymentReceiptList;
  }

  public List<Client> getChildClients() {
    return childClients;
  }

  public void setChildClients(List<Client> childClients) {
    this.childClients = childClients;
  }

  public Client getParentClient() {
    return parentClient;
  }

  public void setParentClient(Client parentClient) {
    this.parentClient = parentClient;
  }

  private static final long serialVersionUID = 1L;
}
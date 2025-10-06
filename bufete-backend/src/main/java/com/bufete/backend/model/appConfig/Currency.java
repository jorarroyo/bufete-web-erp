package com.bufete.backend.model.appConfig;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.bufete.backend.model.audit.DateAudit;
import com.bufete.backend.model.billingProcess.Expenses;
import com.bufete.backend.model.accountReceivable.PaymentReceipt;
import com.bufete.backend.model.billingProcess.Receipt;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@Table(name = "currencies")
public class Currency extends DateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long Id;

  @NotBlank
  @Size(max = 100)
  private String name;

  @NotBlank
  @Size(max = 10)
  @Column(name = "short_name")
  private String shortName;

  @Column(name = "exchange_value")
  private Double exchangeValue;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "company_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JsonIgnore
  private Company company;

  @OneToMany(mappedBy = "expensesCurrency")
  private List<Expenses> expensesList;

  @OneToMany(mappedBy = "currency")
  private List<Receipt> receiptList;

  @OneToMany(mappedBy = "currency")
  private List<PaymentReceipt> paymentReceipts;

  public Currency(String name, String shortName, Double exchangeValue, StatusName status, Company company) {
    this.name = name;
    this.shortName = shortName;
    this.exchangeValue = exchangeValue;
    this.status = status;
    this.company = company;
  }

  public Currency() {
  }

  public Long getId() {
    return Id;
  }

  public void setId(Long id) {
    Id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getShortName() {
    return shortName;
  }

  public void setShortName(String shortName) {
    this.shortName = shortName;
  }

  public Double getExchangeValue() {
    return exchangeValue;
  }

  public void setExchangeValue(Double exchangeValue) {
    this.exchangeValue = exchangeValue;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public Company getCompany() {
    return company;
  }

  public void setCompany(Company company) {
    this.company = company;
  }

  public List<Expenses> getExpensesList() {
    return expensesList;
  }

  public void setExpensesList(List<Expenses> expensesList) {
    this.expensesList = expensesList;
  }

  public List<Receipt> getReceiptList() { return receiptList; }

  public void setReceiptList(List<Receipt> receiptList) { this.receiptList = receiptList; }

  public List<PaymentReceipt> getPaymentReceipts() {
    return paymentReceipts;
  }

  public void setPaymentReceipts(List<PaymentReceipt> paymentReceipts) {
    this.paymentReceipts = paymentReceipts;
  }

  private static final long serialVersionUID = 1L;
}
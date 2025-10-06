package com.bufete.backend.model.accountReceivable;

import com.bufete.backend.model.appConfig.Currency;
import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.recordFiles.Client;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "payment_receipt")
public class PaymentReceipt extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;

    @Column(name = "payment_date")
    private Date paymentDate;

    @Column(name = "total_payment")
    private Double totalPayment;

    @ManyToOne
    @JoinColumn(name = "currency_id", referencedColumnName = "id")
    private Currency currency;

    @Column(name = "exchange_rate")
    private Double exchangeRate;

    private String comments;

    @OneToMany(mappedBy = "paymentReceipt")
    private List<PaymentTransDet> paymentTransDets;

    @OneToMany(mappedBy = "paymentReceipt")
    private List<PaymentReceiptDetail> paymentReceiptDetailList;

    @OneToMany(mappedBy = "paymentReceipt")
    private List<AdvanceBalance> advanceBalanceList;

    public PaymentReceipt(Client client, StatusName status, Date paymentDate, Double totalPayment, Currency currency, Double exchangeRate, String comments) {
        this.client = client;
        this.status = status;
        this.paymentDate = paymentDate;
        this.totalPayment = totalPayment;
        this.currency = currency;
        this.exchangeRate = exchangeRate;
        this.comments = comments;
    }

    public PaymentReceipt() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Double getTotalPayment() {
        return totalPayment;
    }

    public void setTotalPayment(Double totalPayment) {
        this.totalPayment = totalPayment;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Double getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(Double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public List<PaymentReceiptDetail> getPaymentReceiptDetailList() {
        return paymentReceiptDetailList;
    }

    public void setPaymentReceiptDetailList(List<PaymentReceiptDetail> paymentReceiptDetailList) {
        this.paymentReceiptDetailList = paymentReceiptDetailList;
    }

    public List<PaymentTransDet> getPaymentTransDets() {
        return paymentTransDets;
    }

    public void setPaymentTransDets(List<PaymentTransDet> paymentTransDets) {
        this.paymentTransDets = paymentTransDets;
    }

    public List<AdvanceBalance> getAdvanceBalanceList() {
        return advanceBalanceList;
    }

    public void setAdvanceBalanceList(List<AdvanceBalance> advanceBalanceList) {
        this.advanceBalanceList = advanceBalanceList;
    }
}

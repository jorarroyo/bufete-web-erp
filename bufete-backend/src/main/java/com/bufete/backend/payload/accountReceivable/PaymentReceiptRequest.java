package com.bufete.backend.payload.accountReceivable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class PaymentReceiptRequest implements Serializable {

    private Long id;
    @JsonProperty("client_id")
    private Long clientId;
    private StatusName status;
    @JsonProperty("payment_date")
    private Date paymentDate;
    @JsonProperty("total_payment")
    private Double totalPayment;
    @JsonProperty("currency_id")
    private Long currencyId;
    @JsonProperty("exchange_rate")
    private Double exchangeRate;
    private String comments;
    @JsonProperty("transaction_detail_list")
    private List<PaymentTransDetRequest> transactionDetailList;
    @JsonProperty("detail_list")
    private List<PaymentReceiptDetailRequest> paymentReceiptDetailList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
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

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
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

    public List<PaymentTransDetRequest> getTransactionDetailList() {
        return transactionDetailList;
    }

    public void setTransactionDetailList(List<PaymentTransDetRequest> transactionDetailList) {
        this.transactionDetailList = transactionDetailList;
    }

    public List<PaymentReceiptDetailRequest> getPaymentReceiptDetailList() {
        return paymentReceiptDetailList;
    }

    public void setPaymentReceiptDetailList(List<PaymentReceiptDetailRequest> paymentReceiptDetailList) {
        this.paymentReceiptDetailList = paymentReceiptDetailList;
    }
}

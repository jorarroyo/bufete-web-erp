package com.bufete.backend.payload.accountReceivable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class PaymentReceiptResponse implements Serializable {

    private Long id;
    @JsonProperty("client_id")
    private Long clientId;
    @JsonProperty("client_name")
    private String clientName;
    private StatusName status;
    @JsonProperty("payment_date")
    private Date paymentDate;
    @JsonProperty("total_payment")
    private Double totalPayment;
    @JsonProperty("currency_id")
    private Long currencyId;
    @JsonProperty("currency_name")
    private String currencyName;
    @JsonProperty("exchange_rate")
    private Double exchangeRate;
    private String comments;
    @JsonProperty("details")
    private List<PaymentReceiptDetailResponse> paymentReceiptDetailResponseList;
    @JsonProperty("transaction_detail_list")
    private List<PaymentTransDetResponse> transactionDetailList;

    public PaymentReceiptResponse(Long id, Long clientId, String clientName, StatusName status, Date paymentDate,
                                  Double totalPayment, String comments, Long currencyId, String currencyName, Double exchangeRate,
                                  List<PaymentReceiptDetailResponse> paymentReceiptDetailResponseList,
                                  List<PaymentTransDetResponse> transactionDetailList) {
        this.id = id;
        this.clientId = clientId;
        this.clientName = clientName;
        this.status = status;
        this.paymentDate = paymentDate;
        this.totalPayment = totalPayment;
        this.comments = comments;
        this.currencyId = currencyId;
        this.currencyName = currencyName;
        this.exchangeRate = exchangeRate;
        this.paymentReceiptDetailResponseList = paymentReceiptDetailResponseList;
        this.transactionDetailList = transactionDetailList;
    }

    public PaymentReceiptResponse() {
    }

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

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
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

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public String getCurrencyName() {
        return currencyName;
    }

    public void setCurrencyName(String currencyName) {
        this.currencyName = currencyName;
    }

    public Double getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(Double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public List<PaymentReceiptDetailResponse> getPaymentReceiptDetailResponseList() {
        return paymentReceiptDetailResponseList;
    }

    public void setPaymentReceiptDetailResponseList(List<PaymentReceiptDetailResponse> paymentReceiptDetailResponseList) {
        this.paymentReceiptDetailResponseList = paymentReceiptDetailResponseList;
    }

    public List<PaymentTransDetResponse> getTransactionDetailList() {
        return transactionDetailList;
    }

    public void setTransactionDetailList(List<PaymentTransDetResponse> transactionDetailList) {
        this.transactionDetailList = transactionDetailList;
    }
}

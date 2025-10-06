package com.bufete.backend.payload.accountReceivable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;

public class ReceiptsPaymentDetailResponse implements Serializable {

    private Long id;
    @JsonProperty("serial_number")
    private String serialNumber;
    @JsonProperty("series_value")
    private String seriesValue;
    private Double balance;
    private StatusName status;
    @JsonProperty("client_id")
    private Long clientId;
    @JsonProperty("receipt_total")
    private Double receiptTotal;
    @JsonProperty("currency_id")
    private Long currencyId;
    @JsonProperty("currency_name")
    private String currencyName;
    @JsonProperty("receipt_date")
    private Date receiptDate;

    public ReceiptsPaymentDetailResponse(Long id, String serialNumber, String seriesValue, Double balance, StatusName status,
                                         Long clientId, Double receiptTotal, Long currencyId, String currencyName, Date receiptDate) {
        this.id = id;
        this.serialNumber = serialNumber;
        this.seriesValue = seriesValue;
        this.balance = balance;
        this.status = status;
        this.clientId = clientId;
        this.receiptTotal = receiptTotal;
        this.currencyId = currencyId;
        this.currencyName = currencyName;
        this.receiptDate = receiptDate;
    }

    public ReceiptsPaymentDetailResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getSeriesValue() {
        return seriesValue;
    }

    public void setSeriesValue(String seriesValue) {
        this.seriesValue = seriesValue;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Double getReceiptTotal() {
        return receiptTotal;
    }

    public void setReceiptTotal(Double receiptTotal) {
        this.receiptTotal = receiptTotal;
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

    public Date getReceiptDate() {
        return receiptDate;
    }

    public void setReceiptDate(Date receiptDate) {
        this.receiptDate = receiptDate;
    }
}

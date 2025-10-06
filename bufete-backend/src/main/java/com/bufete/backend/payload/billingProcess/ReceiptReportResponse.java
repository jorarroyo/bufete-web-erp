package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ReceiptReportResponse implements Serializable {

    private Long id;
    @JsonProperty("client_name")
    private String clientName;
    @JsonProperty("serial_number")
    private String serialNumber;
    private StatusName status;
    @JsonProperty("receipt_date")
    private String receiptDate;
    @JsonProperty("receipt_total")
    private Double receiptTotal;
    @JsonProperty("receipt_total_no_iva")
    private Double receiptTotalNoIVA;
    @JsonProperty("receipt_retention")
    private Double receiptRetention;
    @JsonProperty("receipt_no_retention")
    private Double receiptNoRetention;
    @JsonProperty("invoice_series_id")
    private Long invoiceSeriesId;
    @JsonProperty("series_value")
    private String seriesValue;
    @JsonProperty("exchange_rate")
    private Double exchangeRate;
    @JsonProperty("currency_name")
    private String currencyName;

    public ReceiptReportResponse(Long id, String clientName, String serialNumber, StatusName status, String receiptDate,
                                 Double receiptTotal, Double receiptTotalNoIVA, Double receiptRetention,
                                 Double receiptNoRetention, Long invoiceSeriesId, String seriesValue, Double exchangeRate,
                                 String currencyName) {
        this.id = id;
        this.clientName = clientName;
        this.serialNumber = serialNumber;
        this.status = status;
        this.receiptDate = receiptDate;
        this.receiptTotal = receiptTotal;
        this.receiptTotalNoIVA = receiptTotalNoIVA;
        this.receiptRetention = receiptRetention;
        this.receiptNoRetention = receiptNoRetention;
        this.invoiceSeriesId = invoiceSeriesId;
        this.seriesValue = seriesValue;
        this.exchangeRate = exchangeRate;
        this.currencyName = currencyName;
    }

    public ReceiptReportResponse() {
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getClientName() { return clientName; }

    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getSerialNumber() { return serialNumber; }

    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }

    public String getReceiptDate() { return receiptDate; }

    public void setReceiptDate(String receiptDate) { this.receiptDate = receiptDate; }

    public Double getReceiptTotal() { return receiptTotal; }

    public void setReceiptTotal(Double receiptTotal) { this.receiptTotal = receiptTotal; }

    public Double getReceiptTotalNoIVA() { return receiptTotalNoIVA; }

    public void setReceiptTotalNoIVA(Double receiptTotalNoIVA) { this.receiptTotalNoIVA = receiptTotalNoIVA; }

    public Double getReceiptRetention() { return receiptRetention; }

    public void setReceiptRetention(Double receiptRetention) { this.receiptRetention = receiptRetention; }

    public Double getReceiptNoRetention() { return receiptNoRetention; }

    public void setReceiptNoRetention(Double receiptNoRetention) { this.receiptNoRetention = receiptNoRetention; }

    public Long getInvoiceSeriesId() { return invoiceSeriesId; }

    public void setInvoiceSeriesId(Long invoiceSeriesId) { this.invoiceSeriesId = invoiceSeriesId; }

    public String getSeriesValue() { return seriesValue; }

    public void setSeriesValue(String seriesValue) { this.seriesValue = seriesValue; }

    public Double getExchangeRate() { return exchangeRate; }

    public void setExchangeRate(Double exchangeRate) { this.exchangeRate = exchangeRate; }

    public String getCurrencyName() { return currencyName; }

    public void setCurrencyName(String currencyName) { this.currencyName = currencyName; }
}

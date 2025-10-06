package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;

public class ReceiptResponseView implements Serializable {
    private Long id;
    @JsonProperty("serial_number")
    private String serialNumber;
    @JsonProperty("client_name")
    private String clientName;
    private String nit;
    private StatusName status;
    @JsonProperty("receipt_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date receiptDate;
    @JsonProperty("receipt_total")
    private Double receiptTotal;
    @JsonProperty("receipt_total_discount")
    private Double receiptTotalDiscount;
    private String created;
    private String modified;
    @JsonProperty("currency_name")
    private String currencyName;
    @JsonProperty("series_name")
    private String seriesName;

    public ReceiptResponseView(Long id, String serialNumber, String clientName, String nit, StatusName status, Date receiptDate,
                               Double receiptTotal, Double receiptTotalDiscount, String created, String modified, String currencyName,
                               String seriesName) {
        this.id = id;
        this.serialNumber = serialNumber;
        this.clientName = clientName;
        this.nit = nit;
        this.status = status;
        this.receiptDate = receiptDate;
        this.receiptTotal = receiptTotal;
        this.receiptTotalDiscount = receiptTotalDiscount;
        this.created = created;
        this.modified = modified;
        this.currencyName = currencyName;
        this.seriesName = seriesName;
    }

    public ReceiptResponseView() {
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getSerialNumber() { return serialNumber; }

    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public String getClientName() { return clientName; }

    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getNit() { return nit; }

    public void setNit(String nit) { this.nit = nit; }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }

    public Date getReceiptDate() { return receiptDate; }

    public void setReceiptDate(Date receiptDate) { this.receiptDate = receiptDate; }

    public Double getReceiptTotal() { return receiptTotal; }

    public void setReceiptTotal(Double receiptTotal) { this.receiptTotal = receiptTotal; }

    public Double getReceiptTotalDiscount() { return receiptTotalDiscount; }

    public void setReceiptTotalDiscount(Double receiptTotalDiscount) { this.receiptTotalDiscount = receiptTotalDiscount; }

    public String getCreated() { return created; }

    public void setCreated(String created) { this.created = created; }

    public String getModified() { return modified; }

    public void setModified(String modified) { this.modified = modified; }

    public String getCurrencyName() { return currencyName; }

    public void setCurrencyName(String currencyName) { this.currencyName = currencyName; }

    public String getSeriesName() {
        return seriesName;
    }

    public void setSeriesName(String seriesName) {
        this.seriesName = seriesName;
    }
}

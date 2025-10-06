package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "receipts_report")
public class ReceiptReport {

    @Id
    private Long id;
    @Column(name = "client_name")
    private String clientName;
    @Column(name = "serial_number")
    private String serialNumber;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "receipt_date")
    private String receiptDate;
    @Column(name = "receipt_search_date")
    private Date receiptSearchDate;
    @Column(name = "receipt_total")
    private Double receiptTotal;
    @Column(name = "receipt_total_no_iva")
    private Double receiptTotalNoIVA;
    @Column(name = "receipt_retention")
    private Double receiptRetention;
    @Column(name = "receipt_no_retention")
    private Double receiptNoRetention;
    @Column(name = "invoice_series_id")
    private Long invoiceSeriesId;
    @Column(name = "series_value")
    private String seriesValue;
    @Column(name = "exchange_rate")
    private Double exchangeRate;
    @Column(name = "currency_name")
    private String currencyName;

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

    public Date getReceiptSearchDate() { return receiptSearchDate; }

    public void setReceiptSearchDate(Date receiptSearchDate) { this.receiptSearchDate = receiptSearchDate; }

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

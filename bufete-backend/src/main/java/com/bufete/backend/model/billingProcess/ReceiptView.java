package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "receipt_view")
public class ReceiptView {
    @Id
    private Long id;
    @Column(name = "serial_number")
    private String serialNumber;
    @Column(name = "client_name")
    private String clientName;
    private String nit;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "receipt_date")
    private Date receiptDate;
    @Column(name = "receipt_total")
    private Double receiptTotal;
    @Column(name = "receipt_total_discount")
    private Double receiptTotalDiscount;
    private String created;
    private String modified;
    @Column(name = "currency_name")
    private String currencyName;
    @Column(name = "series_name")
    private String seriesName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSerialNumber() { return serialNumber; }

    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Date getReceiptDate() {
        return receiptDate;
    }

    public void setReceiptDate(Date receiptDate) {
        this.receiptDate = receiptDate;
    }

    public Double getReceiptTotal() {
        return receiptTotal;
    }

    public void setReceiptTotal(Double receiptTotal) {
        this.receiptTotal = receiptTotal;
    }

    public Double getReceiptTotalDiscount() {
        return receiptTotalDiscount;
    }

    public void setReceiptTotalDiscount(Double receiptTotalDiscount) {
        this.receiptTotalDiscount = receiptTotalDiscount;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getModified() {
        return modified;
    }

    public void setModified(String modified) {
        this.modified = modified;
    }

    public String getCurrencyName() { return currencyName; }

    public void setCurrencyName(String currencyName) { this.currencyName = currencyName; }

    public String getSeriesName() {
        return seriesName;
    }

    public void setSeriesName(String seriesName) {
        this.seriesName = seriesName;
    }
}

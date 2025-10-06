package com.bufete.backend.model.accountReceivable;

import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "receipts_payment_detail")
public class ReceiptsPaymentDetail {

    @Id
    private Long id;
    @Column(name = "detail_id")
    private Long detailId;
    @Column(name = "payment_receipt_id")
    private Long paymentReceiptId;
    @Column(name = "serial_number")
    private String serialNumber;
    @Column(name = "series_value")
    private String seriesValue;
    private Double balance;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "client_id")
    private Long clientId;
    @Column(name = "receipt_total")
    private Double receiptTotal;
    @Column(name = "currency_id")
    private Long currencyId;
    @Column(name = "currency_name")
    private String currencyName;
    @Column(name = "receipt_date")
    private Date receiptDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDetailId() {
        return detailId;
    }

    public void setDetailId(Long detailId) {
        this.detailId = detailId;
    }

    public Long getPaymentReceiptId() {
        return paymentReceiptId;
    }

    public void setPaymentReceiptId(Long paymentReceiptId) {
        this.paymentReceiptId = paymentReceiptId;
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

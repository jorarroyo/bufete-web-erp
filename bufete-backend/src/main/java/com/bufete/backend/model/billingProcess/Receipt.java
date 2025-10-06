package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.accountReceivable.PaymentReceiptDetail;
import com.bufete.backend.model.appConfig.Currency;
import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.recordFiles.Client;
import com.bufete.backend.model.shared.ReceiptSettleEnumType;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "receipts")
public class Receipt extends UserDateAudit {

    @Id
    private Long id;
    @Column(name = "serial_number")
    private String serialNumber;
    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;
    @Column(name = "receipt_address_id")
    private Long receiptAddressId;
    @Column(name = "receipt_settlement_id")
    private Long receiptSettlementId;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "receipt_date")
    private Date receiptDate;
    @Column(name = "receipt_total")
    private Double receiptTotal;
    @Column(name = "receipt_iva")
    private Double receiptIVA;
    @ManyToOne
    @JoinColumn(name = "currency_id", referencedColumnName = "id")
    private Currency currency;
    @ManyToOne
    @JoinColumn(name = "invoice_series_id", referencedColumnName = "id")
    private InvoiceSerie invoiceSerie;
    @Column(name = "receipt_total_discount")
    private Double receiptTotalDiscount;
    @Enumerated(EnumType.STRING)
    @Column(name = "object_type", length = 20)
    private ReceiptSettleEnumType objectType;
    @Column(name = "exchange_rate")
    private Double exchangeRate;
    @Column(name = "is_one_time_client", columnDefinition = "boolean default false")
    private Boolean isOneTimeClient;
    @Column(columnDefinition = "double precision default '0'")
    private Double balance;
    @OneToMany(mappedBy = "receipt")
    private List<ReceiptDetail> receiptDetails;
    @OneToMany(mappedBy = "receipt")
    private List<PaymentReceiptDetail> paymentReceiptDetailList;

    public Receipt(String serialNumber, Client client, Long receiptAddressId, Long receiptSettlementId, StatusName status,
                   Date receiptDate, Double receiptTotal, Double receiptIVA, Currency currency, Double receiptTotalDiscount,
                   InvoiceSerie invoiceSerie, ReceiptSettleEnumType objectType, Double exchangeRate, Boolean isOneTimeClient,
                   Double balance) {
        this.serialNumber = serialNumber;
        this.client = client;
        this.receiptAddressId = receiptAddressId;
        this.receiptSettlementId = receiptSettlementId;
        this.status = status;
        this.receiptDate = receiptDate;
        this.receiptTotal = receiptTotal;
        this.receiptIVA = receiptIVA;
        this.currency = currency;
        this.receiptTotalDiscount = receiptTotalDiscount;
        this.invoiceSerie = invoiceSerie;
        this.objectType = objectType;
        this.exchangeRate = exchangeRate;
        this.isOneTimeClient = isOneTimeClient;
        this.balance = balance;
    }

    public Receipt() {
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getSerialNumber() { return serialNumber; }

    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public Client getClient() { return client; }

    public void setClient(Client client) { this.client = client; }

    public Long getReceiptAddress() { return receiptAddressId; }

    public void setReceiptAddress(Long receiptAddressId) { this.receiptAddressId = receiptAddressId; }

    public Long getReceiptAddressId() { return receiptAddressId; }

    public void setReceiptAddressId(Long receiptAddressId) { this.receiptAddressId = receiptAddressId; }

    public Long getReceiptSettlementId() { return receiptSettlementId; }

    public void setReceiptSettlementId(Long receiptSettlementId) { this.receiptSettlementId = receiptSettlementId; }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }

    public Date getReceiptDate() { return receiptDate; }

    public void setReceiptDate(Date receiptDate) { this.receiptDate = receiptDate; }

    public Double getReceiptTotal() { return receiptTotal; }

    public void setReceiptTotal(Double receiptTotal) { this.receiptTotal = receiptTotal; }

    public Double getReceiptTotalDiscount() { return receiptTotalDiscount; }

    public void setReceiptTotalDiscount(Double receiptTotalDiscount) { this.receiptTotalDiscount = receiptTotalDiscount; }

    public ReceiptSettleEnumType getObjectType() { return objectType; }

    public void setObjectType(ReceiptSettleEnumType objectType) { this.objectType = objectType; }

    public List<ReceiptDetail> getReceiptDetails() { return receiptDetails; }

    public Double getReceiptIVA() { return receiptIVA; }

    public void setReceiptIVA(Double receiptIVA) { this.receiptIVA = receiptIVA; }

    public Currency getCurrency() { return currency; }

    public void setCurrency(Currency currency) { this.currency = currency; }

    public void setReceiptDetails(List<ReceiptDetail> receiptDetails) { this.receiptDetails = receiptDetails; }

    public InvoiceSerie getInvoiceSerie() { return invoiceSerie; }

    public void setInvoiceSerie(InvoiceSerie invoiceSerie) { this.invoiceSerie = invoiceSerie; }

    public Double getExchangeRate() { return exchangeRate; }

    public void setExchangeRate(Double exchangeRate) { this.exchangeRate = exchangeRate; }

    public Boolean getOneTimeClient() { return isOneTimeClient; }

    public void setOneTimeClient(Boolean oneTimeClient) { isOneTimeClient = oneTimeClient; }

    public List<PaymentReceiptDetail> getPaymentReceiptDetailList() {
        return paymentReceiptDetailList;
    }

    public void setPaymentReceiptDetailList(List<PaymentReceiptDetail> paymentReceiptDetailList) {
        this.paymentReceiptDetailList = paymentReceiptDetailList;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
}

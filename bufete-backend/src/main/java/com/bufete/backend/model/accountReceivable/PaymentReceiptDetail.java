package com.bufete.backend.model.accountReceivable;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.billingProcess.Receipt;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;

@Entity
@Table(name = "payment_receipt_detail")
public class PaymentReceiptDetail extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "payment_receipt_id", referencedColumnName = "id")
    private PaymentReceipt paymentReceipt;

    @ManyToOne
    @JoinColumn(name = "receipt_id", referencedColumnName = "id")
    private Receipt receipt;

    @Column(name = "payment_balance")
    private Double paymentBalance;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;

    public PaymentReceiptDetail(PaymentReceipt paymentReceipt, Receipt receipt, Double paymentBalance, StatusName status) {
        this.paymentReceipt = paymentReceipt;
        this.receipt = receipt;
        this.paymentBalance = paymentBalance;
        this.status = status;
    }

    public PaymentReceiptDetail() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PaymentReceipt getPaymentReceipt() {
        return paymentReceipt;
    }

    public void setPaymentReceipt(PaymentReceipt paymentReceipt) {
        this.paymentReceipt = paymentReceipt;
    }

    public Receipt getReceipt() {
        return receipt;
    }

    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
    }

    public Double getPaymentBalance() {
        return paymentBalance;
    }

    public void setPaymentBalance(Double paymentBalance) {
        this.paymentBalance = paymentBalance;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }
}

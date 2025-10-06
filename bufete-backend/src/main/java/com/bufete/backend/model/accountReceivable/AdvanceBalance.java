package com.bufete.backend.model.accountReceivable;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;

@Entity
@Table(name = "advance_balance")
public class AdvanceBalance extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "payment_receipt_id", referencedColumnName = "id")
    private PaymentReceipt paymentReceipt;

    @Column(name = "payment_balance")
    private Double paymentBalance;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;

    public AdvanceBalance(PaymentReceipt paymentReceipt, Double paymentBalance, StatusName status) {
        this.paymentReceipt = paymentReceipt;
        this.paymentBalance = paymentBalance;
        this.status = status;
    }

    public AdvanceBalance() {
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

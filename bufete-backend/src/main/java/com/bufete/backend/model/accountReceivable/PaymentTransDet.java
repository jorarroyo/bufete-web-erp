package com.bufete.backend.model.accountReceivable;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.catalogs.Bank;
import com.bufete.backend.model.catalogs.TransactionType;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;

@Entity
@Table(name = "payment_transaction_detail")
public class PaymentTransDet extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "payment_receipt_id", referencedColumnName = "id")
    private PaymentReceipt paymentReceipt;

    @ManyToOne
    @JoinColumn(name = "bank_id", referencedColumnName = "id")
    private Bank bank;

    @ManyToOne
    @JoinColumn(name = "transaction_type_id", referencedColumnName = "id")
    private TransactionType transactionType;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;

    @Column(name = "doc_number")
    private String docNumber;

    @Column(name = "total_transaction")
    private Double totalTransaction;

    public PaymentTransDet(PaymentReceipt paymentReceipt, Bank bank, TransactionType transactionType, StatusName status, String docNumber, Double totalTransaction) {
        this.paymentReceipt = paymentReceipt;
        this.bank = bank;
        this.transactionType = transactionType;
        this.status = status;
        this.docNumber = docNumber;
        this.totalTransaction = totalTransaction;
    }

    public PaymentTransDet() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Bank getBank() {
        return bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public PaymentReceipt getPaymentReceipt() {
        return paymentReceipt;
    }

    public void setPaymentReceipt(PaymentReceipt paymentReceipt) {
        this.paymentReceipt = paymentReceipt;
    }

    public String getDocNumber() {
        return docNumber;
    }

    public void setDocNumber(String docNumber) {
        this.docNumber = docNumber;
    }

    public Double getTotalTransaction() {
        return totalTransaction;
    }

    public void setTotalTransaction(Double totalTransaction) {
        this.totalTransaction = totalTransaction;
    }
}

package com.bufete.backend.payload.accountReceivable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class PaymentTransDetResponse implements Serializable {

    private Long id;
    @JsonProperty("bank_id")
    private Long bankId;
    @JsonProperty("bank_name")
    private String bankName;
    @JsonProperty("transaction_type_id")
    private Long transactionTypeId;
    @JsonProperty("transaction_type_name")
    private String transactionTypeName;
    private StatusName status;
    @JsonProperty("total_transaction")
    private Double totalTransaction;
    @JsonProperty("doc_number")
    private String docNumber;

    public PaymentTransDetResponse(Long id, Long bankId, String bankName, Long transactionTypeId, String transactionTypeName,
                                   StatusName status, Double totalTransaction, String docNumber) {
        this.id = id;
        this.bankId = bankId;
        this.bankName = bankName;
        this.transactionTypeId = transactionTypeId;
        this.transactionTypeName = transactionTypeName;
        this.status = status;
        this.totalTransaction = totalTransaction;
        this.docNumber = docNumber;
    }

    public PaymentTransDetResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBankId() {
        return bankId;
    }

    public void setBankId(Long bankId) {
        this.bankId = bankId;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public Long getTransactionTypeId() {
        return transactionTypeId;
    }

    public void setTransactionTypeId(Long transactionTypeId) {
        this.transactionTypeId = transactionTypeId;
    }

    public String getTransactionTypeName() {
        return transactionTypeName;
    }

    public void setTransactionTypeName(String transactionTypeName) {
        this.transactionTypeName = transactionTypeName;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Double getTotalTransaction() {
        return totalTransaction;
    }

    public void setTotalTransaction(Double totalTransaction) {
        this.totalTransaction = totalTransaction;
    }

    public String getDocNumber() {
        return docNumber;
    }

    public void setDocNumber(String docNumber) {
        this.docNumber = docNumber;
    }
}

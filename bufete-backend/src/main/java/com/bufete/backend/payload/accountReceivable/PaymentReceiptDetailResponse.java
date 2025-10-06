package com.bufete.backend.payload.accountReceivable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class PaymentReceiptDetailResponse implements Serializable {

    private Long id;
    @JsonProperty("receipt_id")
    private Long receiptId;
    @JsonProperty("to_pay")
    private Double receiptTotal;
    @JsonProperty("balance_status")
    private StatusName status;

    public PaymentReceiptDetailResponse(Long id, Long receiptId, Double receiptTotal, StatusName status) {
        this.id = id;
        this.receiptId = receiptId;
        this.receiptTotal = receiptTotal;
        this.status = status;
    }

    public PaymentReceiptDetailResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getReceiptId() {
        return receiptId;
    }

    public void setReceiptId(Long receiptId) {
        this.receiptId = receiptId;
    }

    public Double getReceiptTotal() {
        return receiptTotal;
    }

    public void setReceiptTotal(Double receiptTotal) {
        this.receiptTotal = receiptTotal;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }
}

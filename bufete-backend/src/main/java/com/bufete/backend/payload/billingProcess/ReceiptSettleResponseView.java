package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.ReceiptSettleEnumType;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ReceiptSettleResponseView implements Serializable {

    private Long id;
    @JsonProperty("client_name")
    private String clientName;
    private StatusName status;
    @JsonProperty("receipt_total")
    private Double receiptTotal;
    private ReceiptSettleEnumType type;
    private String created;
    private String modified;

    public ReceiptSettleResponseView(Long id, String clientName, StatusName status, Double receiptTotal,
                                     ReceiptSettleEnumType type, String created, String modified) {
        this.id = id;
        this.clientName = clientName;
        this.status = status;
        this.receiptTotal = receiptTotal;
        this.type = type;
        this.created = created;
        this.modified = modified;
    }

    public ReceiptSettleResponseView() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Double getReceiptTotal() {
        return receiptTotal;
    }

    public void setReceiptTotal(Double receiptTotal) {
        this.receiptTotal = receiptTotal;
    }

    public ReceiptSettleEnumType getType() { return type; }

    public void setType(ReceiptSettleEnumType type) { this.type = type; }

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
}

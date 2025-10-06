package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.shared.ReceiptSettleEnumType;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;

@Entity
@Table(name = "receipt_settlement_view")
public class ReceiptSettlementView {

    @Id
    private Long id;
    @Column(name = "client_name")
    private String clientName;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "receipt_total")
    private Double receiptTotal;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ReceiptSettleEnumType type;
    private String created;
    private String modified;

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

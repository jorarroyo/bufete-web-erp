package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.audit.DateAudit;
import com.bufete.backend.model.shared.ReceiptSettlementType;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;

@Entity
@Table(name = "fees_receipt_settlement")
public class FeesReceiptSettlementIds extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "receipt_settlement_id", referencedColumnName = "id")
    private ReceiptSettlement feesReceiptSettlement;
    @Enumerated(EnumType.STRING)
    @Column(name = "object_type", length = 20)
    private ReceiptSettlementType objectType;
    @Column(name = "object_id")
    private Long objectId;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;

    public FeesReceiptSettlementIds(ReceiptSettlement feesReceiptSettlement, ReceiptSettlementType objectType, Long objectId,
                                 StatusName status) {
        this.feesReceiptSettlement = feesReceiptSettlement;
        this.objectType = objectType;
        this.objectId = objectId;
        this.status = status;
    }

    public FeesReceiptSettlementIds() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ReceiptSettlement getFeesReceiptSettlement() {
        return feesReceiptSettlement;
    }

    public void setFeesReceiptSettlement(ReceiptSettlement feesReceiptSettlement) {
        this.feesReceiptSettlement = feesReceiptSettlement;
    }

    public ReceiptSettlementType getObjectType() {
        return objectType;
    }

    public void setObjectType(ReceiptSettlementType objectType) {
        this.objectType = objectType;
    }

    public Long getObjectId() {
        return objectId;
    }

    public void setObjectId(Long objectId) {
        this.objectId = objectId;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }
}

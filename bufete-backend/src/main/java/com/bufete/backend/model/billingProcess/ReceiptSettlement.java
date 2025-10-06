package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.recordFiles.Client;
import com.bufete.backend.model.shared.ReceiptSettleEnumType;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "receipt_settlement")
public class ReceiptSettlement  extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "receipt_total")
    private Double receiptTotal;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ReceiptSettleEnumType type;
    @OneToMany(mappedBy = "feesReceiptSettlement")
    private List<FeesReceiptSettlementIds> feesReceiptSettlementList;
    @OneToMany(mappedBy = "receiptSettlement")
    private List<ReceiptSettlementDetail> receiptSettlementDetailList;

    public ReceiptSettlement(Client client, StatusName status, Double receiptTotal, ReceiptSettleEnumType type) {
        this.client = client;
        this.status = status;
        this.receiptTotal = receiptTotal;
        this.type = type;
    }

    public ReceiptSettlement() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
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

    public List<ReceiptSettlementDetail> getReceiptSettlementDetailList() { return receiptSettlementDetailList; }

    public List<FeesReceiptSettlementIds> getFeesReceiptSettlementList() {
        return feesReceiptSettlementList;
    }

    public void setFeesReceiptSettlementList(List<FeesReceiptSettlementIds> feesReceiptSettlementList) { this.feesReceiptSettlementList = feesReceiptSettlementList; }

    public void setReceiptSettlementDetailList(List<ReceiptSettlementDetail> receiptSettlementDetailList) { this.receiptSettlementDetailList = receiptSettlementDetailList; }
}

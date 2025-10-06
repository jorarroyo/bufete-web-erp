package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.shared.ReceiptSettleEnumType;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;

@Entity
@Table(name = "receipt_details")
public class ReceiptDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "receipt_id", referencedColumnName = "id")
    private Receipt receipt;
    private String description;
    @Column(name = "line_amount")
    private Double lineAmount;
    @Column(name = "line_discount")
    private Double lineDiscount;
    @Column(name = "line_total")
    private Double lineTotal;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "use_isr")
    private Boolean useISR;
    @Column(name = "use_iva")
    private Boolean useIVA;


    public ReceiptDetail(Receipt receipt, String description, Double lineAmount, Double lineDiscount, Double lineTotal,
                         StatusName status, Boolean useISR, Boolean useIVA) {
        this.receipt = receipt;
        this.description = description;
        this.lineAmount = lineAmount;
        this.lineDiscount = lineDiscount;
        this.lineTotal = lineTotal;
        this.status = status;
        this.useISR = useISR;
        this.useIVA = useIVA;
    }

    public ReceiptDetail() {
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Receipt getReceipt() { return receipt; }

    public void setReceipt(Receipt receipt) { this.receipt = receipt; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public Double getLineAmount() { return lineAmount; }

    public void setLineAmount(Double lineAmount) { this.lineAmount = lineAmount; }

    public Double getLineDiscount() { return lineDiscount; }

    public void setLineDiscount(Double lineDiscount) { this.lineDiscount = lineDiscount; }

    public Double getLineTotal() { return lineTotal; }

    public void setLineTotal(Double lineTotal) { this.lineTotal = lineTotal; }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }

    public Boolean getUseISR() { return useISR; }

    public void setUseISR(Boolean useISR) { this.useISR = useISR; }

    public Boolean getUseIVA() { return useIVA; }

    public void setUseIVA(Boolean useIVA) { this.useIVA = useIVA; }
}

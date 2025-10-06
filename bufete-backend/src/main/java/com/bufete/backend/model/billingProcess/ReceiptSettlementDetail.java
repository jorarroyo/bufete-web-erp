package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.shared.ReceiptSettlementType;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;

@Entity
@Table(name = "receipt_settlement_detail")
public class ReceiptSettlementDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "receipt_settlement_id", referencedColumnName = "id")
    private ReceiptSettlement receiptSettlement;
    @Enumerated(EnumType.STRING)
    @Column(name = "object_type", length = 20)
    private ReceiptSettlementType objectType;
    @Column(name = "comment")
    private String comment;
    @Column(name = "employee_id")
    private Long employeeId;
    @Column(name = "activity_time")
    private Double activityTime;
    @Column(name = "cost_per_hour")
    private Double costPerHour;
    @Column(name = "exchange_value")
    private Double exchangeValue;
    @Column(name = "cost_detail")
    private Double costDetail;
    private Double discount;
    @Column(name = "discount_type")
    private Boolean discountType;
    @Column(name = "use_isr")
    private Boolean useISR;
    @Column(name = "use_iva")
    private Boolean useIVA;
    @Column(name = "use_billing")
    private Boolean useBilling;
    private Double total;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "advance_balance")
    private Long advanceBalance;

    public ReceiptSettlementDetail(ReceiptSettlement receiptSettlement, ReceiptSettlementType objectType,
                                   String comment, Long employeeId, Double activityTime, Double costPerHour,
                                   Double exchangeValue, Double costDetail, Double discount, Boolean discountType,
                                   Boolean useISR, Boolean useIVA, Boolean useBilling, Double total, StatusName status,
                                   Long advanceBalance) {
        this.receiptSettlement = receiptSettlement;
        this.objectType = objectType;
        this.comment = comment;
        this.employeeId = employeeId;
        this.activityTime = activityTime;
        this.costPerHour = costPerHour;
        this.exchangeValue = exchangeValue;
        this.costDetail = costDetail;
        this.discount = discount;
        this.discountType = discountType;
        this.useISR = useISR;
        this.useIVA = useIVA;
        this.useBilling = useBilling;
        this.total = total;
        this.status = status;
        this.advanceBalance = advanceBalance;
    }

    public ReceiptSettlementDetail() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ReceiptSettlement getReceiptSettlement() {
        return receiptSettlement;
    }

    public void setReceiptSettlement(ReceiptSettlement receiptSettlement) {
        this.receiptSettlement = receiptSettlement;
    }

    public ReceiptSettlementType getObjectType() {
        return objectType;
    }

    public void setObjectType(ReceiptSettlementType objectType) {
        this.objectType = objectType;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Double getActivityTime() {
        return activityTime;
    }

    public void setActivityTime(Double activityTime) {
        this.activityTime = activityTime;
    }

    public Double getCostPerHour() {
        return costPerHour;
    }

    public void setCostPerHour(Double costPerHour) {
        this.costPerHour = costPerHour;
    }

    public Double getExchangeValue() {
        return exchangeValue;
    }

    public void setExchangeValue(Double exchangeValue) {
        this.exchangeValue = exchangeValue;
    }

    public Double getCostDetail() {
        return costDetail;
    }

    public void setCostDetail(Double costDetail) {
        this.costDetail = costDetail;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public Boolean getDiscountType() {
        return discountType;
    }

    public void setDiscountType(Boolean discountType) {
        this.discountType = discountType;
    }

    public Boolean getUseISR() {
        return useISR;
    }

    public void setUseISR(Boolean useISR) {
        this.useISR = useISR;
    }

    public Boolean getUseIVA() { return useIVA; }

    public void setUseIVA(Boolean useIVA) { this.useIVA = useIVA; }

    public Boolean getUseBilling() { return useBilling; }

    public void setUseBilling(Boolean useBilling) { this.useBilling = useBilling; }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Long getAdvanceBalance() {
        return advanceBalance;
    }

    public void setAdvanceBalance(Long advanceBalance) {
        this.advanceBalance = advanceBalance;
    }
}

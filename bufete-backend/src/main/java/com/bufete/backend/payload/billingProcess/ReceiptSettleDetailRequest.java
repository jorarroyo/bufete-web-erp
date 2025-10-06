package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.ReceiptSettlementType;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ReceiptSettleDetailRequest implements Serializable {

    private Long id;
    @JsonProperty("object_type")
    private ReceiptSettlementType objectType;
    @JsonProperty("comment")
    private String comment;
    @JsonProperty("employee_id")
    private Long employeeId;
    @JsonProperty("activity_time")
    private Double activityTime;
    @JsonProperty("cost_per_hour")
    private Double costPerHour;
    @JsonProperty("exchange_value")
    private Double exchangeValue;
    @JsonProperty("cost_detail")
    private Double costDetail;
    private Double discount;
    @JsonProperty("discount_type")
    private Boolean discountType;
    @JsonProperty("use_isr")
    private Boolean useISR;
    @JsonProperty("use_iva")
    private Boolean useIVA;
    @JsonProperty("use_billing")
    private Boolean useBilling;
    private Double total;
    private StatusName status;
    @JsonProperty("advance_balance")
    private Long advanceBalance;

    public ReceiptSettleDetailRequest(Long id, ReceiptSettlementType objectType, String comment, Long employeeId,
                                      Double activityTime, Double costPerHour, Double exchangeValue, Double costDetail,
                                      Double discount, Boolean discountType, Boolean useISR, Boolean useIVA, Boolean useBilling,
                                      Double total, StatusName status, Long advanceBalance) {
        this.id = id;
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

    public ReceiptSettleDetailRequest() {
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public ReceiptSettlementType getObjectType() { return objectType; }

    public void setObjectType(ReceiptSettlementType objectType) { this.objectType = objectType; }

    public String getComment() { return comment; }

    public void setComment(String comment) { this.comment = comment; }

    public Long getEmployeeId() { return employeeId; }

    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public Double getActivityTime() { return activityTime; }

    public void setActivityTime(Double activityTime) { this.activityTime = activityTime; }

    public Double getCostPerHour() { return costPerHour; }

    public void setCostPerHour(Double costPerHour) { this.costPerHour = costPerHour; }

    public Double getExchangeValue() { return exchangeValue; }

    public void setExchangeValue(Double exchangeValue) { this.exchangeValue = exchangeValue; }

    public Double getCostDetail() { return costDetail; }

    public void setCostDetail(Double costDetail) { this.costDetail = costDetail; }

    public Double getDiscount() { return discount; }

    public void setDiscount(Double discount) { this.discount = discount; }

    public Boolean getDiscountType() { return discountType; }

    public void setDiscountType(Boolean discountType) { this.discountType = discountType; }

    public Boolean getUseISR() { return useISR; }

    public void setUseISR(Boolean useISR) { this.useISR = useISR; }

    public Boolean getUseIVA() { return useIVA; }

    public void setUseIVA(Boolean useIVA) { this.useIVA = useIVA; }

    public Boolean getUseBilling() { return useBilling; }

    public void setUseBilling(Boolean useBilling) { this.useBilling = useBilling; }

    public Double getTotal() { return total; }

    public void setTotal(Double total) { this.total = total; }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }

    public Long getAdvanceBalance() {
        return advanceBalance;
    }

    public void setAdvanceBalance(Long advanceBalance) {
        this.advanceBalance = advanceBalance;
    }
}

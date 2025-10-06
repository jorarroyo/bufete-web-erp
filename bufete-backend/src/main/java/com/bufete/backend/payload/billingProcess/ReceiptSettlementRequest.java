package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.ReceiptSettleEnumType;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public class ReceiptSettlementRequest implements Serializable {

    private Long id;
    @JsonProperty("client_id")
    private Long clientId;
    @JsonProperty("client_name")
    private String clientName;
    private StatusName status;
    @JsonProperty("receipt_total")
    private Double receiptTotal;
    private ReceiptSettleEnumType type;
    @JsonProperty("attorney_fees_list")
    private Long[] attorneyFeesRequestList;
    @JsonProperty("activity_fees_list")
    private Long[] activityFeesRequestList;
    @JsonProperty("stamps_fees_list")
    private Long[] stampsFeesRequestList;
    @JsonProperty("expenses_fees_list")
    private Long[] expensesFeesRequestList;
    @JsonProperty("receipt_settlement_detail")
    private List<ReceiptSettleDetailRequest> receiptSettleDetailRequestList;

    public ReceiptSettlementRequest(Long id, Long clientId, StatusName status, Double receiptTotal, ReceiptSettleEnumType type,
                                    Long[] attorneyFeesRequestList, Long[] activityFeesRequestList,
                                    Long[] stampsFeesRequestList, Long[] expensesFeesRequestList,
                                    List<ReceiptSettleDetailRequest> receiptSettleDetailRequestList, String clientName) {
        this.id = id;
        this.clientId = clientId;
        this.status = status;
        this.receiptTotal = receiptTotal;
        this.type = type;
        this.attorneyFeesRequestList = attorneyFeesRequestList;
        this.activityFeesRequestList = activityFeesRequestList;
        this.stampsFeesRequestList = stampsFeesRequestList;
        this.expensesFeesRequestList = expensesFeesRequestList;
        this.receiptSettleDetailRequestList = receiptSettleDetailRequestList;
        this.clientName = clientName;
    }

    public ReceiptSettlementRequest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
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

    public Long[] getAttorneyFeesRequestList() { return attorneyFeesRequestList; }

    public void setAttorneyFeesRequestList(Long[] attorneyFeesRequestList) { this.attorneyFeesRequestList = attorneyFeesRequestList; }

    public Long[] getActivityFeesRequestList() {
        return activityFeesRequestList;
    }

    public void setActivityFeesRequestList(Long[] activityFeesRequestList) { this.activityFeesRequestList = activityFeesRequestList; }

    public Long[] getStampsFeesRequestList() {
        return stampsFeesRequestList;
    }

    public void setStampsFeesRequestList(Long[] stampsFeesRequestList) { this.stampsFeesRequestList = stampsFeesRequestList; }

    public Long[] getExpensesFeesRequestList() {
        return expensesFeesRequestList;
    }

    public void setExpensesFeesRequestList(Long[] expensesFeesRequestList) { this.expensesFeesRequestList = expensesFeesRequestList; }

    public List<ReceiptSettleDetailRequest> getReceiptSettleDetailRequestList() { return receiptSettleDetailRequestList; }

    public void setReceiptSettleDetailRequestList(List<ReceiptSettleDetailRequest> receiptSettleDetailRequestList) { this.receiptSettleDetailRequestList = receiptSettleDetailRequestList; }

    public String getClientName() { return clientName; }

    public void setClientName(String clientName) { this.clientName = clientName; }
}

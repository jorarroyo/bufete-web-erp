package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.ReceiptSettleEnumType;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ReceiptDetailsResponse implements Serializable {
    private Long id;
    private String description;
    @JsonProperty("line_amount")
    private Double lineAmount;
    @JsonProperty("line_discount")
    private Double lineDiscount;
    @JsonProperty("line_total")
    private Double lineTotal;
    private StatusName status;
    @JsonProperty("use_isr")
    private Boolean useISR;
    @JsonProperty("use_iva")
    private Boolean useIVA;

    public ReceiptDetailsResponse(Long id, String description, Double lineAmount, Double lineDiscount, Double lineTotal,
                                  StatusName status, Boolean useISR, Boolean useIVA) {
        this.id = id;
        this.description = description;
        this.lineAmount = lineAmount;
        this.lineDiscount = lineDiscount;
        this.lineTotal = lineTotal;
        this.status = status;
        this.useISR = useISR;
        this.useIVA = useIVA;
    }

    public ReceiptDetailsResponse() {
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

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

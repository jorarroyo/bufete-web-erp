package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.billingProcess.ReceiptSettlementReportType;
import com.bufete.backend.model.shared.ReceiptSettlementType;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ReceiptSettleReportDetailRequest implements Serializable {

    private Long id;
    private ReceiptSettlementType type;
    private String description;
    @JsonProperty("detail_total")
    private Double detailTotal;

    public ReceiptSettleReportDetailRequest(Long id, ReceiptSettlementType type, String description,
                                            Double detailTotal) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.detailTotal = detailTotal;
    }

    public ReceiptSettleReportDetailRequest() {
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public ReceiptSettlementType getType() { return type; }

    public void setType(ReceiptSettlementType type) { this.type = type; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public Double getDetailTotal() { return detailTotal; }

    public void setDetailTotal(Double detailTotal) { this.detailTotal = detailTotal; }
}

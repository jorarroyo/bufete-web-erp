package com.bufete.backend.payload.billingProcess;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class FELReceiptDetailResponse implements Serializable {
    @JsonProperty("service_type")
    private String serviceType;
    private Double quantity;
    private String description;
    @JsonProperty("line_unit_price")
    private Double lineUnitPrice;
    @JsonProperty("line_discount")
    private Double lineDiscount;
    @JsonProperty("line_total")
    private Double lineTotal;
    @JsonProperty("line_tax")
    private Double lineTax;

    public FELReceiptDetailResponse(String serviceType, Double quantity, String description, Double lineUnitPrice,
                                    Double lineDiscount, Double lineTotal, Double lineTax) {
        this.serviceType = serviceType;
        this.quantity = quantity;
        this.description = description;
        this.lineUnitPrice = lineUnitPrice;
        this.lineDiscount = lineDiscount;
        this.lineTotal = lineTotal;
        this.lineTax = lineTax;
    }

    public FELReceiptDetailResponse() {
    }

    public String getServiceType() { return serviceType; }

    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public Double getQuantity() { return quantity; }

    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public Double getLineUnitPrice() { return lineUnitPrice; }

    public void setLineUnitPrice(Double lineUnitPrice) { this.lineUnitPrice = lineUnitPrice; }

    public Double getLineDiscount() { return lineDiscount; }

    public void setLineDiscount(Double lineDiscount) { this.lineDiscount = lineDiscount; }

    public Double getLineTotal() { return lineTotal; }

    public void setLineTotal(Double lineTotal) { this.lineTotal = lineTotal; }

    public Double getLineTax() { return lineTax; }

    public void setLineTax(Double lineTax) { this.lineTax = lineTax; }
}

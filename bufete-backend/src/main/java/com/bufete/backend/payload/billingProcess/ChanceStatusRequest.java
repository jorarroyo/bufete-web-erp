package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ChanceStatusRequest implements Serializable {

    private Long id;
    private String comment;
    private StatusName status;
    @JsonProperty("serial_number")
    private String serialNumber;
    @JsonProperty("invoice_series_id")
    private Long invoiceSeriesId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public String getSerialNumber() { return serialNumber; }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Long getInvoiceSeriesId() { return invoiceSeriesId; }

    public void setInvoiceSeriesId(Long invoiceSeriesId) { this.invoiceSeriesId = invoiceSeriesId; }
}

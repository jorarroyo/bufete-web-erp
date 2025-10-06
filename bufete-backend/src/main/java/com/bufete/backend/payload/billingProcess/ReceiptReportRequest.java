package com.bufete.backend.payload.billingProcess;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;

public class ReceiptReportRequest implements Serializable {

    @JsonProperty("invoice_id")
    private Long invoiceId;
    @JsonProperty("start_date")
    private Date startDate;
    @JsonProperty("end_date")
    private Date endDate;

    public Long getInvoiceId() { return invoiceId; }

    public void setInvoiceId(Long invoiceId) { this.invoiceId = invoiceId; }

    public Date getStartDate() { return startDate; }

    public void setStartDate(Date startDate) { this.startDate = startDate; }

    public Date getEndDate() { return endDate; }

    public void setEndDate(Date endDate) { this.endDate = endDate; }
}

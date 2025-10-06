package com.bufete.backend.payload.billingProcess;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

public class ReceiptSettleReportRequest implements Serializable {

    private Long id;
    @JsonProperty("receipt_settlement_id")
    private Long receiptSettlementId;
    @JsonProperty("client_name")
    private String clientName;
    @JsonProperty("document_date")
    private String documentDate;
    @JsonProperty("file_num")
    private String fileNum;
    @JsonProperty("header_text")
    private String headerText;
    @JsonProperty("footer_text")
    private String footerText;
    private Double total;
    private List<ReceiptSettleReportDetailRequest> details;

    public ReceiptSettleReportRequest(Long id, Long receiptSettlementId, String clientName, String documentDate,
                                      String fileNum, String headerText, String footerText, Double total,
                                      List<ReceiptSettleReportDetailRequest> details) {
        this.id = id;
        this.receiptSettlementId = receiptSettlementId;
        this.clientName = clientName;
        this.documentDate = documentDate;
        this.fileNum = fileNum;
        this.headerText = headerText;
        this.footerText = footerText;
        this.total = total;
        this.details = details;
    }

    public ReceiptSettleReportRequest() {
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Long getReceiptSettlementId() { return receiptSettlementId; }

    public void setReceiptSettlementId(Long receiptSettlementId) { this.receiptSettlementId = receiptSettlementId; }

    public String getClientName() { return clientName; }

    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getDocumentDate() { return documentDate; }

    public void setDocumentDate(String documentDate) { this.documentDate = documentDate; }

    public String getFileNum() { return fileNum; }

    public void setFileNum(String fileNum) { this.fileNum = fileNum; }

    public String getHeaderText() { return headerText; }

    public void setHeaderText(String headerText) { this.headerText = headerText; }

    public String getFooterText() { return footerText; }

    public void setFooterText(String footerText) { this.footerText = footerText; }

    public Double getTotal() { return total; }

    public void setTotal(Double total) { this.total = total; }

    public List<ReceiptSettleReportDetailRequest> getDetails() { return details; }

    public void setDetails(List<ReceiptSettleReportDetailRequest> details) { this.details = details; }
}

package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.audit.UserDateAudit;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "receipt_settlement_report")
public class ReceiptSettlementReport extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "receipt_settlement_id")
    private Long receiptSettlementId;
    @Column(name = "client_name")
    private String clientName;
    @Column(name = "document_date")
    private String documentDate;
    @Column(name = "file_num")
    private String fileNum;
    @Size(max = 1000)
    @Column(name = "header_text")
    private String headerText;
    @Column(name = "footer_text")
    private String footerText;
    private Double total;

    public ReceiptSettlementReport(Long receiptSettlementId, String clientName, String documentDate, String fileNum,
                                   String headerText, String footerText, Double total) {
        this.receiptSettlementId = receiptSettlementId;
        this.clientName = clientName;
        this.documentDate = documentDate;
        this.fileNum = fileNum;
        this.headerText = headerText;
        this.footerText = footerText;
        this.total = total;
    }

    public ReceiptSettlementReport() {
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
}

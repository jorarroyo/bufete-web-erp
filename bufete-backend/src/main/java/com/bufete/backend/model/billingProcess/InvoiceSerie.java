package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "invoice_series")
public class InvoiceSerie extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "series_name")
    private String serieName;
    @Column(name = "series_value")
    private String serieValue;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;

    @OneToMany(mappedBy = "invoiceSerie")
    private List<Receipt> receiptList;

    public InvoiceSerie(String serieName, String serieValue, StatusName status) {
        this.serieName = serieName;
        this.serieValue = serieValue;
        this.status = status;
    }

    public InvoiceSerie() {
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getSerieName() { return serieName; }

    public void setSerieName(String serieName) { this.serieName = serieName; }

    public String getSerieValue() { return serieValue; }

    public void setSerieValue(String serieValue) { this.serieValue = serieValue; }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }

    public List<Receipt> getReceiptList() { return receiptList; }

    public void setReceiptList(List<Receipt> receiptList) { this.receiptList = receiptList; }
}

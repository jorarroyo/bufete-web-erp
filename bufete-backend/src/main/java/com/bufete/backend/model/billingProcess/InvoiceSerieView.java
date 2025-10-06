package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;

@Entity
@Table(name = "invoice_series_view")
public class InvoiceSerieView {
    @Id
    private Long id;
    @Column(name = "series_name")
    private String serieName;
    @Column(name = "series_value")
    private String serieValue;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    private String created;
    private String modified;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getSerieName() { return serieName; }

    public void setSerieName(String serieName) { this.serieName = serieName; }

    public String getSerieValue() { return serieValue; }

    public void setSerieValue(String serieValue) { this.serieValue = serieValue; }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }

    public String getCreated() { return created; }

    public void setCreated(String created) { this.created = created; }

    public String getModified() { return modified; }

    public void setModified(String modified) { this.modified = modified; }
}

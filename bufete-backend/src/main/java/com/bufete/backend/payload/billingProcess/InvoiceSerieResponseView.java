package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class InvoiceSerieResponseView implements Serializable {
    private Long id;
    @JsonProperty("series_name")
    private String serieName;
    @JsonProperty("series_value")
    private String serieValue;
    private StatusName status;
    private String created;
    private String modified;

    public InvoiceSerieResponseView(Long id, String serieName, String serieValue, StatusName status, String created, String modified) {
        this.id = id;
        this.serieName = serieName;
        this.serieValue = serieValue;
        this.status = status;
        this.created = created;
        this.modified = modified;
    }

    public InvoiceSerieResponseView() {
    }

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

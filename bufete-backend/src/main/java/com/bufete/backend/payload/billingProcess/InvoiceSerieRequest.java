package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class InvoiceSerieRequest implements Serializable {
    private Long id;
    @JsonProperty("series_name")
    private String serieName;
    @JsonProperty("series_value")
    private String serieValue;
    private StatusName status;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getSerieName() { return serieName; }

    public void setSerieName(String serieName) { this.serieName = serieName; }

    public String getSerieValue() { return serieValue; }

    public void setSerieValue(String serieValue) { this.serieValue = serieValue; }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }
}

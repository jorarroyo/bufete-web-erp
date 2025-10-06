package com.bufete.backend.payload.billingProcess;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class InvoiceSerieResponse implements Serializable {
    private Long id;
    @JsonProperty("series_name")
    private String serieName;
    @JsonProperty("series_value")
    private String serieValue;

    public InvoiceSerieResponse(Long id, String serieName, String serieValue) {
        this.id = id;
        this.serieName = serieName;
        this.serieValue = serieValue;
    }

    public InvoiceSerieResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSerieName() {
        return serieName;
    }

    public void setSerieName(String serieName) {
        this.serieName = serieName;
    }

    public String getSerieValue() {
        return serieValue;
    }

    public void setSerieValue(String serieValue) {
        this.serieValue = serieValue;
    }
}

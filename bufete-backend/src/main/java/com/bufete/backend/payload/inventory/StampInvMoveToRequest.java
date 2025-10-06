package com.bufete.backend.payload.inventory;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class StampInvMoveToRequest implements Serializable {
    private Long id;
    @JsonProperty("record_id")
    private Long recordId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRecordId() {
        return recordId;
    }

    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }
}

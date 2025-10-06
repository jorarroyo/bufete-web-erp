package com.bufete.backend.payload.recordFiles;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class RecordFileMergeRequest implements Serializable {
    @JsonProperty("id")
    private Long recordId;
    @JsonProperty("merge_id")
    private Long mergeRecordId;

    public RecordFileMergeRequest(Long recordId, Long mergeRecordId) {
        this.recordId = recordId;
        this.mergeRecordId = mergeRecordId;
    }

    public RecordFileMergeRequest() {
    }

    public Long getRecordId() {
        return recordId;
    }

    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }

    public Long getMergeRecordId() {
        return mergeRecordId;
    }

    public void setMergeRecordId(Long mergeRecordId) {
        this.mergeRecordId = mergeRecordId;
    }
}

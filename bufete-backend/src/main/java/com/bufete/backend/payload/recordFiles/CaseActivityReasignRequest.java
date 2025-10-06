package com.bufete.backend.payload.recordFiles;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class CaseActivityReasignRequest implements Serializable {
    private Long id;
    @JsonProperty("file_record_id")
    private Long recordFileId;

    public CaseActivityReasignRequest(Long id, Long recordFileId) {
        this.id = id;
        this.recordFileId = recordFileId;
    }

    public CaseActivityReasignRequest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRecordFileId() {
        return recordFileId;
    }

    public void setRecordFileId(Long recordFileId) {
        this.recordFileId = recordFileId;
    }
}

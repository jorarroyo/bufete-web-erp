package com.bufete.backend.payload.recordFiles;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class RecordFileSearchResponse implements Serializable {

    private Long id;
    @JsonProperty("file_num")
    private String fileNum;
    @JsonProperty("client_name")
    private String clientName;

    public RecordFileSearchResponse(Long id, String fileNum, String clientName) {
        this.id = id;
        this.fileNum = fileNum;
        this.clientName = clientName;
    }

    public RecordFileSearchResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileNum() {
        return fileNum;
    }

    public void setFileNum(String fileNum) {
        this.fileNum = fileNum;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }
}

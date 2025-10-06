package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import java.io.Serializable;

public class ExpensesDetailRequest implements Serializable {
    private Long id;
    @JsonProperty("file_record_id")
    private Long fileRecordId;
    private StatusName status;
    @JsonProperty("expense_value")
    private Double expenseValue;
    @JsonProperty("record_client_name")
    private String recordClientName;
    @JsonProperty("record_file_name")
    private String recordFileName;

    public ExpensesDetailRequest(Long id, Long fileRecordId, StatusName status, Double expenseValue, String recordClientName, String recordFileName) {
        this.id = id;
        this.fileRecordId = fileRecordId;
        this.status = status;
        this.expenseValue = expenseValue;
        this.recordClientName = recordClientName;
        this.recordFileName = recordFileName;
    }

    public ExpensesDetailRequest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRecordFileId() {
        return fileRecordId;
    }

    public void setRecordFileId(Long recordFileId) {
        this.fileRecordId = fileRecordId;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Double getExpenseValue() {
        return expenseValue;
    }

    public void setExpenseValue(Double expenseValue) {
        this.expenseValue = expenseValue;
    }

    public String getRecordClientName() {
        return recordClientName;
    }

    public void setRecordClientName(String recordClientName) {
        this.recordClientName = recordClientName;
    }

    public String getRecordFileName() {
        return recordFileName;
    }

    public void setRecordFileName(String recordFileName) {
        this.recordFileName = recordFileName;
    }
}

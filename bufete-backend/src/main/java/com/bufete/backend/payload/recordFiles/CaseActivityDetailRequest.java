package com.bufete.backend.payload.recordFiles;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class CaseActivityDetailRequest implements Serializable {
    private Long id;
    @JsonProperty("employee_id")
    private Long employeeId;
    @JsonProperty("employee_name")
    private String employeeName;
    private StatusName status;

    public CaseActivityDetailRequest(Long id, Long employeeId, String employeeName, StatusName status) {
        this.id = id;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.status = status;
    }

    public CaseActivityDetailRequest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
}

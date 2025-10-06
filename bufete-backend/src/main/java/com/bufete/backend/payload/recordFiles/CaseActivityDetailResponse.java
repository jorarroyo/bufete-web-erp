package com.bufete.backend.payload.recordFiles;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class CaseActivityDetailResponse implements Serializable {
    private Long id;
    @JsonProperty("employee_id")
    private Long employeeId;
    @JsonProperty("employee_name")
    private String employeeName;

    public CaseActivityDetailResponse(Long id, Long employeeId, String employeeName) {
        this.id = id;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
    }

    public CaseActivityDetailResponse() {
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

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
}

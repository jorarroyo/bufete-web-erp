package com.bufete.backend.payload.billingProcess;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class FeesReceiptSettleResponse implements Serializable {

    private Long id;
    @JsonProperty("file_num")
    private String fileNum;
    private String description;
    @JsonProperty("employee_name")
    private String employeeName;
    @JsonProperty("activity_name")
    private String activityName;
    @JsonProperty("activity_time")
    private Double activityTime;

    public FeesReceiptSettleResponse(Long id, String fileNum, String description, String employeeName,
                                     String activityName, Double activityTime) {
        this.id = id;
        this.fileNum = fileNum;
        this.description = description;
        this.employeeName = employeeName;
        this.activityName = activityName;
        this.activityTime = activityTime;
    }

    public FeesReceiptSettleResponse() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public Double getActivityTime() {
        return activityTime;
    }

    public void setActivityTime(Double activityTime) {
        this.activityTime = activityTime;
    }
}

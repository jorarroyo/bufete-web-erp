package com.bufete.backend.payload.billingProcess;

import java.io.Serializable;

public class AttorneyFeesTotal implements Serializable {

    private Long employeeId;
    private Double activityTime;

    public AttorneyFeesTotal(Long employeeId, Double activityTime) {
        this.employeeId = employeeId;
        this.activityTime = activityTime;
    }

    public AttorneyFeesTotal() {
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Double getActivityTime() {
        return activityTime;
    }

    public void setActivityTime(Double activityTime) {
        this.activityTime = activityTime;
    }
}

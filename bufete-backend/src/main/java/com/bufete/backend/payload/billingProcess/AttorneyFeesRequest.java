package com.bufete.backend.payload.billingProcess;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class AttorneyFeesRequest implements Serializable {

    private Long id;
    @JsonProperty("employee_id")
    private Long employeeId;
    @JsonProperty("work_time")
    private Double workTime;
    @JsonProperty("cost_per_hour")
    private Double costPerHour;
    @JsonProperty("exchange_rate")
    private Double exchangeRate;

    public AttorneyFeesRequest(Long id, Long employeeId, Double workTime, Double costPerHour, Double exchangeRate) {
        this.id = id;
        this.employeeId = employeeId;
        this.workTime = workTime;
        this.costPerHour = costPerHour;
        this.exchangeRate = exchangeRate;
    }

    public AttorneyFeesRequest() {
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

    public Double getWorkTime() {
        return workTime;
    }

    public void setWorkTime(Double workTime) {
        this.workTime = workTime;
    }

    public Double getCostPerHour() {
        return costPerHour;
    }

    public void setCostPerHour(Double costPerHour) {
        this.costPerHour = costPerHour;
    }

    public Double getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(Double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }
}

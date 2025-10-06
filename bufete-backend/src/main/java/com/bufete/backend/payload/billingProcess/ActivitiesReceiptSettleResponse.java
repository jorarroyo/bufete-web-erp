package com.bufete.backend.payload.billingProcess;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ActivitiesReceiptSettleResponse implements Serializable {

    private Long id;
    @JsonProperty("file_num")
    private String fileNum;
    private String description;
    @JsonProperty("employee_name")
    private String employeeName;
    @JsonProperty("activity_name")
    private String activityName;
    @JsonProperty("institution_name")
    private String institutionName;
    private String currency;
    @JsonProperty("exchange_value")
    private Double exchangeValue;
    private Double total;

    public ActivitiesReceiptSettleResponse(Long id, String fileNum, String description, String employeeName,
                                           String activityName, String institutionName, String currency,
                                           Double exchangeValue, Double total) {
        this.id = id;
        this.fileNum = fileNum;
        this.description = description;
        this.employeeName = employeeName;
        this.activityName = activityName;
        this.institutionName = institutionName;
        this.currency = currency;
        this.exchangeValue = exchangeValue;
        this.total = total;
    }

    public ActivitiesReceiptSettleResponse() {
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

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Double getExchangeValue() {
        return exchangeValue;
    }

    public void setExchangeValue(Double exchangeValue) {
        this.exchangeValue = exchangeValue;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}

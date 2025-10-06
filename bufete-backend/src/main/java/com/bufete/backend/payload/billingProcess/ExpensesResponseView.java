package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ExpensesResponseView implements Serializable {
    private Long id;
    @JsonProperty("expenses_date")
    private String expensesDate;
    @JsonProperty("expenses_type")
    private Integer expensesType;
    @JsonProperty("expenses_num")
    private String expensesNum;
    @JsonProperty("provider_name")
    private String providerName;
    @JsonProperty("concept_name")
    private String conceptName;
    private StatusName status;
    @JsonProperty("exchange_rate")
    private Double exchangeRate;
    @JsonProperty("expenses_currency")
    private Long expensesCurrency;
    @JsonProperty("expenses_total")
    private Double expensesTotal;
    private String created;
    private String modified;

    public ExpensesResponseView(Long id, String expensesDate, Integer expensesType, String expensesNum, String providerName,
                                String conceptName, StatusName status, Double exchangeRate, Long expensesCurrency, Double expensesTotal,
                                String created, String modified) {
        this.id = id;
        this.expensesDate = expensesDate;
        this.expensesType = expensesType;
        this.expensesNum = expensesNum;
        this.providerName = providerName;
        this.conceptName = conceptName;
        this.status = status;
        this.exchangeRate = exchangeRate;
        this.expensesCurrency = expensesCurrency;
        this.expensesTotal = expensesTotal;
        this.created = created;
        this.modified = modified;
    }

    public ExpensesResponseView() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExpensesDate() {
        return expensesDate;
    }

    public void setExpensesDate(String expensesDate) {
        this.expensesDate = expensesDate;
    }

    public Integer getExpensesType() {
        return expensesType;
    }

    public void setExpensesType(Integer expensesType) {
        this.expensesType = expensesType;
    }

    public String getExpensesNum() {
        return expensesNum;
    }

    public void setExpensesNum(String expensesNum) {
        this.expensesNum = expensesNum;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String getConceptName() {
        return conceptName;
    }

    public void setConceptName(String conceptName) {
        this.conceptName = conceptName;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Double getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(Double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public Long getExpensesCurrency() {
        return expensesCurrency;
    }

    public void setExpensesCurrency(Long expensesCurrency) {
        this.expensesCurrency = expensesCurrency;
    }

    public Double getExpensesTotal() {
        return expensesTotal;
    }

    public void setExpensesTotal(Double expensesTotal) {
        this.expensesTotal = expensesTotal;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getModified() {
        return modified;
    }

    public void setModified(String modified) {
        this.modified = modified;
    }
}

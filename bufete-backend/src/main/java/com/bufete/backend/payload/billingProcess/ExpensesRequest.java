package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class ExpensesRequest implements Serializable {

    private Long id;
    @JsonProperty("expenses_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    private Date expensesDate;
    @JsonProperty("expenses_type")
    private Integer expensesType;
    @JsonProperty("expenses_num")
    private String expensesNum;
    @JsonProperty("provider_id")
    private Long providerId;
    @JsonProperty("provider_name")
    private String providerName;
    @JsonProperty("concept_id")
    private Long conceptId;
    @JsonProperty("concept_name")
    private String conceptName;
    private StatusName status;
    @JsonProperty("exchange_rate")
    private Double exchangeRate;
    @JsonProperty("expenses_currency")
    private Long expensesCurrency;
    @JsonProperty("expenses_total")
    private Double expensesTotal;
    private List<ExpensesDetailRequest> details;

    public ExpensesRequest(Long id, Date expensesDate, Integer expensesType, String expensesNum, Long providerId, String providerName,
                           Long conceptId, String conceptName, StatusName status, Double exchangeRate, Long expensesCurrency,
                           Double expensesTotal, List<ExpensesDetailRequest> details) {
        this.id = id;
        this.expensesDate = expensesDate;
        this.expensesType = expensesType;
        this.expensesNum = expensesNum;
        this.providerId = providerId;
        this.providerName = providerName;
        this.conceptId = conceptId;
        this.conceptName = conceptName;
        this.status = status;
        this.exchangeRate = exchangeRate;
        this.expensesCurrency = expensesCurrency;
        this.expensesTotal = expensesTotal;
        this.details = details;
    }

    public ExpensesRequest() {
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getExpensesDate() {
        return expensesDate;
    }

    public void setExpensesDate(Date expensesDate) {
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

    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public Long getConceptId() {
        return conceptId;
    }

    public void setConceptId(Long conceptId) {
        this.conceptId = conceptId;
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

    public List<ExpensesDetailRequest> getDetails() {
        return details;
    }

    public void setDetails(List<ExpensesDetailRequest> details) {
        this.details = details;
    }
}

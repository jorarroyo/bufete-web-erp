package com.bufete.backend.payload.billingProcess;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ExpensesReceiptSettleResponse implements Serializable {

    private Long id;
    @JsonProperty("file_num")
    private String fileNum;
    @JsonProperty("expenses_num")
    private String expensesNum;
    @JsonProperty("provider_name")
    private String providerName;
    @JsonProperty("concept_name")
    private String conceptName;
    @JsonProperty("currency_name")
    private String currencyName;
    @JsonProperty("exchange_value")
    private Double exchangeValue;
    private Double total;

    public ExpensesReceiptSettleResponse(Long id, String fileNum, String expensesNum, String providerName,
                                         String conceptName, String currencyName, Double exchangeValue, Double total) {
        this.id = id;
        this.fileNum = fileNum;
        this.expensesNum = expensesNum;
        this.providerName = providerName;
        this.conceptName = conceptName;
        this.currencyName = currencyName;
        this.exchangeValue = exchangeValue;
        this.total = total;
    }

    public ExpensesReceiptSettleResponse() {
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

    public String getCurrencyName() {
        return currencyName;
    }

    public void setCurrencyName(String currencyName) {
        this.currencyName = currencyName;
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

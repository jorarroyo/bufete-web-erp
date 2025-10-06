package com.bufete.backend.payload.billingProcess;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class StampReceiptSettleResponse implements Serializable {

    private Long id;
    @JsonProperty("file_num")
    private String fileNum;
    private String description;
    private String currency;
    @JsonProperty("exchange_value")
    private Double exchangeValue;
    private Double total;

    public StampReceiptSettleResponse(Long id, String fileNum, String description, String currency,
                                      Double exchangeValue, Double total) {
        this.id = id;
        this.fileNum = fileNum;
        this.description = description;
        this.currency = currency;
        this.exchangeValue = exchangeValue;
        this.total = total;
    }

    public StampReceiptSettleResponse() {
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

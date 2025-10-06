package com.bufete.backend.payload.accountReceivable;

import java.io.Serializable;

public class AdvanceBalanceResponse implements Serializable {
    private Long id;
    private String currency;
    private Double value;
    private Long receipt;

    public AdvanceBalanceResponse(Long id, String currency, Double value, Long receipt) {
        this.id = id;
        this.currency = currency;
        this.value = value;
        this.receipt = receipt;
    }

    public AdvanceBalanceResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Long getReceipt() {
        return receipt;
    }

    public void setReceipt(Long receipt) {
        this.receipt = receipt;
    }
}

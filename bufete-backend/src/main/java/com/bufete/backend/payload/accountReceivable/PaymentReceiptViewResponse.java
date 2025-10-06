package com.bufete.backend.payload.accountReceivable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;

public class PaymentReceiptViewResponse implements Serializable {
    private Long id;
    @JsonProperty("client_name")
    private String clientName;
    private StatusName status;
    @JsonProperty("payment_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date paymentDate;
    @JsonProperty("total_payment")
    private Double totalPayment;
    @JsonProperty("currency_name")
    private String currencyName;
    private String created;
    private String modified;

    public PaymentReceiptViewResponse(Long id, String clientName, StatusName status, Date paymentDate, Double totalPayment,
                                      String currencyName, String created, String modified) {
        this.id = id;
        this.clientName = clientName;
        this.status = status;
        this.paymentDate = paymentDate;
        this.totalPayment = totalPayment;
        this.currencyName = currencyName;
        this.created = created;
        this.modified = modified;
    }

    public PaymentReceiptViewResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Double getTotalPayment() {
        return totalPayment;
    }

    public void setTotalPayment(Double totalPayment) {
        this.totalPayment = totalPayment;
    }

    public String getCurrencyName() {
        return currencyName;
    }

    public void setCurrencyName(String currencyName) {
        this.currencyName = currencyName;
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

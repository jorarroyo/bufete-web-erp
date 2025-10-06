package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.ReceiptSettleEnumType;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class ReceiptRequest implements Serializable {

    private Long id;
    @JsonProperty("serial_number")
    private String serialNumber;
    @JsonProperty("client_id")
    private Long clientId;
    @JsonProperty("receipt_address_id")
    private Long addressId;
    @JsonProperty("receipt_settlement_id")
    private Long receiptSettlementId;
    private StatusName status;
    @JsonProperty("receipt_date")
    private Date receiptDate;
    @JsonProperty("currency_id")
    private Long currencyId;
    @JsonProperty("receipt_iva")
    private Double receiptIVA;
    @JsonProperty("receipt_total")
    private Double receiptTotal;
    @JsonProperty("receipt_total_discount")
    private Double receiptTotalDiscount;
    @JsonProperty("object_type")
    private ReceiptSettleEnumType objectType;
    @JsonProperty("exchange_rate")
    private Double exchangeRate;
    @JsonProperty("is_one_time_client")
    private Boolean isOneTimeClient;
    @JsonProperty("one_time_client")
    private OneTimeClientRequest oneTimeClientRequest;
    private List<ReceiptDetailsRequest> details;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getSerialNumber() { return serialNumber; }

    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public Long getClientId() { return clientId; }

    public void setClientId(Long clientId) { this.clientId = clientId; }

    public Long getAddressId() { return addressId; }

    public void setAddressId(Long addressId) { this.addressId = addressId; }

    public Long getReceiptSettlementId() { return receiptSettlementId; }

    public void setReceiptSettlementId(Long receiptSettlementId) { this.receiptSettlementId = receiptSettlementId; }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }

    public Date getReceiptDate() { return receiptDate; }

    public void setReceiptDate(Date receiptDate) { this.receiptDate = receiptDate; }

    public Double getReceiptTotal() { return receiptTotal; }

    public void setReceiptTotal(Double receiptTotal) { this.receiptTotal = receiptTotal; }

    public Double getReceiptTotalDiscount() { return receiptTotalDiscount; }

    public void setReceiptTotalDiscount(Double receiptTotalDiscount) { this.receiptTotalDiscount = receiptTotalDiscount; }

    public ReceiptSettleEnumType getObjectType() { return objectType; }

    public void setObjectType(ReceiptSettleEnumType objectType) { this.objectType = objectType; }

    public List<ReceiptDetailsRequest> getDetails() { return details; }

    public void setDetails(List<ReceiptDetailsRequest> details) { this.details = details; }

    public Long getCurrencyId() { return currencyId; }

    public void setCurrencyId(Long currencyId) { this.currencyId = currencyId; }

    public Double getReceiptIVA() { return receiptIVA; }

    public void setReceiptIVA(Double receiptIVA) { this.receiptIVA = receiptIVA; }

    public Double getExchangeRate() { return exchangeRate; }

    public void setExchangeRate(Double exchangeRate) { this.exchangeRate = exchangeRate; }

    public Boolean getOneTimeClient() { return isOneTimeClient; }

    public void setOneTimeClient(Boolean oneTimeClient) { isOneTimeClient = oneTimeClient; }

    public OneTimeClientRequest getOneTimeClientRequest() { return oneTimeClientRequest; }

    public void setOneTimeClientRequest(OneTimeClientRequest oneTimeClientRequest) { this.oneTimeClientRequest = oneTimeClientRequest; }
}

package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.ReceiptSettleEnumType;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class ReceiptResponse implements Serializable {

    private Long id;
    @JsonProperty("serial_number")
    private String serialNumber;
    @JsonProperty("receipt_settlement_id")
    private Long receiptSettlementId;
    @JsonProperty("client_id")
    private Long clientId;
    @JsonProperty("client_name")
    private String clientName;
    @JsonProperty("receipt_address_id")
    private Long receiptAddressId;
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
    private OneTimeClientResponse oneTimeClientResponse;
    private List<ReceiptDetailsResponse> details;

    public ReceiptResponse(Long id, String serialNumber, Long receiptSettlementId, Long clientId, String clientName, Long receiptAddressId, StatusName status,
                           Date receiptDate, Double receiptTotal, Double receiptTotalDiscount, ReceiptSettleEnumType objectType,
                           Long currencyId, Double receiptIVA, Double exchangeRate,
                           Boolean isOneTimeClient, OneTimeClientResponse oneTimeClientResponse, List<ReceiptDetailsResponse> details) {
        this.id = id;
        this.serialNumber = serialNumber;
        this.receiptSettlementId = receiptSettlementId;
        this.clientId = clientId;
        this.clientName = clientName;
        this.receiptAddressId = receiptAddressId;
        this.status = status;
        this.receiptDate = receiptDate;
        this.receiptTotal = receiptTotal;
        this.receiptTotalDiscount = receiptTotalDiscount;
        this.objectType = objectType;
        this.details = details;
        this.currencyId = currencyId;
        this.receiptIVA = receiptIVA;
        this.exchangeRate = exchangeRate;
        this.isOneTimeClient = isOneTimeClient;
        this.oneTimeClientResponse = oneTimeClientResponse;
    }

    public ReceiptResponse() {
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getSerialNumber() { return serialNumber; }

    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public Long getReceiptSettlementId() { return receiptSettlementId; }

    public void setReceiptSettlementId(Long receiptSettlementId) { this.receiptSettlementId = receiptSettlementId; }

    public Long getClientId() { return clientId; }

    public void setClientId(Long clientId) { this.clientId = clientId; }

    public String getClientName() { return clientName; }

    public void setClientName(String clientName) { this.clientName = clientName; }

    public Long getReceiptAddressId() { return receiptAddressId; }

    public void setReceiptAddressId(Long receiptAddressId) { this.receiptAddressId = receiptAddressId; }

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

    public List<ReceiptDetailsResponse> getDetails() { return details; }

    public void setDetails(List<ReceiptDetailsResponse> details) { this.details = details; }

    public Long getCurrencyId() { return currencyId; }

    public void setCurrencyId(Long currencyId) { this.currencyId = currencyId; }

    public Double getReceiptIVA() { return receiptIVA; }

    public void setReceiptIVA(Double receiptIVA) { this.receiptIVA = receiptIVA; }

    public Double getExchangeRate() { return exchangeRate; }

    public void setExchangeRate(Double exchangeRate) { this.exchangeRate = exchangeRate; }

    public Boolean getOneTimeClient() { return isOneTimeClient; }

    public void setOneTimeClient(Boolean oneTimeClient) { isOneTimeClient = oneTimeClient; }

    public OneTimeClientResponse getOneTimeClientResponse() { return oneTimeClientResponse; }

    public void setOneTimeClientResponse(OneTimeClientResponse oneTimeClientResponse) { this.oneTimeClientResponse = oneTimeClientResponse; }

}

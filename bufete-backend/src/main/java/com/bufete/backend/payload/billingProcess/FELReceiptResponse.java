package com.bufete.backend.payload.billingProcess;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class FELReceiptResponse implements Serializable {
    private Long id;
    @JsonProperty("doc_type")
    private String docType;
    @JsonProperty("client_id")
    private Long clientId;
    @JsonProperty("client_name")
    private String clientName;
    @JsonProperty("client_nit")
    private String clientNit;
    @JsonProperty("client_direction")
    private String clientDirection;
    @JsonProperty("client_email")
    private String clientEMail;
    @JsonProperty("receipt_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date receiptDate;
    private Integer material;
    private String description;
    private Double quantity;
    @JsonProperty("unit_sell")
    private String unitSell;
    @JsonProperty("unit_price")
    private Double unitPrice;
    @JsonProperty("sub_total")
    private Double subTotal;
    private Double iva;
    private Double total;
    private Double discount;
    private String country;
    @JsonProperty("tax_type")
    private String taxType;
    @JsonProperty("tax_percent")
    private Double taxPercent;
    private String currency;
    @JsonProperty("pay_method")
    private String payMethod;
    @JsonProperty("currency_type")
    private Double currencyType;
    private List<FELReceiptDetailResponse> details;

    public FELReceiptResponse(Long id, String docType, Long clientId, String clientName, String clientNit,
                              String clientDirection, String clientEMail, Date receiptDate, Integer material,
                              String description, Double quantity, String unitSell, Double unitPrice, Double subTotal,
                              Double iva, Double total, Double discount, String country, String taxType, Double taxPercent,
                              String currency, String payMethod, Double currencyType, List<FELReceiptDetailResponse> details) {
        this.id = id;
        this.docType = docType;
        this.clientId = clientId;
        this.clientName = clientName;
        this.clientNit = clientNit;
        this.clientDirection = clientDirection;
        this.clientEMail = clientEMail;
        this.receiptDate = receiptDate;
        this.material = material;
        this.description = description;
        this.quantity = quantity;
        this.unitSell = unitSell;
        this.unitPrice = unitPrice;
        this.subTotal = subTotal;
        this.iva = iva;
        this.total = total;
        this.discount = discount;
        this.country = country;
        this.taxType = taxType;
        this.taxPercent = taxPercent;
        this.currency = currency;
        this.payMethod = payMethod;
        this.currencyType = currencyType;
        this.details = details;
    }

    public FELReceiptResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getClientNit() {
        return clientNit;
    }

    public void setClientNit(String clientNit) {
        this.clientNit = clientNit;
    }

    public String getClientDirection() {
        return clientDirection;
    }

    public void setClientDirection(String clientDirection) {
        this.clientDirection = clientDirection;
    }

    public String getClientEMail() {
        return clientEMail;
    }

    public void setClientEMail(String clientEMail) {
        this.clientEMail = clientEMail;
    }

    public Date getReceiptDate() {
        return receiptDate;
    }

    public void setReceiptDate(Date receiptDate) {
        this.receiptDate = receiptDate;
    }

    public Integer getMaterial() {
        return material;
    }

    public void setMaterial(Integer material) {
        this.material = material;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getUnitSell() {
        return unitSell;
    }

    public void setUnitSell(String unitSell) {
        this.unitSell = unitSell;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(Double subTotal) {
        this.subTotal = subTotal;
    }

    public Double getIva() {
        return iva;
    }

    public void setIva(Double iva) {
        this.iva = iva;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getTaxType() {
        return taxType;
    }

    public void setTaxType(String taxType) {
        this.taxType = taxType;
    }

    public Double getTaxPercent() {
        return taxPercent;
    }

    public void setTaxPercent(Double taxPercent) {
        this.taxPercent = taxPercent;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getPayMethod() {
        return payMethod;
    }

    public void setPayMethod(String payMethod) {
        this.payMethod = payMethod;
    }

    public Double getCurrencyType() {
        return currencyType;
    }

    public void setCurrencyType(Double currencyType) {
        this.currencyType = currencyType;
    }

    public List<FELReceiptDetailResponse> getDetails() {
        return details;
    }

    public void setDetails(List<FELReceiptDetailResponse> details) {
        this.details = details;
    }
}

package com.bufete.backend.payload.billingProcess;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class SerialNumberRequest implements Serializable {

    private Long id;
    @JsonProperty("serial_number")
    private String serialNumber;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getSerialNumber() { return serialNumber; }

    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }
}

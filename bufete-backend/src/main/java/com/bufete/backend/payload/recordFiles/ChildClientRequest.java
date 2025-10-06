package com.bufete.backend.payload.recordFiles;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class ChildClientRequest implements Serializable {

    private Long id;
    private String name;
    private String nit;
    @JsonProperty("client_type")
    private String clientType;
    private StatusName status;

    public ChildClientRequest(Long id, String name, String nit, String clientType, StatusName status) {
        this.id = id;
        this.name = name;
        this.nit = nit;
        this.clientType = clientType;
        this.status = status;
    }

    public ChildClientRequest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public String getClientType() {
        return clientType;
    }

    public void setClientType(String clientType) {
        this.clientType = clientType;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }
}

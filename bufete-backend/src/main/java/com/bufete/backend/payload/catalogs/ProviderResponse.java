package com.bufete.backend.payload.catalogs;

import com.bufete.backend.model.shared.StatusName;

import java.io.Serializable;

public class ProviderResponse implements Serializable {

    private Long id;
    private String code;
    private String name;
    private StatusName status;

    public ProviderResponse(Long id, String code, String name, StatusName status) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.status = status;
    }

    public ProviderResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }
}

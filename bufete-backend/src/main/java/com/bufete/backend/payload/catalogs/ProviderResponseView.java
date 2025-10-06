package com.bufete.backend.payload.catalogs;

import com.bufete.backend.model.shared.StatusName;

import java.io.Serializable;

public class ProviderResponseView implements Serializable {

    private Long id;
    private String code;
    private String name;
    private StatusName status;
    private String created;
    private String modified;

    public ProviderResponseView(Long id, String code, String name, StatusName status, String created, String modified) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.status = status;
        this.created = created;
        this.modified = modified;
    }

    public ProviderResponseView() {
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }

    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }

    public String getCreated() { return created; }

    public void setCreated(String created) { this.created = created; }

    public String getModified() { return modified; }

    public void setModified(String modified) { this.modified = modified; }
}

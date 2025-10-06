package com.bufete.backend.payload.catalogs;

import com.bufete.backend.model.shared.StatusName;

import java.io.Serializable;

public class ConceptRequest implements Serializable {

    private Long id;
    private String code;
    private String name;
    private String type;
    private StatusName status;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }

    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }
}

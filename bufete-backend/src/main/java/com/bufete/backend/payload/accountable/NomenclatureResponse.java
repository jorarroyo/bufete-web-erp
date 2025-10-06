package com.bufete.backend.payload.accountable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class NomenclatureResponse implements Serializable {
    private Long id;
    private String code;
    private String name;
    private StatusName status;
    private Integer type;
    @JsonProperty("parent_id")
    private Long parentId;
    @JsonProperty("parent_name")
    private String parentName;

    public NomenclatureResponse(Long id, String code, String name, StatusName status, Integer type, Long parentId,
                                String parentName) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.status = status;
        this.type = type;
        this.parentId = parentId;
        this.parentName = parentName;
    }

    public NomenclatureResponse() {
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

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }
}

package com.bufete.backend.payload.accountable;

import com.bufete.backend.model.accountable.Nomenclature;
import com.bufete.backend.model.shared.StatusName;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

public class NomenclatureResponseList implements Serializable {

    private Long id;
    private String code;
    private String name;
    private StatusName status;
    private Integer type;
    private List<NomenclatureResponseList> children;

    public NomenclatureResponseList(Long id, String code, String name, StatusName status, Integer type,
                                    List<NomenclatureResponseList> children) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.status = status;
        this.type = type;
        this.children = children;
    }

    public NomenclatureResponseList() {
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

    public List<NomenclatureResponseList> getChildren() {
        return children;
    }

    public void setChildren(List<NomenclatureResponseList> children) {
        this.children = children;
    }
}

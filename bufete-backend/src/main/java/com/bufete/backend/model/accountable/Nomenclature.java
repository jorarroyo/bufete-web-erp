package com.bufete.backend.model.accountable;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "nomenclatures")
public class Nomenclature extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @NotNull
    private String code;

    @NotBlank
    @NotNull
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;

    private Integer type;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Nomenclature parentNode;

    @OneToMany(mappedBy = "parentNode",
            cascade = { CascadeType.REMOVE, CascadeType.PERSIST} )
    private List<Nomenclature> children;

    public Nomenclature(Long id, String code, String name, StatusName status, Integer type, Nomenclature parentNode) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.status = status;
        this.type = type;
        this.parentNode = parentNode;
    }

    public Nomenclature() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) { this.id = id; }

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

    public StatusName getStatus() { return status; }

    public void setStatus(StatusName status) { this.status = status; }

    public Integer getType() { return type; }

    public void setType(Integer type) { this.type = type; }

    public Nomenclature getParentNode() {
        return parentNode;
    }

    public void setParentNode(Nomenclature parentNode) {
        this.parentNode = parentNode;
    }

    public List<Nomenclature> getChildren() {
        return children;
    }

    public void setChildren(List<Nomenclature> children) {
        this.children = children;
    }
}

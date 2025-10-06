package com.bufete.backend.model.catalogs;

import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;

@Entity
@Table(name = "concepts_view")
public class ConceptView {

    @Id
    private Long id;
    private String code;
    private String name;
    private String type;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    private String created;
    private String modified;

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

    public String getCreated() { return created; }

    public void setCreated(String created) { this.created = created; }

    public String getModified() { return modified; }

    public void setModified(String modified) { this.modified = modified; }
}

package com.bufete.backend.model.catalogs;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.billingProcess.Expenses;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "providers")
public class Provider extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 15)
    @Column(unique = true)
    private String code;

    @NotBlank
    @Size(max = 150)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;

    @OneToMany(mappedBy = "provider")
    private List<Expenses> expenses;

    public Provider(String code, String name, StatusName status) {
        this.code = code;
        this.name = name;
        this.status = status;
    }

    public Provider() {
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

    public List<Expenses> getExpenses() {
        return expenses;
    }

    public void setExpenses(List<Expenses> expenses) {
        this.expenses = expenses;
    }
}

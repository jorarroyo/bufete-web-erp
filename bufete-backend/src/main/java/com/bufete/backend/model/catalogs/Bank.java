package com.bufete.backend.model.catalogs;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.accountReceivable.PaymentTransDet;
import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "bank")
public class Bank extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 150)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;

    @OneToMany(mappedBy = "bank")
    private List<PaymentTransDet> paymentTransDets;

    public Bank(String name, StatusName status) {
        this.name = name;
        this.status = status;
    }

    public Bank() {
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

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public List<PaymentTransDet> getPaymentTransDets() {
        return paymentTransDets;
    }

    public void setPaymentTransDets(List<PaymentTransDet> paymentTransDets) {
        this.paymentTransDets = paymentTransDets;
    }
}

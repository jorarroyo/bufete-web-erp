package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.audit.DateAudit;

import javax.persistence.*;

@Entity
@Table(name = "one_time_client")
public class OneTimeClient extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private String nit;
    @Column(name = "receipt_id")
    private Long receiptId;

    public OneTimeClient(String name, String address, String nit, Long receiptId) {
        this.name = name;
        this.address = address;
        this.nit = nit;
        this.receiptId = receiptId;
    }

    public OneTimeClient() {
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public Long getReceiptId() {
        return receiptId;
    }

    public void setReceiptId(Long receiptId) {
        this.receiptId = receiptId;
    }
}

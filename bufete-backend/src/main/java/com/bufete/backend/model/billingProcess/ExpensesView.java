package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.shared.StatusName;
import javax.persistence.*;

@Entity
@Table(name = "expenses_view")
public class ExpensesView {
    @Id
    private Long id;
    @Column(name = "exchange_rate")
    private Double exchangeRate;
    @Column(name = "expenses_currency")
    private Long expensesCurrency;
    @Column(name = "expenses_date")
    private String expensesDate;
    @Column(name = "expenses_num")
    private String expensesNum;
    @Column(name = "expenses_total")
    private Double expensesTotal;
    @Column(name = "expenses_type")
    private Integer expensesType;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "provider_name")
    private String providerName;
    @Column(name = "concept_name")
    private String conceptName;
    private String created;
    private String modified;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(Double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public Long getExpensesCurrency() {
        return expensesCurrency;
    }

    public void setExpensesCurrency(Long expensesCurrency) {
        this.expensesCurrency = expensesCurrency;
    }

    public String getExpensesDate() {
        return expensesDate;
    }

    public void setExpensesDate(String expensesDate) {
        this.expensesDate = expensesDate;
    }

    public String getExpensesNum() {
        return expensesNum;
    }

    public void setExpensesNum(String expensesNum) {
        this.expensesNum = expensesNum;
    }

    public Double getExpensesTotal() {
        return expensesTotal;
    }

    public void setExpensesTotal(Double expensesTotal) {
        this.expensesTotal = expensesTotal;
    }

    public Integer getExpensesType() {
        return expensesType;
    }

    public void setExpensesType(Integer expensesType) {
        this.expensesType = expensesType;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String getConceptName() {
        return conceptName;
    }

    public void setConceptName(String conceptName) {
        this.conceptName = conceptName;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getModified() {
        return modified;
    }

    public void setModified(String modified) {
        this.modified = modified;
    }
}

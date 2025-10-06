package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.appConfig.Currency;
import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.catalogs.Concept;
import com.bufete.backend.model.catalogs.Provider;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "expenses")
public class Expenses extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "expenses_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    private Date expensesDate;
    @Column(name = "expenses_type")
    private Integer expensesType;
    @Column(name = "expenses_num")
    private String expensesNum;
    @ManyToOne
    @JoinColumn(name = "provider_id", referencedColumnName = "id")
    private Provider provider;
    @ManyToOne
    @JoinColumn(name = "concept_id", referencedColumnName = "id")
    private Concept concept;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "exchange_rate")
    private Double exchangeRate;
    @ManyToOne
    @JoinColumn(name = "expenses_currency", referencedColumnName = "id")
    private Currency expensesCurrency;
    @Column(name = "expenses_total")
    private Double expensesTotal;
    @OneToMany(mappedBy = "expenses")
    private List<ExpensesDetail> expensesDetail;

    public Expenses(Date expensesDate, Integer expensesType, String expensesNum, Provider provider, Concept concept,
                    StatusName status, Double exchangeRate, Currency expensesCurrency, Double expensesTotal) {
        this.expensesDate = expensesDate;
        this.expensesType = expensesType;
        this.expensesNum = expensesNum;
        this.provider = provider;
        this.concept = concept;
        this.status = status;
        this.exchangeRate = exchangeRate;
        this.expensesCurrency = expensesCurrency;
        this.expensesTotal = expensesTotal;
    }

    public Expenses() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getExpensesDate() {
        return expensesDate;
    }

    public void setExpensesDate(Date expensesDate) {
        this.expensesDate = expensesDate;
    }

    public Integer getExpensesType() {
        return expensesType;
    }

    public void setExpensesType(Integer expensesType) {
        this.expensesType = expensesType;
    }

    public String getExpensesNum() {
        return expensesNum;
    }

    public void setExpensesNum(String expensesNum) {
        this.expensesNum = expensesNum;
    }

    public Provider getProviderId() {
        return provider;
    }

    public void setProviderId(Provider provider) {
        this.provider = provider;
    }

    public Concept getConceptId() {
        return concept;
    }

    public void setConceptId(Concept concept) {
        this.concept = concept;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Double getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(Double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public Currency getExpensesCurrency() {
        return expensesCurrency;
    }

    public void setExpensesCurrency(Currency expensesCurrency) {
        this.expensesCurrency = expensesCurrency;
    }

    public Double getExpensesTotal() {
        return expensesTotal;
    }

    public void setExpensesTotal(Double expensesTotal) {
        this.expensesTotal = expensesTotal;
    }

    public Provider getProvider() {
        return provider;
    }

    public void setProvider(Provider provider) {
        this.provider = provider;
    }

    public Concept getConcept() {
        return concept;
    }

    public void setConcept(Concept concept) {
        this.concept = concept;
    }

    public List<ExpensesDetail> getExpensesDetail() {
        return expensesDetail;
    }

    public void setExpensesDetail(List<ExpensesDetail> expensesDetail) {
        this.expensesDetail = expensesDetail;
    }
}

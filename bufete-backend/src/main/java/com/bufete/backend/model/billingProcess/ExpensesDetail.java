package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.recordFiles.RecordFile;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "expenses_detail")
public class ExpensesDetail extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "expenses_id", referencedColumnName = "id")
    private Expenses expenses;
    @ManyToOne
    @JoinColumn(name = "file_record_id", referencedColumnName = "id")
    private RecordFile fileRecord;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @JsonProperty("expense_value")
    @Column(name = "expenseValue")
    private Double expenseValue;

    public ExpensesDetail(Expenses expenses, RecordFile fileRecord, Double expenseValue) {
        this.expenses = expenses;
        this.fileRecord = fileRecord;
        this.expenseValue = expenseValue;
    }

    public ExpensesDetail() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Expenses getExpenses() {
        return expenses;
    }

    public void setExpenses(Expenses expenses) {
        this.expenses = expenses;
    }

    public RecordFile getRecordFile() {
        return fileRecord;
    }

    public void setRecordFile(RecordFile recordFile) {
        this.fileRecord = fileRecord;
    }

    public Double getExpenseValue() {
        return expenseValue;
    }

    public void setExpenseValue(Double expenseValue) {
        this.expenseValue = expenseValue;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }
}

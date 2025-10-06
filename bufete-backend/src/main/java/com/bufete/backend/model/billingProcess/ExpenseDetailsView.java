package com.bufete.backend.model.billingProcess;

import com.bufete.backend.model.shared.StatusName;

import javax.persistence.*;

@Entity
@Table(name = "expense_details_view")
public class ExpenseDetailsView {
    @Id
    private Long id;
    @Column(name = "expenses_id")
    private Long expensesId;
    @Column(name = "file_record_id")
    private Long fileRecordId;
    @Column(name = "record_client_name")
    private String recordClientName;
    @Column(name = "record_file_name")
    private String recordFileName;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusName status;
    @Column(name = "expense_value")
    private Double expenseValue;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getExpensesId() {
        return expensesId;
    }

    public void setExpensesId(Long expensesId) {
        this.expensesId = expensesId;
    }

    public Long getFileRecordId() {
        return fileRecordId;
    }

    public void setFileRecordId(Long fileRecordId) {
        this.fileRecordId = fileRecordId;
    }

    public String getRecordClientName() {
        return recordClientName;
    }

    public void setRecordClientName(String recordClientName) {
        this.recordClientName = recordClientName;
    }

    public String getRecordFileName() {
        return recordFileName;
    }

    public void setRecordFileName(String recordFileName) {
        this.recordFileName = recordFileName;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public Double getExpenseValue() {
        return expenseValue;
    }

    public void setExpenseValue(Double expenseValue) {
        this.expenseValue = expenseValue;
    }
}

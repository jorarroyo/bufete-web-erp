package com.bufete.backend.model.recordFiles;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "case_activity_detail")
public class CaseActivityDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;
    @JsonProperty("case_activity_id")
    private Long caseActivityId;


    public CaseActivityDetail(Employee employee, Long caseActivityId) {
        this.employee = employee;
        this.caseActivityId = caseActivityId;
    }

    public CaseActivityDetail() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Long getCaseActivityId() {
        return caseActivityId;
    }

    public void setCaseActivityId(Long caseActivityId) {
        this.caseActivityId = caseActivityId;
    }
}

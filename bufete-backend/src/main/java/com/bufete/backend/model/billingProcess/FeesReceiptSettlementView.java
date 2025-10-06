package com.bufete.backend.model.billingProcess;

import javax.persistence.*;

@Entity
@Table(name = "fees_receipt_settlement_view")
public class FeesReceiptSettlementView {

    @Id
    private Long id;
    @Column(name = "file_num")
    private String fileNum;
    private String description;
    @Column(name = "employee_id")
    private Long employeeId;
    @Column(name = "employee_name")
    private String employeeName;
    @Column(name = "activity_name")
    private String activityName;
    @Column(name = "activity_time")
    private Double activityTime;
    @Column(name = "entity_id")
    private Long entityId;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFileNum() { return fileNum; }

    public void setFileNum(String fileNum) { this.fileNum = fileNum; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public Long getEmployeeId() { return employeeId; }

    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public String getEmployeeName() { return employeeName; }

    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }

    public String getActivityName() { return activityName; }

    public void setActivityName(String activityName) { this.activityName = activityName; }

    public Double getActivityTime() { return activityTime; }

    public void setActivityTime(Double activityTime) { this.activityTime = activityTime; }

    public Long getEntityId() { return entityId; }

    public void setEntityId(Long entityId) { this.entityId = entityId; }
}

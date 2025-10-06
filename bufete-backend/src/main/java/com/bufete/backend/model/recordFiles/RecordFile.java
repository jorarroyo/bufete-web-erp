package com.bufete.backend.model.recordFiles;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.billingProcess.ExpensesDetail;
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "record_file")
public class RecordFile extends UserDateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private Long type;
  @Column(name = "sub_type")
  private Long subType;
  private String subject;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  private String observations;
  @Column(name = "opening_date")
  private Date openingDate;
  @Column(name = "closing_date", nullable = true)
  private Date closingDate;
  private String location;
  @Column(name = "file_num", unique = true)
  private String fileNum;
  private Boolean confidential;
  private String priority;
  private String judgementNo;
  @OneToMany(mappedBy = "fileRecord")
  private List<ExpensesDetail> expensesDetail;
  
  public RecordFile(Long type, Long subType, String subject, StatusName status, String observations, Date openingDate,
  Date closingDate, String location, String fileNum, Boolean confidential, String priority, String judgementNo) {
    this.type = type;
    this.subType = subType;
    this.subject = subject;
    this.status = status;
    this.observations = observations;
    this.openingDate = openingDate;
    this.closingDate = closingDate;
    this.location = location;
    this.fileNum = fileNum;
    this.confidential = confidential;
    this.priority = priority;
    this.judgementNo = judgementNo;
  }
  
  public RecordFile() {
  }
  
  public Long getId() {
    return id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getType() {
    return type;
  }
  
  public void setType(Long type) {
    this.type = type;
  }
  
  public Long getSubType() {
    return subType;
  }
  
  public void setSubType(Long subType) {
    this.subType = subType;
  }
  
  public String getSubject() {
    return subject;
  }
  
  public void setSubject(String subject) {
    this.subject = subject;
  }
  
  public StatusName getStatus() {
    return status;
  }
  
  public void setStatus(StatusName status) {
    this.status = status;
  }
  
  public String getObservations() {
    return observations;
  }
  
  public void setObservations(String observations) {
    this.observations = observations;
  }
  
  public Date getOpeningDate() {
    return openingDate;
  }
  
  public void setOpeningDate(Date openingDate) {
    this.openingDate = openingDate;
  }
  
  public Date getClosingDate() {
    return closingDate;
  }
  
  public void setClosingDate(Date closingDate) {
    this.closingDate = closingDate;
  }
  
  public String getLocation() {
    return location;
  }
  
  public void setLocation(String location) {
    this.location = location;
  }
  
  public String getFileNum() {
    return fileNum;
  }
  
  public void setFileNum(String fileNum) {
    this.fileNum = fileNum;
  }
  
  public Boolean getConfidential() {
    return confidential;
  }
  
  public void setConfidential(Boolean confidential) {
    this.confidential = confidential;
  }
  
  private static final long serialVersionUID = 1L;

  public String getPriority() {
    return priority;
  }

  public void setPriority(String priority) {
    this.priority = priority;
  }

  public String getJudgementNo() {
    return judgementNo;
  }

  public void setJudgementNo(String judgementNo) {
    this.judgementNo = judgementNo;
  }

}
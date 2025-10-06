package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.Date;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class RecordFileRequest implements Serializable {

  private Long id;
  private Long type;
  @JsonProperty("sub_type")
  private Long subType;
  private String subject;
  private String observations;
  @JsonProperty("opening_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy/MM/dd")
  private Date openingDate;
  @JsonProperty("closing_date")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd")
  private Date closingDate;
  private String location;
  @JsonProperty("file_num")
  private String fileNum;
  @JsonProperty("client_id")
  private Long[] clientId;
  @JsonProperty("lawyer_id")
  private Long[] lawyerId;
  @JsonProperty("admon_id")
  private Long[] admonId;
  private Boolean confidential;
  private String priority;
  @JsonProperty("judgement_no")
  private String judgementNo;
  private StatusName status;
  private String message;

  public RecordFileRequest(Long type, Long subType, String subject, String observations, Date openingDate,
      Date closingDate, String location, String fileNum, Long[] clientId, Long[] lawyerId, Long[] admonId,
      Boolean confidential, String priority, String judgementNo, StatusName status, String message) {
    this.type = type;
    this.subType = subType;
    this.subject = subject;
    this.observations = observations;
    this.openingDate = openingDate;
    this.closingDate = closingDate;
    this.location = location;
    this.fileNum = fileNum;
    this.clientId = clientId;
    this.lawyerId = lawyerId;
    this.admonId = admonId;
    this.confidential = confidential;
    this.priority = priority;
    this.judgementNo = judgementNo;
    this.status = status;
    this.message = message;
  }

  public RecordFileRequest() {
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

  public Long[] getClientId() {
    return clientId;
  }

  public void setClientId(Long[] clientId) {
    this.clientId = clientId;
  }

  public Long[] getLawyerId() {
    return lawyerId;
  }

  public void setLawyerId(Long[] lawyerId) {
    this.lawyerId = lawyerId;
  }

  public Long[] getAdmonId() {
    return admonId;
  }

  public void setAdmonId(Long[] admonId) {
    this.admonId = admonId;
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

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
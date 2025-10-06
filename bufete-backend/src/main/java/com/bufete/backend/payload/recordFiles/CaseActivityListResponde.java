package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.List;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CaseActivityListResponde implements Serializable {

  private Long id;
  private String name;
  private StatusName status;
  @JsonProperty("case_activity_list")
  private List<CaseActivityResponse> caseActivityList;

  public CaseActivityListResponde(Long id, String name, StatusName status, List<CaseActivityResponse> caseActivityList) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.caseActivityList = caseActivityList;
  }

  public CaseActivityListResponde() {
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

  public List<CaseActivityResponse> getCaseActivityList() {
    return caseActivityList;
  }

  public void setCaseActivityList(List<CaseActivityResponse> caseActivityList) {
    this.caseActivityList = caseActivityList;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  private static final long serialVersionUID = 1L;
}
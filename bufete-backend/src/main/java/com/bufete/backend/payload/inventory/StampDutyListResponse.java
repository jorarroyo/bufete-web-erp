package com.bufete.backend.payload.inventory;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StampDutyListResponse implements Serializable {

  private Long id;
  @JsonProperty("stamp_type_name")
  private String stampTypeName;
  @JsonProperty("designation_type_name")
  private String designationTypeName;
  private Integer year;
  @JsonProperty("total_stamp_number")
  private Double totalStampNumber;
  
  public StampDutyListResponse(Long id, String stampTypeName, String designationTypeName, Integer year,
  Double totalStampNumber) {
    this.id = id;
    this.stampTypeName = stampTypeName;
    this.designationTypeName = designationTypeName;
    this.year = year;
    this.totalStampNumber = totalStampNumber;
  }
  
  public StampDutyListResponse() {
  }
  
  public Long getId() {
    return id;
  }
  
  public void setId(Long id) {
    this.id = id;
  }
  
  public String getStampTypeName() {
    return stampTypeName;
  }
  
  public void setStampTypeName(String stampTypeName) {
    this.stampTypeName = stampTypeName;
  }
  
  public String getDesignationTypeName() {
    return designationTypeName;
  }
  
  public void setDesignationTypeName(String designationTypeName) {
    this.designationTypeName = designationTypeName;
  }
  
  public Integer getYear() {
    return year;
  }
  
  public void setYear(Integer year) {
    this.year = year;
  }
  
  public Double getTotalStampNumber() {
    return totalStampNumber;
  }
  
  public void setTotalStampNumber(Double totalStampNumber) {
    this.totalStampNumber = totalStampNumber;
  }

  private static final long serialVersionUID = 1L;
}
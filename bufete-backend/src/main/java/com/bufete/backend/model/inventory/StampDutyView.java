package com.bufete.backend.model.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stamp_duty_view")
public class StampDutyView {

  @Id
  private Long id;
  @Column(name = "stamp_type_name")
  private String stampTypeName;
  @Column(name = "designation_type_name")
  private String designationTypeName;
  private Integer year;
  @Column(name = "total_stamp_number")
  private Double totalStampNumber;

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

}
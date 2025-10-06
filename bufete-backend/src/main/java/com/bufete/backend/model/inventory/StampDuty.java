package com.bufete.backend.model.inventory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stamp_duty")
public class StampDuty {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "stamp_type")
  private Long stampType;
  @Column(name = "designation_type")
  private Long designationType;
  private Integer year;
  private Double totalStampNumber;

  public StampDuty(Long stampType, Long designationType, Integer year, Double totalStampNumber) {
    this.stampType = stampType;
    this.designationType = designationType;
    this.year = year;
    this.totalStampNumber = totalStampNumber;
  }

  public StampDuty() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getStampType() {
    return stampType;
  }

  public void setStampType(Long stampType) {
    this.stampType = stampType;
  }

  public Long getDesignationType() {
    return designationType;
  }

  public void setDesignationType(Long designationType) {
    this.designationType = designationType;
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
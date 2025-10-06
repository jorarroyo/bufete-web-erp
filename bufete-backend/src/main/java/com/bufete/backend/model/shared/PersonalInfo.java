package com.bufete.backend.model.shared;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "personal_info")
public class PersonalInfo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @Column(name = "entity_id")
  private Long entityId;

  /** 1: Client, 2: Employee */
  @NotNull
  @Column(name = "entity_type")
  private Integer entityType;

  @Column(name = "sex_type")
  private Integer sexType;

  @Column(name = "birthday")
  private Date birthday;

  @Column(name = "doc_type")
  private Integer docType;

  @Column(name = "doc_num")
  private String docNum;

  @Column(name = "doc_emmit")
  private String docEmmit;

  private Long lawyer;

  @Column(name = "lawyer_jr")
  private Long lawyerJr;

  private String observation;

  @Column(name = "lawyer_Assistant")
  private Long lawyerAssistant;

  public PersonalInfo(Long entityId, Integer entityType, Integer sexType, Date birthday, Integer docType, String docNum,
      String docEmmit, Long lawyer, String observation, Long lawyerAssistant, Long lawyerJr) {
    this.entityId = entityId;
    this.entityType = entityType;
    this.sexType = sexType;
    this.birthday = birthday;
    this.docType = docType;
    this.docNum = docNum;
    this.docEmmit = docEmmit;
    this.lawyer = lawyer;
    this.observation = observation;
    this.lawyerAssistant = lawyerAssistant;
    this.lawyerJr = lawyerJr;
  }

  public PersonalInfo() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getPersonalInfoType() {
    return entityType;
  }

  public void setPersonalInfoType(Integer entityType) {
    this.entityType = entityType;
  }

  public Integer getSexType() {
    return sexType;
  }

  public void setSexType(Integer sexType) {
    this.sexType = sexType;
  }

  public Date getBirthday() {
    return birthday;
  }

  public void setBirthday(Date birthday) {
    this.birthday = birthday;
  }

  public Integer getDocType() {
    return docType;
  }

  public void setDocType(Integer docType) {
    this.docType = docType;
  }

  public String getDocNum() {
    return docNum;
  }

  public void setDocNum(String docNum) {
    this.docNum = docNum;
  }

  public String getDocEmmit() {
    return docEmmit;
  }

  public void setDocEmmit(String docEmmit) {
    this.docEmmit = docEmmit;
  }

  public Long getLawyer() {
    return lawyer;
  }

  public void setLawyer(Long lawyer) {
    this.lawyer = lawyer;
  }

  public String getObservation() {
    return observation;
  }

  public void setObservation(String observation) {
    this.observation = observation;
  }

  public Long getEntityId() {
    return entityId;
  }

  public void setEntityId(Long entityId) {
    this.entityId = entityId;
  }

  public Integer getEntityType() {
    return entityType;
  }

  public void setEntityType(Integer entityType) {
    this.entityType = entityType;
  }

  public Long getLawyerAssistant() {
    return lawyerAssistant;
  }

  public void setLawyerAssistant(Long lawyerAssistant) {
    this.lawyerAssistant = lawyerAssistant;
  }

  public Long getLawyerJr() {
    return lawyerJr;
  }

  public void setLawyerJr(Long lawyerJr) {
    this.lawyerJr = lawyerJr;
  }
}
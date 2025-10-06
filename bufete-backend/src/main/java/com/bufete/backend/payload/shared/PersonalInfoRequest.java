package com.bufete.backend.payload.shared;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PersonalInfoRequest implements Serializable {

  private Long id;
  @JsonProperty("sex_type")
  private Integer sexType;
  @JsonFormat(pattern = "yyyy/MM/dd")
  private Date bDay;
  @JsonProperty("doc_type")
  private Integer docType;
  @JsonProperty("doc_num")
  private String docNum;
  @JsonProperty("doc_emmit")
  private String docEmmit;
  private Long lawyer;
  private String observation;
  @JsonProperty("lawyer_assistant")
  private Long lawyerAssistant;
  @JsonProperty("lawyer_jr")
  private Long lawyerJr;

  public PersonalInfoRequest(Long id, Integer sexType, Date bDay, Integer docType, String docNum, String docEmmit,
      Long lawyer, String observation, Long lawyerAssistant, Long lawyerJr) {
    this.id = id;
    this.sexType = sexType;
    this.bDay = bDay;
    this.docType = docType;
    this.docNum = docNum;
    this.docEmmit = docEmmit;
    this.lawyer = lawyer;
    this.observation = observation;
    this.lawyerAssistant = lawyerAssistant;
    this.lawyerJr = lawyerJr;
  }

  public PersonalInfoRequest() {
    this.id = null;
    this.sexType = 0;
    this.bDay = null;
    this.docType = 0;
    this.docNum = "";
    this.docEmmit = "";
    this.lawyer = null;
    this.lawyerAssistant = null;
    this.lawyerJr = null;
    this.observation = "";
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getSexType() {
    return sexType;
  }

  public void setSexType(Integer sexType) {
    this.sexType = sexType;
  }

  public Date getbDay() {
    return bDay;
  }

  public void setbDay(Date bDay) {
    this.bDay = bDay;
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

  private static final long serialVersionUID = 1L;

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
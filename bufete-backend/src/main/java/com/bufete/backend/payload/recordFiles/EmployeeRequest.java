package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.Date;

import com.bufete.backend.payload.shared.ContactRequest;
import com.bufete.backend.payload.shared.PersonalInfoRequest;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

public class EmployeeRequest implements Serializable {

  private Long id;
  private String name;
  @JsonProperty("last_name")
  private String lastName;
  private String nit;
  private String igss;
  private String address;
  @JsonProperty("home_phone")
  private String homePhone;
  @JsonProperty("cel_phone")
  private String celPhone;
  @JsonProperty("civil_status")
  private String civilStatus;
  @JsonProperty("child_no")
  private Integer childNo;
  @JsonProperty("academic_level")
  private String academicLevel;
  private String title;
  private String village;
  private String languages;
  private PersonalInfoRequest personalInfoRequest;
  private ContactRequest contactRequest;
  private Long position;
  @JsonProperty("amount_per_hour")
  private Double amountPerHour;
  @JsonProperty("employee_adminission")
  @JsonFormat(shape = Shape.STRING, pattern = "yyyy/MM/dd")
  private Date admissionDate;

  public EmployeeRequest(String name, String lastName, String nit, String igss, String address, String homePhone,
      String celPhone, String civilStatus, Integer childNo, String academicLevel, String title, String village,
      String languages, Long position, Double amountPerHour, Date admissionDate) {
    this.name = name;
    this.lastName = lastName;
    this.nit = nit;
    this.igss = igss;
    this.address = address;
    this.homePhone = homePhone;
    this.celPhone = celPhone;
    this.civilStatus = civilStatus;
    this.childNo = childNo;
    this.academicLevel = academicLevel;
    this.title = title;
    this.village = village;
    this.languages = languages;
    this.position = position;
    this.amountPerHour = amountPerHour;
    this.admissionDate = admissionDate;
  }

  public EmployeeRequest() {
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

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getNit() {
    return nit;
  }

  public void setNit(String nit) {
    this.nit = nit;
  }

  public String getIgss() {
    return igss;
  }

  public void setIgss(String igss) {
    this.igss = igss;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getHomePhone() {
    return homePhone;
  }

  public void setHomePhone(String homePhone) {
    this.homePhone = homePhone;
  }

  public String getCelPhone() {
    return celPhone;
  }

  public void setCelPhone(String celPhone) {
    this.celPhone = celPhone;
  }

  public String getCivilStatus() {
    return civilStatus;
  }

  public void setCivilStatus(String civilStatus) {
    this.civilStatus = civilStatus;
  }

  public Integer getChildNo() {
    return childNo;
  }

  public void setChildNo(Integer childNo) {
    this.childNo = childNo;
  }

  public String getAcademicLevel() {
    return academicLevel;
  }

  public void setAcademicLevel(String academicLevel) {
    this.academicLevel = academicLevel;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getVillage() {
    return village;
  }

  public void setVillage(String village) {
    this.village = village;
  }

  public String getLanguages() {
    return languages;
  }

  public void setLanguages(String languages) {
    this.languages = languages;
  }

  public PersonalInfoRequest getPersonalInfoRequest() {
    return personalInfoRequest;
  }

  public void setPersonalInfoRequest(PersonalInfoRequest personalInfoRequest) {
    this.personalInfoRequest = personalInfoRequest;
  }

  private static final long serialVersionUID = 1L;

  public ContactRequest getContactRequest() {
    return contactRequest;
  }

  public void setContactRequest(ContactRequest contactRequest) {
    this.contactRequest = contactRequest;
  }

  public Long getPosition() {
    return position;
  }

  public void setPosition(Long position) {
    this.position = position;
  }

  public Double getAmountPerHour() {
    return amountPerHour;
  }

  public void setAmountPerHour(Double amountPerHour) {
    this.amountPerHour = amountPerHour;
  }

  public Date getAdmissionDate() {
    return admissionDate;
  }

  public void setAdmissionDate(Date admissionDate) {
    this.admissionDate = admissionDate;
  }
}
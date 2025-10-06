package com.bufete.backend.model.recordFiles;

import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.bufete.backend.model.audit.UserDateAudit;
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "employees")
public class Employee extends UserDateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(min = 2, max = 100)
  private String name;

  @NotBlank
  @Size(min = 2, max = 100)
  @Column(name = "last_name")
  private String lastName;

  @Size(max = 10)
  private String nit;

  @Size(max = 10)
  private String igss;

  @Size(max = 100)
  private String address;

  @Size(max = 10)
  @Column(name = "home_phone")
  private String homePhone;

  @Size(max = 10)
  @Column(name = "cel_phone")
  private String celPhone;

  @Size(max = 10)
  @Column(name = "civil_status")
  private String civilStatus;

  @Column(name = "child_no")
  private Integer childNo;

  @Size(max = 70)
  @Column(name = "academic_level")
  private String academicLevel;

  @Size(max = 70)
  private String title;

  @Size(max = 50)
  private String village;

  @Size(max = 100)
  private String languages;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;

  private Long position;

  @Column(name = "amount_per_hour")
  private Double amountPerHour;

  @Column(name = "employee_adminission")
  private Date admissionDate;

  @OneToMany(mappedBy = "employee")
  private List<CaseActivityDetail> caseActivityDetails;

  public Employee(String name, String lastName, String nit, String igss, String address, String homePhone,
      String celPhone, String civilStatus, Integer childNo, String academicLevel, String title, String village,
      String languages, StatusName status, Long position, Double amountPerHour, Date admissionDate) {
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
    this.status = status;
    this.position = position;
    this.amountPerHour = amountPerHour;
    this.admissionDate = admissionDate;
  }

  public Employee() {
  }

  private static final long serialVersionUID = 1L;

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

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
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

  public List<CaseActivityDetail> getCaseActivityDetails() {
    return caseActivityDetails;
  }

  public void setCaseActivityDetails(List<CaseActivityDetail> caseActivityDetails) {
    this.caseActivityDetails = caseActivityDetails;
  }
}
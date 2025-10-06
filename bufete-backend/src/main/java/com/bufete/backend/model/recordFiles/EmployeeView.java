package com.bufete.backend.model.recordFiles;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "employees_view")
public class EmployeeView {

  @Id
  private Long id;
  private String name;
  private String nit;
  private String igss;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;
  private String created;
  private String modified;

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

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public String getCreated() {
    return created;
  }

  public void setCreated(String created) {
    this.created = created;
  }

  public String getModified() {
    return modified;
  }

  public void setModified(String modified) {
    this.modified = modified;
  }

}
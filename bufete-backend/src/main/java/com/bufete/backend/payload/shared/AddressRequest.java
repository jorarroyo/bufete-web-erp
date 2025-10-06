package com.bufete.backend.payload.shared;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;

public class AddressRequest implements Serializable {

  private Long id;
  private Integer type;
  private String address;
  private String zone;
  private Long department;
  private StatusName status;

  public AddressRequest(Long id, Integer type, String address, String zone, Long department, StatusName status) {
    this.id = id;
    this.type = type;
    this.address = address;
    this.zone = zone;
    this.department = department;
    this.status = status;
  }

  public AddressRequest() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getType() {
    return type;
  }

  public void setType(Integer type) {
    this.type = type;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getZone() {
    return zone;
  }

  public void setZone(String zone) {
    this.zone = zone;
  }

  public Long getDepartment() {
    return department;
  }

  public void setDepartment(Long department) {
    this.department = department;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  private static final long serialVersionUID = 1L;
}
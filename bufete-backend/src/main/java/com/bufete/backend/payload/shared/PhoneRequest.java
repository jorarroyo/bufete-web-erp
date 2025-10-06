package com.bufete.backend.payload.shared;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PhoneRequest implements Serializable {

  private Long id;
  @JsonProperty("phone_number")
  private String phoneNumber;
  @JsonProperty("phone_type")
  private Integer phoneType;
  private StatusName status;

  public PhoneRequest(Long id, String phoneNumber, Integer phoneType, StatusName status) {
    this.id = id;
    this.phoneNumber = phoneNumber;
    this.phoneType = phoneType;
    this.status = status;
  }

  public PhoneRequest() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public Integer getPhoneType() {
    return phoneType;
  }

  public void setPhoneType(Integer phoneType) {
    this.phoneType = phoneType;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  private static final long serialVersionUID = 1L;
}
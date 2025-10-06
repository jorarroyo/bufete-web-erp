package com.bufete.backend.payload.shared;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ContactRequest implements Serializable {

  private Long id;
  @JsonProperty("contact_name")
  private String contactName;
  @JsonProperty("contact_address")
  private String contactAddress;
  @JsonProperty("contact_email")
  private String contactEmail;
  @JsonProperty("contact_phone")
  private String contactPhone;
  @JsonProperty("contact_type")
  private Integer contactType;
  private StatusName status;

  public ContactRequest(Long id, String contactName, String contactAddress, String contactEmail, String contactPhone, Integer contactType, StatusName status) {
    this.id = id;
    this.contactName = contactName;
    this.contactAddress = contactAddress;
    this.contactEmail = contactEmail;
    this.contactPhone = contactPhone;
    this.contactType = contactType;
    this.status = status;
  }

  public ContactRequest() {
    this.id = null;
    this.contactName = "";
    this.contactAddress = "";
    this.contactEmail = "";
    this.contactPhone = "";
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getContactName() {
    return contactName;
  }

  public void setContactName(String contactName) {
    this.contactName = contactName;
  }

  public String getContactAddress() {
    return contactAddress;
  }

  public void setContactAddress(String contactAddress) {
    this.contactAddress = contactAddress;
  }

  public String getContactEmail() {
    return contactEmail;
  }

  public void setContactEmail(String contactEmail) {
    this.contactEmail = contactEmail;
  }

  public String getContactPhone() {
    return contactPhone;
  }

  public void setContactPhone(String contactPhone) {
    this.contactPhone = contactPhone;
  }

  private static final long serialVersionUID = 1L;

  public Integer getContactType() {
    return contactType;
  }

  public void setContactType(Integer contactType) {
    this.contactType = contactType;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }
}
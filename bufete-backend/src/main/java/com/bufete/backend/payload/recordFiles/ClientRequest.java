package com.bufete.backend.payload.recordFiles;

import java.io.Serializable;
import java.util.List;

import com.bufete.backend.payload.shared.AddressRequest;
import com.bufete.backend.payload.shared.ContactRequest;
import com.bufete.backend.payload.shared.PersonalInfoRequest;
import com.bufete.backend.payload.shared.PhoneRequest;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ClientRequest implements Serializable {

  private Long id;
  private String name;
  @JsonProperty("last_name")
  private String lastName;
  @JsonProperty("client_type")
  private Integer clientType;
  private String nit;
  private String acronym;
  private List<ContactRequest> contacts;
  private List<AddressRequest> addresses;
  private List<PhoneRequest> phones;
  private PersonalInfoRequest personalInfoRequest;
  @JsonProperty("child_list")
  private List<ChildClientRequest> childClientRequests;

  public ClientRequest(String name, String lastName, Integer clientType, String nit, String acronym) {
    this.name = name;
    this.lastName = lastName;
    this.clientType = clientType;
    this.nit = nit;
    this.acronym = acronym;
  }

  public ClientRequest() {
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

  public Integer getClientType() {
    return clientType;
  }

  public void setClientType(Integer clientType) {
    this.clientType = clientType;
  }

  public String getNit() {
    return nit;
  }

  public void setNit(String nit) {
    this.nit = nit;
  }

  public String getAcronym() {
    return acronym;
  }

  public void setAcronym(String acronym) {
    this.acronym = acronym;
  }

  public List<ContactRequest> getContacts() {
    return contacts;
  }

  public void setContacts(List<ContactRequest> contacts) {
    this.contacts = contacts;
  }

  public List<AddressRequest> getAddresses() {
    return addresses;
  }

  public void setAddresses(List<AddressRequest> addresses) {
    this.addresses = addresses;
  }

  public List<PhoneRequest> getPhones() {
    return phones;
  }

  public void setPhones(List<PhoneRequest> phones) {
    this.phones = phones;
  }

  public PersonalInfoRequest getPersonalInfoRequest() {
    return personalInfoRequest;
  }

  public void setPersonalInfoRequest(PersonalInfoRequest personalInfoRequest) {
    this.personalInfoRequest = personalInfoRequest;
  }

  public List<ChildClientRequest> getChildClientRequests() {
    return childClientRequests;
  }

  public void setChildClientRequests(List<ChildClientRequest> childClientRequests) {
    this.childClientRequests = childClientRequests;
  }

  private static final long serialVersionUID = 1L;
}
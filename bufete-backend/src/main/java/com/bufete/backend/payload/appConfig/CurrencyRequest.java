package com.bufete.backend.payload.appConfig;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CurrencyRequest {

  private Long id;
  private String name;

  @JsonProperty("short_name")
  private String shortName;

  @JsonProperty("exchange_value")
  private Double exchangeValue;

  private StatusName status;

  @JsonProperty("company_id")
  private Long companyId;

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

  public String getShortName() {
    return shortName;
  }

  public void setShortName(String shortName) {
    this.shortName = shortName;
  }

  public Double getExchangeValue() {
    return exchangeValue;
  }

  public void setExchangeValue(Double exchangeValue) {
    this.exchangeValue = exchangeValue;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  public Long getCompanyId() {
    return companyId;
  }

  public void setCompanyId(Long companyId) {
    this.companyId = companyId;
  }
}
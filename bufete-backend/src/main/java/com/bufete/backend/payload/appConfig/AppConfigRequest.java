package com.bufete.backend.payload.appConfig;

import java.io.Serializable;

import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AppConfigRequest implements Serializable {

  private Long id;
  @JsonProperty("config_name")
  private String configName;
  @JsonProperty("config_value")
  private String configValue;
  @JsonProperty("company_id")
  private Long companyId;
  private StatusName status;

  public AppConfigRequest(Long id, String configName, String configValue, Long companyId, StatusName status) {
    this.id = id;
    this.configName = configName;
    this.configValue = configValue;
    this.companyId = companyId;
    this.status = status;
  }

  public AppConfigRequest() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getConfigName() {
    return configName;
  }

  public void setConfigName(String configName) {
    this.configName = configName;
  }

  public String getConfigValue() {
    return configValue;
  }

  public void setConfigValue(String configValue) {
    this.configValue = configValue;
  }

  public Long getCompanyId() {
    return companyId;
  }

  public void setCompanyId(Long companyId) {
    this.companyId = companyId;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  private static final long serialVersionUID = 1L;

}
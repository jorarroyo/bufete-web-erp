package com.bufete.backend.model.appConfig;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bufete.backend.model.audit.DateAudit;
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "app_config")
public class AppConfiguration extends DateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "config_name")
  private String configName;
  @Column(name = "config_value")
  private String configValue;
  @Column(name = "company_id")
  private Long companyId;
  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;

  public AppConfiguration(String configName, String configValue, Long companyId, StatusName status) {
    this.configName = configName;
    this.configValue = configValue;
    this.companyId = companyId;
    this.status = status;
  }

  public AppConfiguration() {
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
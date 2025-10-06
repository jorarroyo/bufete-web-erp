package com.bufete.backend.payload.appConfig;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RoleAssignResponse {

  @JsonProperty("company_id")
  private Long companyId;

  @JsonProperty("role_id")
  private Long roleId;

  public RoleAssignResponse(Long companyId, Long roleId) {
    this.companyId = companyId;
    this.roleId = roleId;
  }

  public RoleAssignResponse() {
  }

  public Long getCompanyId() {
    return companyId;
  }

  public void setCompanyId(Long companyId) {
    this.companyId = companyId;
  }

  public Long getRoleId() {
    return roleId;
  }

  public void setRoleId(Long roleId) {
    this.roleId = roleId;
  }

}
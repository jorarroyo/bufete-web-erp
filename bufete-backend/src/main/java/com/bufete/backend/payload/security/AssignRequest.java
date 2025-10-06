package com.bufete.backend.payload.security;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AssignRequest {

  @JsonProperty("user_id")
  private Long userId;

  @JsonProperty("company_id")
  private Long companyId;

  @JsonProperty("roles_id")
  private Long[] rolesId;

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public Long getCompanyId() {
    return companyId;
  }

  public void setCompanyId(Long companyId) {
    this.companyId = companyId;
  }

  public Long[] getRolesId() {
    return rolesId;
  }

  public void setRolesId(Long[] rolesId) {
    this.rolesId = rolesId;
  }

}
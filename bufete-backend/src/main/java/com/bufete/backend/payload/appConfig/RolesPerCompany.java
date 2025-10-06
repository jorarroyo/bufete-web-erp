package com.bufete.backend.payload.appConfig;

public class RolesPerCompany {
  private Long companyId;
  private Long[] rolesId;

  public RolesPerCompany(Long companyId, Long[] rolesId) {
    this.companyId = companyId;
    this.rolesId = rolesId;
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
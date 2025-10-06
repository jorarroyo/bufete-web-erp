package com.bufete.backend.model.appConfig;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class UserRoleCompanyKey implements Serializable {

  @Column(name = "user_id")
  private Long userId;

  @Column(name = "role_id")
  private Long roleId;

  @Column(name = "company_id")
  private Long companyId;

  public UserRoleCompanyKey(Long userId, Long roleId, Long companyId) {
    this.userId = userId;
    this.roleId = roleId;
    this.companyId = companyId;
  }

  public UserRoleCompanyKey() {
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public Long getRoleId() {
    return roleId;
  }

  public void setRoleId(Long roleId) {
    this.roleId = roleId;
  }

  public Long getCompanyId() {
    return companyId;
  }

  public void setCompanyId(Long companyId) {
    this.companyId = companyId;
  }

  private static final long serialVersionUID = 1L;

}
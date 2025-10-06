package com.bufete.backend.model.appConfig;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class RoleOptionKey implements Serializable {

  @Column(name = "role_id")
  private Long roleId;

  @Column(name = "app_option_id")
  private Long appOptionId;

  public RoleOptionKey(Long roleId, Long appOptionId) {
    this.roleId = roleId;
    this.appOptionId = appOptionId;
  }

  public RoleOptionKey() {
  }

  public Long getRoleId() {
    return roleId;
  }

  public void setRoleId(Long roleId) {
    this.roleId = roleId;
  }

  public Long getAppOptionId() {
    return appOptionId;
  }

  public void setAppOptionId(Long appOptionId) {
    this.appOptionId = appOptionId;
  }

  private static final long serialVersionUID = 1L;

}
package com.bufete.backend.model.appConfig;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.bufete.backend.model.audit.DateAudit;
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "role_app_options")
public class RoleAppOption extends DateAudit {

  @EmbeddedId
  private RoleOptionKey id;

  @ManyToOne
  @MapsId("role_id")
  @JoinColumn(name = "role_id")
  private Role roleOption;

  @ManyToOne
  @MapsId("app_option_id")
  @JoinColumn(name = "app_option_id")
  private AppOption appOption;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private StatusName status;

  public RoleAppOption(RoleOptionKey id, Role roleOption, AppOption appOption, StatusName status) {
    this.id = id;
    this.roleOption = roleOption;
    this.appOption = appOption;
    this.status = status;
  }

  public RoleAppOption() {
  }

  public RoleOptionKey getId() {
    return id;
  }

  public void setId(RoleOptionKey id) {
    this.id = id;
  }

  public Role getRole() {
    return roleOption;
  }

  public void setRole(Role roleOption) {
    this.roleOption = roleOption;
  }

  public AppOption getAppOption() {
    return appOption;
  }

  public void setAppOption(AppOption appOption) {
    this.appOption = appOption;
  }

  public StatusName getStatus() {
    return status;
  }

  public void setStatus(StatusName status) {
    this.status = status;
  }

  private static final long serialVersionUID = 1L;
}
package com.bufete.backend.model.appConfig;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "app_options")
public class AppOption {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Column(length = 100)
  private String name;

  @JsonIgnore
  @OneToMany(mappedBy = "appOption")
  private Set<RoleAppOption> roleAppOption = new HashSet<RoleAppOption>();

  public AppOption(String name) {
    this.name = name;
  }

  public AppOption() {
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

  public Set<RoleAppOption> getRoleOptions() {
    return roleAppOption;
  }

  public void setRoleOptions(Set<RoleAppOption> roleAppOption) {
    this.roleAppOption = roleAppOption;
  }
}
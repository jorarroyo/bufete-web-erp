package com.bufete.backend.model.appConfig;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.bufete.backend.model.audit.DateAudit;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "roles")
public class Role extends DateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Column(length = 60, unique = true)
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private StatusName status;

	@JsonIgnore
	@OneToMany(mappedBy = "role")
	private Set<RoleAssign> registrations;

	@JsonIgnore
	@OneToMany(mappedBy = "roleOption")
	private Set<RoleAppOption> roleAppOption;

	public Role(String name, StatusName status) {
		super();
		this.name = name;
		this.status = status;
	}

	public Role() {

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

	public StatusName getStatus() {
		return status;
	}

	public void setStatus(StatusName status) {
		this.status = status;
	}

	public Set<RoleAssign> getRegistrations() {
		return registrations;
	}

	public void setRegistrations(Set<RoleAssign> registrations) {
		this.registrations = registrations;
	}

	public Set<RoleAppOption> getRoleOptions() {
		return roleAppOption;
	}

	public void setRoleOptions(Set<RoleAppOption> roleAppOption) {
		this.roleAppOption = roleAppOption;
	}

	private static final long serialVersionUID = 1L;
}

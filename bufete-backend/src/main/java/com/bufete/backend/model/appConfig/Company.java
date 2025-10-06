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
import javax.validation.constraints.Size;

import com.bufete.backend.model.audit.DateAudit;
import com.bufete.backend.model.shared.StatusName;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "companies")
public class Company extends DateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 150)
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private StatusName status;

	@OneToMany(mappedBy = "company")
	@JsonIgnore
	private Set<RoleAssign> registrations;

	public Company(String name, StatusName status) {
		super();
		this.name = name;
		this.status = status;
	}

	public Company() {

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

	private static final long serialVersionUID = 1L;
}

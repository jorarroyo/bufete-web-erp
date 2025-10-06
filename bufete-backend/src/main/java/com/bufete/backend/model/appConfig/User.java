package com.bufete.backend.model.appConfig;

import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NaturalId;

import com.bufete.backend.model.audit.DateAudit;
import com.bufete.backend.model.shared.StatusName;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = { "username" }),
		@UniqueConstraint(columnNames = { "email" }) })
public class User extends DateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 40)
	private String name;

	@NotBlank
	@Size(max = 15)
	private String username;

	@NaturalId
	@NotBlank
	@Size(max = 40)
	@Email
	private String email;

	@NotBlank
	@Size(max = 100)
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private StatusName status;

	@OneToMany(mappedBy = "user")
	private Set<RoleAssign> roleAssigns;

	@Column(name = "employee_id", nullable = false)
	private Long employeeId;

	public User(String name, String username, String email, String password, StatusName status, Long employeeId) {
		super();
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.status = status;
		this.employeeId = employeeId;
	}

	public User() {

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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<RoleAssign> getRoleAssigns() {
		return roleAssigns;
	}

	public void setRoleAssigns(Set<RoleAssign> roleAssigns) {
		this.roleAssigns = roleAssigns;
	}

	public StatusName getStatus() {
		return status;
	}

	public void setStatus(StatusName status) {
		this.status = status;
	}

	private static final long serialVersionUID = 1L;

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
}

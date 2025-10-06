package com.bufete.backend.payload.security;

public class UserSummary {

	private Long id;
	private String username;
	private String name;
	private String companyName;
	private String[] rolesName;

	public UserSummary(Long id, String username, String name, String companyName, String[] rolesName) {
		super();
		this.id = id;
		this.username = username;
		this.name = name;
		this.companyName = companyName;
		this.rolesName = rolesName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String[] getRolesName() {
		return rolesName;
	}

	public void setRolesName(String[] rolesName) {
		this.rolesName = rolesName;
	}

}

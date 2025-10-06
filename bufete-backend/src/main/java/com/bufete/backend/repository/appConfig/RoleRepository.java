package com.bufete.backend.repository.appConfig;

import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.appConfig.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<Role> findByName(String roleName);

	@Query("SELECT ro FROM Role ro WHERE ro.status = 'ACTIVO'")
	List<Role> getRolesActive();
}

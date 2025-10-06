package com.bufete.backend.repository.appConfig;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bufete.backend.model.appConfig.Company;
import com.bufete.backend.model.shared.StatusName;

public interface CompanyRepository extends JpaRepository<Company, Long> {
	Optional<Company> findByName(String name);

	Page<Company> findByStatus(StatusName status, Pageable pageable);

	@Query("SELECT co FROM Company co WHERE co.status = 'ACTIVO'")
	List<Company> getCompaniesActive();
}

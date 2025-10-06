package com.bufete.backend.repository.appConfig;

import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.appConfig.AppConfiguration;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AppConfigRepository extends JpaRepository<AppConfiguration, Long> {

  @Query("SELECT acn FROM AppConfiguration acn WHERE acn.status = :status AND acn.companyId = :companyId")
  List<AppConfiguration> getAppConfigByStatusAndCompanyId(@Param("status") StatusName status, @Param("companyId") Long companyId);

  @Query("SELECT acn FROM AppConfiguration acn WHERE acn.companyId = :companyId")
  List<AppConfiguration> getAppConfigByCompanyId(@Param("companyId") Long companyId);

  @Query("SELECT acn FROM AppConfiguration acn WHERE acn.configName = :name")
  Optional<AppConfiguration> getAppConfigByName(@Param("name") String name);
}
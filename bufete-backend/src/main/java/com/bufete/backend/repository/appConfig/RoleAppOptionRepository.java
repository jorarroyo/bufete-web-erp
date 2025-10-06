package com.bufete.backend.repository.appConfig;

import java.util.List;

import com.bufete.backend.model.appConfig.AppOption;
import com.bufete.backend.model.appConfig.RoleAppOption;
import com.bufete.backend.model.appConfig.RoleOptionKey;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleAppOptionRepository extends JpaRepository<RoleAppOption, RoleOptionKey> {

  @Query("SELECT ra.appOption FROM RoleAppOption ra WHERE ra.roleOption.id = :roleId")
  List<AppOption> getAppOptionByRoleId(@Param("roleId") Long roleId);

  @Query("SELECT ra.appOption FROM RoleAppOption ra WHERE ra.roleOption.id IN (:roleIds) AND ra.roleOption.status = 'ACTIVO'")
  List<AppOption> getAppOptionByRoleIds(@Param("roleIds") List<Long> roleIds);

  @Query("SELECT ao.appOption.id FROM RoleAppOption ao WHERE ao.roleOption.id = :roleId and ao.roleOption.status = 'ACTIVO' AND ao.status = 'ACTIVO'")
  List<Long> getOptionPerRol(@Param("roleId") Long roleId);

  @Modifying
  @Query("DELETE FROM RoleAppOption ao WHERE ao.roleOption.id = :roleId")
  void deleteAllByRoleId(@Param("roleId") Long roleId);
}
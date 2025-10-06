package com.bufete.backend.repository.appConfig;

import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.appConfig.Company;
import com.bufete.backend.model.appConfig.Role;
import com.bufete.backend.model.appConfig.RoleAssign;
import com.bufete.backend.model.appConfig.User;
import com.bufete.backend.model.appConfig.UserRoleCompanyKey;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleAssignRepository extends JpaRepository<RoleAssign, UserRoleCompanyKey> {

  @Query("SELECT COUNT(ra.role.id) FROM RoleAssign ra WHERE ra.user.id = :userId AND ra.company.id = :companyId  AND ra.user.status = 'ACTIVO' and ra.company.status = 'ACTIVO'")
  long countRolesByUserIdAndCompanyId(@Param("userId") Long userId, @Param("companyId") Long companyId);

  @Query("SELECT ra.role FROM RoleAssign ra WHERE ra.user.id = :userId AND ra.company.id = :companyId AND ra.user.status = 'ACTIVO' and ra.company.status = 'ACTIVO'")
  List<Role> getRolesByUserIdAndCompanyId(@Param("userId") Long userId, @Param("companyId") Long companyId);

  @Query("SELECT DISTINCT ra.role.id FROM RoleAssign ra WHERE ra.user.id = :userId AND ra.company.id = :companyId AND ra.user.status = 'ACTIVO' and ra.company.status = 'ACTIVO'")
  List<Long> getRolesIdByUserIdAndCompanyId(@Param("userId") Long userId, @Param("companyId") Long companyId);

  @Query("SELECT ra.user FROM RoleAssign ra WHERE ra.user.username = :username AND ra.company.id = :companyId AND ra.user.status = 'ACTIVO' and ra.company.status = 'ACTIVO'")
  Optional<User> findUserByUsernameAndCompany(@Param("username") String username, @Param("companyId") Long companyId);

  @Query("SELECT DISTINCT ra.company FROM RoleAssign ra WHERE ra.user.id = :userId AND ra.user.status = 'ACTIVO' and ra.company.status = 'ACTIVO'")
  List<Company> getCompaniesPerUserId(@Param("userId") Long userId);

  @Query("SELECT ra.user FROM RoleAssign ra WHERE ra.user.id = :userId AND ra.company.id = :companyId AND ra.user.status = 'ACTIVO' and ra.company.status = 'ACTIVO'")
  Optional<User> findUserByIdAndCompany(@Param("userId") Long userId, @Param("companyId") Long companyId);

  @Query("SELECT urc FROM RoleAssign urc WHERE urc.user.id = :userId")
  List<RoleAssign> getRoleAssignedById(@Param("userId") Long userId);

	@Modifying
  @Query("DELETE FROM RoleAssign urc WHERE urc.user.id = :userId")
  void deleteRoleAssignByUserId(@Param("userId") Long userId);
}
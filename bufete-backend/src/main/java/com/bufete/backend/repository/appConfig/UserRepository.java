package com.bufete.backend.repository.appConfig;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bufete.backend.model.appConfig.User;;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);

	Optional<User> findByUsernameOrEmail(String username, String email);

	List<User> findByIdIn(List<Long> userIds);

	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	@Query("SELECT ra FROM User ra WHERE ra.status = 'ACTIVO' AND ra.username = :username or ra.email = :email")
	Optional<User> findByUsernameOrEmailActive(@Param("username") String username, @Param("email") String email);

	@Query("SELECT us FROM User us WHERE us.status = 'ACTIVO'")
	List<User> getActiveUsers();

	@Modifying
  @Query("UPDATE User us SET us.password = :password WHERE us.id = :userId")
  void resetPasswordByUserId(@Param("password") String password, @Param("userId") Long userId);
}

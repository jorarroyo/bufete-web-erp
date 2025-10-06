package com.bufete.backend.repository.shared;

import java.util.List;

import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.model.shared.Telephone;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TelephoneRepository extends JpaRepository<Telephone, Long> {

  @Query("SELECT tp FROM Telephone tp WHERE tp.entityId = :entityId AND tp.entityType = :entityType AND tp.status = :status")
  List<Telephone> getPhonesByEntity(@Param("entityId") Long entityId, @Param("entityType") Integer entityType,
      @Param("status") StatusName status);
}
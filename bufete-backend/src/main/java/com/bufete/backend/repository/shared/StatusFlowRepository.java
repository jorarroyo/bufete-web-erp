package com.bufete.backend.repository.shared;

import java.util.List;

import com.bufete.backend.model.shared.StatusFlow;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusFlowRepository extends JpaRepository<StatusFlow, Long> {

  @Query("SELECT sf FROM StatusFlow sf WHERE sf.entityType = :entityType")
  List<StatusFlow> findByEntityType(@Param("entityType") Integer entityType);

  @Query("SELECT sf.privilege FROM StatusFlow sf WHERE sf.entityType = :entityType AND sf.nextStatus = :nextStatus")
  String findPrivilegeByEntityType(@Param("entityType") Integer entityType, @Param("nextStatus") StatusName nextStatus);
}
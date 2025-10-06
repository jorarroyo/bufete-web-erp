package com.bufete.backend.repository.shared;

import java.util.List;

import com.bufete.backend.model.shared.StatusHistory;
import com.bufete.backend.model.shared.StatusHistoryView;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusHistoryRepository extends JpaRepository<StatusHistory, Long> {

  @Query("SELECT sh FROM StatusHistoryView sh WHERE sh.entityId = :entityId AND sh.entityType = :entityType")
  List<StatusHistoryView> findByIdAndType(@Param("entityId") Long entityId, @Param("entityType") Integer entityType);
}
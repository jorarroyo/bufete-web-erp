package com.bufete.backend.repository.recordFiles;

import java.util.List;

import com.bufete.backend.model.recordFiles.ActivitySettlementDetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivitySettleDetailRepository extends JpaRepository<ActivitySettlementDetail, Long> {

  @Query("SELECT asd FROM ActivitySettlementDetail asd WHERE asd.activitySettlementId = :id")
  List<ActivitySettlementDetail> findAllByActivitySettleId(@Param("id") Long id);

  @Modifying
  @Query("DELETE FROM ActivitySettlementDetail asd WHERE asd.activitySettlementId = :id")
  void deleteActivitySettleDetail(@Param("id") Long id);
}
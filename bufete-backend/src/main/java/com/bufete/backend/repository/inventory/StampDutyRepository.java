package com.bufete.backend.repository.inventory;

import java.util.Optional;

import com.bufete.backend.model.inventory.StampDuty;
import com.bufete.backend.model.inventory.StampDutyView;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StampDutyRepository extends JpaRepository<StampDuty, Long> {

  @Query("SELECT sdv FROM StampDutyView sdv WHERE sdv.stampTypeName LIKE %:searchText%")
  Page<StampDutyView> findPagedStampDutyView(@Param("searchText") String searchText, Pageable pageable);

  @Query("SELECT sd FROM StampDuty sd WHERE sd.stampType = :stampType AND sd.designationType = :designationType AND sd.year = :year")
  Optional<StampDuty> findByTypeAndDesignationAndYear(@Param("stampType") Long stampType, @Param("designationType") Long designationType, @Param("year") Integer year);

  @Modifying
  @Query("UPDATE StampDuty SET totalStampNumber = totalStampNumber + :totalStampNumber WHERE id = :stampDutyId")
  void updateTotalStampNumber(@Param("totalStampNumber") Double totalStampNumber, @Param("stampDutyId") Long stampDutyId);
}
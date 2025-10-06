package com.bufete.backend.repository.recordFiles;

import java.util.List;

import com.bufete.backend.model.recordFiles.ActivitySettlement;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivitySettlementRepository extends JpaRepository<ActivitySettlement, Long> {

  @Query("SELECT cse FROM ActivitySettlement cse WHERE cse.invoiceNum LIKE %:invoiceNum% AND cse.proctorAgendaId = :proctorAgendaId AND cse.status IN (:status)")
  Page<ActivitySettlement> getPagedActivitySettle(@Param("invoiceNum") String invoiceNum, @Param("proctorAgendaId") Long proctorAgendaId, 
      @Param("status") StatusName[] status, Pageable pageable);

  @Query("SELECT cse FROM ActivitySettlement cse WHERE cse.proctorAgendaId = :proctorAgendaId AND cse.status IN (:status)")
  List<ActivitySettlement> findAllByProctorId(@Param("proctorAgendaId") Long proctorAgendaId, @Param("status") StatusName[] status);

  @Modifying
  @Query("DELETE FROM ActivitySettlement cse WHERE cse.id = :id")
  void deleteActivitySettle(@Param("id") Long id);

  @Query("SELECT COALESCE(SUM(acse.invoiceTotal), 0) as total FROM ActivitySettlement acse WHERE acse.proctorAgendaId = :proctorAgendaId AND acse.invoiceCurrency = :invoiceCurrency")
  Double getCurrencyTotal(@Param("proctorAgendaId") Long proctorAgendaId, @Param("invoiceCurrency") Integer invoiceCurrency);
}
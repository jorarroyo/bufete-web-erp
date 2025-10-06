package com.bufete.backend.repository.recordFiles;

import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.recordFiles.ProctorAgendaDetail;
import com.bufete.backend.model.recordFiles.ProctorAgendaDetailView;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProctorAgendaDetailRepository extends JpaRepository<ProctorAgendaDetail, Long> {

  @Query("SELECT cse FROM ProctorAgendaDetailView cse WHERE cse.proctorAgendaId = :agendaId AND cse.status IN (:status)")
  List<ProctorAgendaDetailView> findCaseActivityByProctorAgendaId(@Param("agendaId") Long agendaId, @Param("status") StatusName[] status);

  @Query("SELECT cse FROM ProctorAgendaDetail cse WHERE cse.caseActivityId = :caseId AND cse.status <> :status")
  Optional<ProctorAgendaDetail> findProctorDetailByCaseActivityId(@Param("caseId") Long caseId, @Param("status") StatusName status);

  @Query("SELECT cse.caseActivityId FROM ProctorAgendaDetail cse WHERE cse.proctorAgendaId = :agendaId AND cse.status = :status")
  List<Long> findProctorDetailIdsByProctorAgendaId(@Param("agendaId") Long agendaId, @Param("status") StatusName status);

  @Modifying
  @Query("UPDATE ProctorAgendaDetail cse SET cse.status = :newStatus WHERE cse.proctorAgendaId = :id AND cse.status = :status")
  int proctorAgendaActivityStatusChange(@Param("id") Long id, @Param("status") StatusName status, @Param("newStatus") StatusName newStatus);

  @Modifying
  @Query("DELETE FROM ProctorAgendaDetail pad WHERE pad.proctorAgendaId = :proctorAgendaId")
  void unAssignProctorDetail(@Param("proctorAgendaId") Long proctorAgendaId);
}
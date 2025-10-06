package com.bufete.backend.repository.recordFiles;

import java.util.Date;
import java.util.List;

import com.bufete.backend.model.recordFiles.CaseActivity;
import com.bufete.backend.model.recordFiles.CaseActivityView;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CaseActivityRepository extends JpaRepository<CaseActivity, Long> {

  @Query("SELECT cse FROM CaseActivityView cse WHERE cse.fileNum LIKE %:searchText% AND cse.status NOT IN (:status) AND cse.position NOT IN (:positions)")
  Page<CaseActivityView> getPagedCaseActivityView(@Param("status") StatusName[] status, @Param("positions") Long[] positions, @Param("searchText") String searchText, Pageable pageable);

  @Query("SELECT cse FROM CaseActivityView cse WHERE cse.recordFileId = :recordId AND cse.status IN (:status) ORDER BY cse.assignDate ASC")
  List<CaseActivityView> findAllByIdAndStatus(@Param("recordId") Long recordId, @Param("status") StatusName[] status);

  @Query("SELECT cse FROM CaseActivityView cse WHERE cse.recordFileId = :recordId AND cse.status = :status AND cse.assignDate = :assignDate")
  List<CaseActivityView> findAllByIdAndStatusAndAssignDate(@Param("recordId") Long recordId, @Param("status") StatusName status, @Param("assignDate") Date assignDate);

  @Query("SELECT cse FROM CaseActivityView cse WHERE cse.status = :status")
  List<CaseActivityView> findAllByStatus(@Param("status") StatusName status);

  @Query("SELECT cse FROM CaseActivityView cse")
  List<CaseActivityView> findAllView();

  @Query("SELECT cse FROM CaseActivityView cse WHERE cse.recordFileId = :recordId AND cse.status = :status AND cse.employeeId = :employeeId")
  List<CaseActivityView> findAllByIdAndStatusAndEmployeeId(@Param("recordId") Long recordId, @Param("status") StatusName status, @Param("employeeId") Long employeeId);

  @Query("SELECT cse FROM CaseActivityView cse WHERE cse.proctorAgendaId = :agendaId AND cse.status IN (:status)")
  List<CaseActivityView> findCaseActivityByProctorAgendaId(@Param("agendaId") Long agendaId, @Param("status") StatusName[] status);

  @Query("SELECT cse FROM CaseActivityView cse WHERE cse.proctorAgendaId IS NULL AND cse.status IN (:status)")
  List<CaseActivityView> findAllUnassignedList(@Param("status") StatusName[] status);

  @Query("SELECT cse FROM CaseActivityView cse WHERE cse.id IN (:ids)")
  List<CaseActivityView> findByListId(@Param("ids") List<Long> ids);

  @Query("SELECT cse FROM CaseActivityView cse WHERE cse.id = :id")
  CaseActivityView findViewById(@Param("id") Long id);

  @Modifying
  @Query("UPDATE CaseActivity ca SET ca.proctorAgendaId = :id, ca.employeeId = :employeeId, ca.assignDate = :assignDate WHERE ca.id IN (:ids)")
  int assignActivity(@Param("id") Long id, @Param("employeeId") Long employeeId, @Param("assignDate") Date assignDate, @Param("ids") Long[] ids);

  @Modifying
  @Query("UPDATE CaseActivity ca SET ca.proctorAgendaId = NULL, ca.employeeId = NULL, ca.assignDate = NULL WHERE ca.proctorAgendaId = :proctorAgendaId")
  int unAssignActivity(@Param("proctorAgendaId") Long proctorAgendaId);

  @Modifying
  @Query("UPDATE CaseActivity ca SET ca.proctorAgendaId = NULL, ca.employeeId = NULL, ca.assignDate = NULL WHERE ca.id IN (:ids)")
  int unAssignActivityByActivityId(@Param("ids") Long[] ids);

  @Modifying
  @Query("UPDATE CaseActivity ca SET ca.status = :status WHERE ca.id IN (:ids)")
  int caseActivityStatusChange(@Param("ids") Long[] ids, @Param("status") StatusName status);

  @Query("SELECT cse FROM CaseActivityView cse WHERE cse.employeeId = :employeeId AND cse.status = :status")
  List<CaseActivityView> findAllByEmployeeIdAndAssignDate(@Param("employeeId") Long employeeId, @Param("status") StatusName status);

  @Modifying
  @Query("UPDATE CaseActivity ca SET ca.recordFileId = :recordFileId WHERE ca.id = :id")
  void caseActChangeRecord(@Param("id") Long id, @Param("recordFileId") Long recordFileId);

  @Modifying
  @Query("UPDATE CaseActivity ca SET ca.recordFileId = :newRecordFileId WHERE ca.recordFileId = :recordFileId AND ca.status IN :status")
  void updateCaseActRecordFileReference(@Param("newRecordFileId") Long newRecordFileId, @Param("recordFileId") Long recordFileId, @Param("status") StatusName[] status);
}
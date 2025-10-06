package com.bufete.backend.repository.recordFiles;

import com.bufete.backend.model.recordFiles.ProctorAgenda;
import com.bufete.backend.model.recordFiles.ProctorAgendaView;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProctorAgendaRepository  extends JpaRepository<ProctorAgenda, Long> {

  @Query("SELECT pa FROM ProctorAgendaView pa WHERE pa.employeeName LIKE %:searchText%")
  Page<ProctorAgendaView> findPagedProctorAgendaView(@Param("searchText") String searchText, Pageable pageable);

  @Query("SELECT pa FROM ProctorAgendaView pa WHERE pa.id = :id")
  ProctorAgendaView findProctorViewById(@Param("id") Long id);

  @Modifying
  @Query("UPDATE ProctorAgenda SET agendaInvoiceAmountLocal = agendaInvoiceAmountLocal + :invoiceAmountLocal, agendaInvoiceAmountOuter = agendaInvoiceAmountOuter + :invoiceAmountOuter WHERE id = :proctorAgendaId")
  void updateInvoiceAmount(@Param("invoiceAmountLocal") Double invoiceAmountLocal, @Param("invoiceAmountOuter") Double invoiceAmountOuter, @Param("proctorAgendaId") Long proctorAgendaId);

  @Modifying
  @Query("UPDATE ProctorAgenda SET agendaReturnAmountLocal = agendaReturnAmountLocal + :invoiceReturnLocal, agendaReturnAmountOuter = agendaReturnAmountOuter + :invoiceReturnOuter WHERE id = :proctorAgendaId")
  void updateInvoiceReturn(@Param("invoiceReturnLocal") Double invoiceReturnLocal, @Param("invoiceReturnOuter") Double invoiceReturnOuter, @Param("proctorAgendaId") Long proctorAgendaId);
}
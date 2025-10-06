package com.bufete.backend.repository.inventory;

import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.inventory.StampInventory;
import com.bufete.backend.model.inventory.StampInventoryView;
import com.bufete.backend.model.inventory.StampReportView;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StampInvRepository extends JpaRepository<StampInventory, Long> {

  @Query("SELECT siv FROM StampInventoryView siv WHERE siv.status NOT IN (:status) AND (siv.inventoryTypeName LIKE %:searchText% OR siv.requesterName LIKE %:searchText%)")
  Page<StampInventoryView> getAllInventoryView(@Param("searchText") String searchText, @Param("status") StatusName[] status, Pageable pageable);

  @Query("SELECT siv FROM StampInventoryView siv WHERE siv.fileRecordId = :recordId AND siv.requestType IN (:requestType) AND siv.status IN (:status)")
  List<StampInventoryView> getInventoryByRecordId(@Param("recordId") Long recordId, @Param("requestType") Integer[] requestType, @Param("status") StatusName[] status);

  @Modifying
  @Query("UPDATE StampInventory inv SET inv.status = :status WHERE inv.id = :id")
  int stampInvStatusChange(@Param("id") Long id, @Param("status") StatusName status);

  @Query("SELECT srv FROM StampReportView srv WHERE srv.fileRecordId = :recordId AND srv.status NOT IN (:status)")
  List<StampReportView> getInvReportByRecordId(@Param("recordId") Long recordId, @Param("status") StatusName[] status);

  @Query("SELECT srv FROM StampInventoryView srv WHERE srv.id = :id")
  Optional<StampInventoryView> getInvViewById(@Param("id") Long id);

  @Modifying
  @Query("UPDATE StampInventory SET recordId = :newRecordId WHERE recordId = :recordId AND status IN :status")
  void updateRecordFileReference(@Param("newRecordId") long newRecordId, @Param("recordId") long recordId, @Param("status") StatusName[] status);
}
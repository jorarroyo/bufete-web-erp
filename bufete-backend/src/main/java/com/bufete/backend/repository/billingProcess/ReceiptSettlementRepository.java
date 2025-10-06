package com.bufete.backend.repository.billingProcess;

import com.bufete.backend.model.billingProcess.*;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.billingProcess.AttorneyFeesTotal;
import com.bufete.backend.payload.billingProcess.ExpensesFeesTotal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReceiptSettlementRepository extends JpaRepository<ReceiptSettlement, Long> {

    @Query("SELECT rsvw FROM ReceiptSettlementView rsvw WHERE rsvw.clientName LIKE %:search% AND rsvw.status NOT IN (:notStatus)")
    Page<ReceiptSettlementView> getPagedReceiptSettlement(@Param("search") String search, @Param("notStatus") StatusName[] notStatus, Pageable pageable);

    @Query("SELECT frsv FROM FeesReceiptSettlementView frsv WHERE frsv.entityId = :id")
    List<FeesReceiptSettlementView> getFeesByClientId(@Param("id") Long id);

    @Query("SELECT arsv FROM ActivitiesReceiptSettlementView arsv WHERE arsv.entityId = :id")
    List<ActivitiesReceiptSettlementView> getActivitiesByClientId(@Param("id") Long id);

    @Query("SELECT srsv FROM StampsReceiptSettlementView srsv WHERE srsv.entityId = :id")
    List<StampsReceiptSettlementView> getStampsByClientId(@Param("id") Long id);

    @Query("SELECT ersv FROM ExpensesReceiptSettlementView ersv WHERE ersv.entityId = :id")
    List<ExpensesReceiptSettlementView> getExpensesByClientId(@Param("id") Long id);

    @Query("SELECT NEW com.bufete.backend.payload.billingProcess.AttorneyFeesTotal(frsv.employeeId, SUM(frsv.activityTime)) " +
            "FROM FeesReceiptSettlementView frsv WHERE frsv.id IN (:ids) GROUP BY frsv.employeeId")
    List<AttorneyFeesTotal> getAttorneyTotal(@Param("ids") Long[] ids);

    @Query("SELECT SUM(arsv.total * arsv.exchangeValue) FROM ActivitiesReceiptSettlementView arsv WHERE arsv.id IN (:ids)")
    Double getActivitiesTotal(@Param("ids") Long[] ids);

    @Query("SELECT SUM(srsv.total) FROM StampsReceiptSettlementView srsv WHERE srsv.id IN (:ids)")
    Double getStampsTotal(@Param("ids") Long[] ids);

    @Query("SELECT ersv.conceptName as conceptName, SUM(ersv.exchangeValue * ersv.total) as total " +
            "FROM ExpensesReceiptSettlementView ersv WHERE ersv.id IN (:ids) GROUP BY ersv.conceptName")
    List<ExpensesFeesTotal> getExpansesTotal(@Param("ids") Long[] ids);
}

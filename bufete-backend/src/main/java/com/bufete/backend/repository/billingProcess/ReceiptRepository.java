package com.bufete.backend.repository.billingProcess;

import com.bufete.backend.model.billingProcess.Receipt;
import com.bufete.backend.model.billingProcess.ReceiptReport;
import com.bufete.backend.model.billingProcess.ReceiptView;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
    @Query("SELECT rv FROM ReceiptView rv WHERE (rv.clientName LIKE %:search% OR rv.nit LIKE %:search% OR rv.serialNumber LIKE %:search%) AND rv.status NOT IN (:notStatus)")
    Page<ReceiptView> getPagedReceipts(@Param("search") String search, @Param("notStatus") StatusName[] notStatus, Pageable pageable);

    @Query("SELECT r FROM Receipt r WHERE r.receiptSettlementId = :id AND r.status NOT IN (:notStatus)")
    Optional<Receipt> findByReceiptSettlementId(@Param("id") Long id, @Param("notStatus") StatusName[] notStatus);

    @Query("SELECT rr FROM ReceiptReport rr WHERE rr.receiptSearchDate BETWEEN :beginDate AND :endDate " +
            "AND rr.status IN (:notStatus)")
    List<ReceiptReport> getReceiptsByDate(@Param("beginDate") Date beginDate, @Param("endDate") Date endDate,
                                          @Param("notStatus") StatusName[] notStatus);

    @Query("SELECT rr FROM ReceiptReport rr WHERE rr.receiptSearchDate BETWEEN :beginDate AND :endDate " +
            "AND rr.invoiceSeriesId = :invoiceId AND rr.status IN (:notStatus)")
    List<ReceiptReport> getReceiptsByDateAndInvoice(@Param("beginDate") Date beginDate, @Param("endDate") Date endDate,
                                          @Param("invoiceId") Long invoiceId, @Param("notStatus") StatusName[] notStatus);
}

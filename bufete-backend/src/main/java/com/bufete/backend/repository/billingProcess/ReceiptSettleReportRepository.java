package com.bufete.backend.repository.billingProcess;

import com.bufete.backend.model.billingProcess.ReceiptSettlementReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReceiptSettleReportRepository extends JpaRepository<ReceiptSettlementReport, Long> {

    @Query("SELECT rsr FROM ReceiptSettlementReport rsr WHERE rsr.receiptSettlementId = :id")
    Optional<ReceiptSettlementReport> getReportInfoById(@Param("id") Long id);
}

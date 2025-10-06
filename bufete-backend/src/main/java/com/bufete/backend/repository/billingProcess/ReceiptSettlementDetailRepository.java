package com.bufete.backend.repository.billingProcess;

import com.bufete.backend.model.billingProcess.ReceiptSettlementDetail;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReceiptSettlementDetailRepository extends JpaRepository<ReceiptSettlementDetail, Long> {
    @Query("SELECT rsdr FROM ReceiptSettlementDetail rsdr WHERE rsdr.receiptSettlement.id = :id AND rsdr.status = :status")
    List<ReceiptSettlementDetail> getByParentId(@Param("id") Long id, @Param("status") StatusName status);

    @Modifying
    @Query("DELETE FROM ReceiptSettlementDetail rsd WHERE rsd.receiptSettlement.id = :id")
    void deleteAllById(@Param("id") Long id);
}

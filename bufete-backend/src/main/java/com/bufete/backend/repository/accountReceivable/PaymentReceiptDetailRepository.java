package com.bufete.backend.repository.accountReceivable;

import com.bufete.backend.model.accountReceivable.PaymentReceiptDetail;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentReceiptDetailRepository extends JpaRepository<PaymentReceiptDetail, Long> {
    @Query("SELECT prd FROM PaymentReceiptDetail prd WHERE prd.paymentReceipt.id = :parentId AND prd.status IN (:status)")
    List<PaymentReceiptDetail> findAllByParentId(@Param("parentId") Long parentId, @Param("status") StatusName[] status);
}

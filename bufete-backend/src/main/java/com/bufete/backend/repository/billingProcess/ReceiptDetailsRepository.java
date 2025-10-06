package com.bufete.backend.repository.billingProcess;

import com.bufete.backend.model.billingProcess.ReceiptDetail;
import com.bufete.backend.model.accountReceivable.ReceiptsPaymentDetail;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReceiptDetailsRepository extends JpaRepository<ReceiptDetail, Long> {

    @Query("SELECT rd FROM ReceiptDetail rd WHERE rd.receipt.id = :parentId AND rd.status = :status")
    List<ReceiptDetail> findAllByParentId(@Param("parentId") Long parentId, @Param("status")StatusName status);

    @Query("SELECT rpd FROM ReceiptsPaymentDetail rpd WHERE rpd.clientId = :clientId AND rpd.currencyId = :currencyId AND (:paymentId IS NULL OR rpd.paymentReceiptId = :paymentId) ORDER BY rpd.receiptDate DESC")
    List<ReceiptsPaymentDetail> findAllPaymentDetailsById(@Param("clientId") Long clientId, @Param("currencyId") Long currencyId, @Param("paymentId") Long paymentId);
}

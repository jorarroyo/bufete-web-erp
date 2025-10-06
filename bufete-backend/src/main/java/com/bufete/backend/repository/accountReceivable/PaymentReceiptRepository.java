package com.bufete.backend.repository.accountReceivable;

import com.bufete.backend.model.accountReceivable.PaymentReceipt;
import com.bufete.backend.model.accountReceivable.PaymentReceiptView;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentReceiptRepository extends JpaRepository<PaymentReceipt, Long> {
    @Query("SELECT prv FROM PaymentReceiptView prv WHERE (prv.clientName LIKE %:search%) AND prv.status NOT IN (:notStatus)")
    Page<PaymentReceiptView> getPagedPaymentReceipts(@Param("search") String search, @Param("notStatus")StatusName[] notStatus, Pageable pageable);
}

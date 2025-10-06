package com.bufete.backend.repository.accountReceivable;

import com.bufete.backend.model.accountReceivable.PaymentTransDet;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentTransDetRepository extends JpaRepository<PaymentTransDet, Long> {
    @Query("SELECT ptd FROM PaymentTransDet ptd WHERE ptd.paymentReceipt.id = :id AND ptd.status = :status")
    List<PaymentTransDet> findByParentId(@Param("id") Long id, @Param("status") StatusName status);
}

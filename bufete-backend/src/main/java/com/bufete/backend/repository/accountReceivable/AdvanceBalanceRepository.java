package com.bufete.backend.repository.accountReceivable;

import com.bufete.backend.model.accountReceivable.AdvanceBalance;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdvanceBalanceRepository extends JpaRepository<AdvanceBalance, Long> {
    @Query("SELECT ab FROM AdvanceBalance ab WHERE ab.paymentReceipt.client.id IN (:clientList) AND ab.status = :status")
    List<AdvanceBalance> getAdvanceBalanceBy(@Param("clientList") Long[] clientList, @Param("status") StatusName status);

    @Query("SELECT ab FROM AdvanceBalance ab WHERE ab.paymentReceipt.id = :id AND ab.status = :status")
    AdvanceBalance getAdvanceBalanceById(@Param("id") Long id, @Param("status") StatusName status);
}

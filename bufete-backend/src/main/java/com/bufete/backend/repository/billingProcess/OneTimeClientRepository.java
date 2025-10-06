package com.bufete.backend.repository.billingProcess;

import com.bufete.backend.model.billingProcess.OneTimeClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OneTimeClientRepository extends JpaRepository<OneTimeClient, Long> {

    @Query("SELECT otc FROM OneTimeClient otc WHERE otc.receiptId = :receiptId")
    Optional<OneTimeClient> getByReceiptId(@Param("receiptId") Long receiptId);
}

package com.bufete.backend.repository.catalogs;

import com.bufete.backend.model.catalogs.Bank;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankRepository extends JpaRepository<Bank, Long> {
    @Query("SELECT b FROM Bank b WHERE b.status = :status")
    List<Bank> findAllByStatus(@Param("status") StatusName status);
}

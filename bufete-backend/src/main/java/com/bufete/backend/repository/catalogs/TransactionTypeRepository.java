package com.bufete.backend.repository.catalogs;

import com.bufete.backend.model.catalogs.TransactionType;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionTypeRepository extends JpaRepository<TransactionType, Long> {
    @Query("SELECT tt FROM TransactionType tt WHERE tt.status = :status")
    List<TransactionType> findAllByStatus(@Param("status")StatusName status);
}

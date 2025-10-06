package com.bufete.backend.repository.billingProcess;

import com.bufete.backend.model.billingProcess.ExpensesDetail;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpenseDetailRepository extends JpaRepository<ExpensesDetail, Long> {

    @Modifying
    @Query("UPDATE ExpensesDetail ed SET ed.status = :status WHERE ed.id IN (:ids)")
    void updateStatusByIds(@Param("ids") Long[] ids, @Param("status") StatusName status);
}

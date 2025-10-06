package com.bufete.backend.repository.billingProcess;

import com.bufete.backend.model.billingProcess.Expenses;
import com.bufete.backend.model.billingProcess.ExpensesView;
import com.bufete.backend.model.billingProcess.ExpenseDetailsView;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expenses, Long> {

    @Query("SELECT ex " +
            "FROM ExpensesView ex " +
            "WHERE (ex.expensesNum LIKE %:searchText% OR ex.providerName LIKE %:searchText% " +
            "OR ex.conceptName LIKE %:searchText%) " +
            "AND ex.status NOT IN (:status)")
    Page<ExpensesView> getPagedExpenses(@Param("searchText") String searchText, StatusName[] status, Pageable pageable);

    @Query("SELECT edv from ExpenseDetailsView edv WHERE edv.expensesId = :expenseId")
    List<ExpenseDetailsView> getExpenseDetailsByExpenseId(@Param("expenseId") Long entityId);
}

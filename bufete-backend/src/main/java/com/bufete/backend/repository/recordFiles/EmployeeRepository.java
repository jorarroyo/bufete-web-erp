package com.bufete.backend.repository.recordFiles;

import java.util.List;

import com.bufete.backend.model.recordFiles.Employee;
import com.bufete.backend.model.recordFiles.EmployeeView;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

  @Query("SELECT ev FROM EmployeeView ev where ev.name LIKE %:searchText%")
  Page<EmployeeView> getPagedEmployeeView(@Param("searchText") String searchText, Pageable pageable);

  @Query("SELECT e from Employee e WHERE e.status = :status")
  List<Employee> getActiveEmployees(@Param("status") StatusName status);

  @Query("SELECT e from Employee e WHERE e.position IN (:positionId) AND e.status = :status")
  List<Employee> findEmployeesByPositionId(@Param("positionId") Long[] positionId, @Param("status") StatusName status);

  @Query("SELECT e.amountPerHour FROM Employee e WHERE e.id = :employeeId")
  Double findAmountByEmployee(@Param("employeeId") Long employeeId);
}
package com.bufete.backend.repository.catalogs;

import java.util.List;

import com.bufete.backend.model.catalogs.RecordType;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RecordTypeRepository extends JpaRepository<RecordType, Long> {
  
  @Query("SELECT rt FROM RecordType rt WHERE rt.status = :status")
  List<RecordType> findRecordTypeByStatus(@Param("status") StatusName status);
}
package com.bufete.backend.repository.catalogs;

import java.util.List;

import com.bufete.backend.model.catalogs.RecordSubType;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RecordSubTypeRepository extends JpaRepository<RecordSubType, Long> {
  
  @Query("SELECT rt FROM RecordSubType rt WHERE rt.recordTypeId = :typeId AND rt.status = :status")
  List<RecordSubType> findRecordSubTypeByStatus(@Param("typeId") Long typeId, @Param("status") StatusName status);
}
package com.bufete.backend.repository.recordFiles;

import com.bufete.backend.model.recordFiles.RecordFileDetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordFileDetailRepository extends JpaRepository<RecordFileDetail, Long> {

  @Query("SELECT rfd.entityId FROM RecordFileDetail rfd WHERE rfd.entityType = :entityType AND rfd.fileRecordId = :fileRecordId")
  Long[] findDetailByEntityTypeAndRecordFileId(@Param("entityType") Integer entityType, @Param("fileRecordId") Long fileRecordId);

  @Modifying
  @Query("DELETE FROM RecordFileDetail rfd WHERE rfd.fileRecordId =:id")
  void deleteRecordFileDetails(@Param("id") Long id);
}
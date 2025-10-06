package com.bufete.backend.repository.recordFiles;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.recordFiles.RecordFile;
import com.bufete.backend.model.recordFiles.RecordFileSearchView;
import com.bufete.backend.model.recordFiles.RecordFileView;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordFileRepository extends JpaRepository<RecordFile, Long> {

  @Query("SELECT cfv FROM RecordFileView cfv WHERE cfv.fileNum LIKE %:searchText% OR cfv.clientName LIKE %:searchText% " +
          "OR cfv.subject LIKE %:searchText%  OR cfv.openingDate LIKE %:searchText%  OR cfv.modified LIKE %:searchText% " +
          " OR cfv.type LIKE %:searchText%")
  Page<RecordFileView> getPagedRecordFileView(@Param("searchText") String searchText, Pageable pageable);

  @Query("SELECT cfv FROM RecordFileView cfv WHERE cfv.status = :status")
  List<RecordFileView> getRecordFileViewByStatus(@Param("status") StatusName status);

  @Query("SELECT rf FROM RecordFile rf WHERE rf.id = (SELECT MAX(rf.id) FROM RecordFile rf)")
  Optional<RecordFile> findTopById();

  @Query("SELECT rf.fileNum FROM RecordFile rf WHERE rf.id = :id")
  String getFileNumById(@Param("id") Long id);

  @Query("SELECT cfv FROM RecordFileView cfv WHERE cfv.fileNum LIKE %:searchText% AND cfv.status IN :status")
  Page<RecordFileView> getPagedRecordFileSearch(@Param("searchText") String searchText, @Param("status") StatusName[] status, Pageable pageable);

  @Query(value = "SELECT getClientsName(:id)", nativeQuery = true)
  String getClientNamesById(@Param("id") Long id);

  @Query("SELECT rfsv FROM RecordFileSearchView rfsv WHERE rfsv.openingDate BETWEEN :firstDate AND :lastDate AND rfsv.status = :status")
  List<RecordFileSearchView> findByDateAndStatus(@Param("firstDate") Date firstDate, @Param("lastDate") Date lastDate,@Param("status") StatusName status);

  @Query("SELECT rfsv FROM RecordFileSearchView rfsv WHERE rfsv.status = :status")
  List<RecordFileSearchView> findAllSearchView(@Param("status") StatusName status);

  @Modifying
  @Query("UPDATE RecordFile SET status = :status WHERE id = :recordFileId")
  void updateRecordFileStatus(@Param("recordFileId") Long recordFileId, @Param("status") StatusName status);
}
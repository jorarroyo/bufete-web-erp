package com.bufete.backend.repository.fileManager;

import java.util.List;

import com.bufete.backend.model.fileManager.FileManager;
import com.bufete.backend.model.fileManager.FileManagerView;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FileManagerRepository extends JpaRepository<FileManager, Long> {

  @Query("SELECT fmv FROM FileManagerView fmv WHERE fmv.entityId = :entityId AND fmv.entityType = :entityType AND fmv.status = :status")
  List<FileManagerView> findAllView(@Param("entityId") Long entityId, @Param("entityType") Integer entityType, @Param("status") StatusName status);

  @Modifying
  @Query("UPDATE FileManager SET entityId = :newEntityId WHERE entityId = :entityId AND status = :status")
  void updateEntityReference(@Param("newEntityId") Long newEntityId, @Param("entityId") Long entityId, @Param("status") StatusName status);
}
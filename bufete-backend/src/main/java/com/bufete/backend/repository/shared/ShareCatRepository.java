package com.bufete.backend.repository.shared;

import java.util.List;

import com.bufete.backend.model.shared.SharedCatalog;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareCatRepository extends JpaRepository<SharedCatalog, Long> {

  @Query("SELECT sc FROM SharedCatalog sc WHERE sc.type = :type AND sc.status = :status AND sc.parentId = :parentId")
  List<SharedCatalog> getAllCatalogs(@Param("type") Integer type, @Param("status") StatusName status, @Param("parentId") Long parentId);
}
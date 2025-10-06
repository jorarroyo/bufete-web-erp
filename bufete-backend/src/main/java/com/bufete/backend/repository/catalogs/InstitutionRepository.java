package com.bufete.backend.repository.catalogs;

import java.util.List;

import com.bufete.backend.model.catalogs.Institution;
import com.bufete.backend.model.catalogs.InstitutionView;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {

  @Query("SELECT ins FROM InstitutionView ins")
  List<InstitutionView> findAllView();

  @Query("SELECT ins FROM Institution ins WHERE ins.status = :status")
  List<Institution> findInstitutionsByStatus(@Param("status") StatusName status);
}
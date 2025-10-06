package com.bufete.backend.repository.catalogs;

import com.bufete.backend.model.catalogs.Concept;
import com.bufete.backend.model.catalogs.ConceptView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConceptRepository extends JpaRepository<Concept, Long> {

    @Query("SELECT cpv FROM ConceptView cpv")
    List<ConceptView> findAllView();

    @Query("SELECT cp FROM Concept cp WHERE (cp.code LIKE %:search% OR cp.name LIKE %:search%) AND cp.status = 'ACTIVO'")
    List<Concept> searchConcept(@Param("search") String search);
}

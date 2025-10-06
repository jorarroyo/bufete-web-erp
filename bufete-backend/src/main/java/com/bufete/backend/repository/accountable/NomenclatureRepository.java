package com.bufete.backend.repository.accountable;

import com.bufete.backend.model.accountable.Nomenclature;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.accountable.NomenclatureResponseList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NomenclatureRepository extends JpaRepository<Nomenclature, Long> {

    @Query("SELECT nom FROM Nomenclature nom WHERE nom.status = :status AND nom.parentNode IS NULL")
    List<Nomenclature> findAllByStatus(@Param("status") StatusName status);

    @Query("SELECT nom FROM Nomenclature nom WHERE nom.status = :status")
    List<Nomenclature> findAllByStatusAndParentNode(@Param("status") StatusName status);

    @Query("SELECT nom FROM Nomenclature nom WHERE (nom.code LIKE %:search% OR nom.name LIKE %:search%) AND nom.status = :status")
    List<Nomenclature> searchNom(@Param("search") String search, @Param("status") StatusName status);

    @Query("SELECT nom FROM Nomenclature nom WHERE nom.code = :code AND nom.parentNode.id = :parentId")
    Optional<Nomenclature> checkRepeated(@Param("code") String code, @Param("parentId") Long parentId);
}

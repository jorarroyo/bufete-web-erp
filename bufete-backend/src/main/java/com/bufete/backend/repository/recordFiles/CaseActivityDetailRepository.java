package com.bufete.backend.repository.recordFiles;

import com.bufete.backend.model.recordFiles.CaseActivityDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaseActivityDetailRepository extends JpaRepository<CaseActivityDetail, Long> {
    @Query("SELECT cad FROM CaseActivityDetail cad WHERE cad.caseActivityId = :id")
    List<CaseActivityDetail> getCaseActivityDetailByCaseActivityId(@Param("id") Long id);

    @Modifying
    @Query("DELETE FROM CaseActivityDetail cad WHERE cad.id = :Id")
    void deleteCaseActivityDetailById(@Param("Id") Long Id);
}

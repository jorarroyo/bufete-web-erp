package com.bufete.backend.repository.shared;

import java.util.Optional;

import com.bufete.backend.model.shared.PersonalInfo;
import com.bufete.backend.payload.shared.PersonalInfoRequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalInfoRepository extends JpaRepository<PersonalInfo, Long> {

    @Query("SELECT NEW com.bufete.backend.payload.shared.PersonalInfoRequest("
            + "pi.id, pi.sexType, pi.birthday, pi.docType, pi.docNum, pi.docEmmit, pi.lawyer, pi.observation, pi.lawyerAssistant, pi.lawyerJr) "
            + "FROM PersonalInfo pi WHERE pi.entityId = :entityId AND pi.entityType = :entityType")
    Optional<PersonalInfoRequest> getPersonalInfoByEntity(@Param("entityId") Long entityId,
            @Param("entityType") Integer entityType);
}
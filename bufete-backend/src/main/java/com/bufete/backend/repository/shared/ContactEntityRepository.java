package com.bufete.backend.repository.shared;

import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.shared.ContactEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactEntityRepository extends JpaRepository<ContactEntity, Long> {

  @Query("SELECT ct FROM ContactEntity ct WHERE ct.entityId = :entityId AND ct.entityType = :entityType")
  List<ContactEntity> getContactByEntityList(@Param("entityId") Long entityId,
      @Param("entityType") Integer entityType);

  @Query("SELECT ct FROM ContactEntity ct WHERE ct.entityId = :entityId AND ct.entityType = :entityType")
  Optional<ContactEntity> getContactByEntity(@Param("entityId") Long entityId,
      @Param("entityType") Integer entityType);
}
package com.bufete.backend.repository.inventory;

import com.bufete.backend.model.inventory.StampDutyAction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StampDutyActionRepository extends JpaRepository<StampDutyAction, Long> {

  
}
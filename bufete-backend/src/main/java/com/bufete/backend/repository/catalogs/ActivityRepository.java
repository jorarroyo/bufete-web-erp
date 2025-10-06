package com.bufete.backend.repository.catalogs;

import java.util.List;

import com.bufete.backend.model.catalogs.Activity;
import com.bufete.backend.model.catalogs.ActivityView;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

  @Query("SELECT ac FROM ActivityView ac")
  List<ActivityView> findAllView();

  @Query("SELECT ac FROM Activity ac WHERE ac.status = :status")
  List<Activity> findActivitiesByStatus(@Param("status") StatusName status);
}
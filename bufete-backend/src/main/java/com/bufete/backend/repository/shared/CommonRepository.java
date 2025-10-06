package com.bufete.backend.repository.shared;

import java.util.List;

import com.bufete.backend.model.shared.Municipality;
import com.bufete.backend.payload.shared.LocationResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonRepository extends JpaRepository<Municipality, Long> {

  @Query("SELECT NEW com.bufete.backend.payload.shared.LocationResponse(mu.id, CONCAT(mu.name, ', ', mu.department.name)) FROM Municipality mu")
  List<LocationResponse> getAllDeptos();

  @Query("SELECT NEW com.bufete.backend.payload.shared.LocationResponse(co.id, co.countryName) FROM Country co")
  List<LocationResponse> getAllCountries();

}
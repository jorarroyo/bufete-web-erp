package com.bufete.backend.repository.appConfig;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.bufete.backend.model.appConfig.Configuration;

@Repository
public interface ConfigRepository extends JpaRepository<Configuration, Long> {

  Optional<Configuration> findByName(String configName);
}
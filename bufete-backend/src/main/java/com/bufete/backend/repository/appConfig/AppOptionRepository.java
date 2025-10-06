package com.bufete.backend.repository.appConfig;

import java.util.Optional;

import com.bufete.backend.model.appConfig.AppOption;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppOptionRepository extends JpaRepository<AppOption, Long> {

  Optional<AppOption> findByName(String optionName);

}
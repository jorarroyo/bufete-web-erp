package com.bufete.backend.repository.appConfig;

import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.appConfig.Currency;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Long> {

  Optional<Currency> findByName(String concurrencyName);

  @Query("SELECT cu FROM Currency cu WHERE cu.status = 'ACTIVO'")
  List<Currency> getCurrencyActive();
}
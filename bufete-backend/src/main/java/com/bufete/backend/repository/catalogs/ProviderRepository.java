package com.bufete.backend.repository.catalogs;

import com.bufete.backend.model.catalogs.Provider;
import com.bufete.backend.model.catalogs.ProviderView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProviderRepository extends JpaRepository<Provider, Long> {

    @Query("SELECT prv FROM ProviderView prv")
    List<ProviderView> findAllView();

    @Query("SELECT pr FROM Provider pr WHERE (pr.code LIKE %:search% OR pr.name LIKE %:search%) AND pr.status = 'ACTIVO'")
    List<Provider> searchProvider(@Param("search") String search);
}

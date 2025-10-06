package com.bufete.backend.repository.billingProcess;

import com.bufete.backend.model.billingProcess.InvoiceSerie;
import com.bufete.backend.model.billingProcess.InvoiceSerieView;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InvoiceSerieRepository extends JpaRepository<InvoiceSerie, Long> {
    @Query("SELECT ivs FROM InvoiceSerieView ivs WHERE (ivs.serieName LIKE %:search% OR ivs.serieValue LIKE %:search%) AND ivs.status NOT IN (:notStatus)")
    Page<InvoiceSerieView> getPagedInvoiceSeries(@Param("search") String search, @Param("notStatus") StatusName[] notStatus, Pageable pageable);

}

package com.bufete.backend.repository.inventory;

import com.bufete.backend.model.inventory.ProductMovView;
import com.bufete.backend.model.inventory.ProductMovement;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductMovRepository extends JpaRepository<ProductMovement, Long> {

  @Query("SELECT pmv FROM ProductMovView pmv WHERE (pmv.requestDate like %:searchText% OR pmv.requesterName LIKE %:searchText% OR pmv.fileNum LIKE %:searchText%) AND pmv.productId = :productId")
  Page<ProductMovView> getProdMovViewByProdId(@Param("searchText") String searchText, @Param("productId") Long productId, Pageable pageable);
}
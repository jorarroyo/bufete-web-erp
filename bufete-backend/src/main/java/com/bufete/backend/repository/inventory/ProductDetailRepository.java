package com.bufete.backend.repository.inventory;

import java.util.List;

import com.bufete.backend.model.inventory.ProductDetail;
import com.bufete.backend.model.inventory.ProductDetailView;
import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {

  @Query("SELECT pd FROM ProductDetail pd WHERE pd.productId = :productId")
  List<ProductDetail> findDetailByProductId(@Param("productId") Long productId);

  @Query("SELECT pdv FROM ProductDetailView pdv WHERE pdv.productType = :productType AND pdv.status = :status AND pdv.productId = :productId")
  List<ProductDetailView> getDetailViewByTypeAndStatusAndProdId(@Param("productType") ProductType productType, @Param("status") StatusName status, @Param("productId") Long productId);
}
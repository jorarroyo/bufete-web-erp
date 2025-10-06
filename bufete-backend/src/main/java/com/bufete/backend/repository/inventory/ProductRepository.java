package com.bufete.backend.repository.inventory;

import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.inventory.Product;
import com.bufete.backend.model.inventory.ProductProperty;
import com.bufete.backend.model.inventory.ProductView;
import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  @Query("SELECT pd FROM ProductView pd WHERE pd.productInvType = :productInvType AND (pd.productCode LIKE %:searchText% OR pd.productName LIKE %:searchText%) AND pd.status = :status")
  Page<ProductView> getAllProductView(@Param("searchText") String searchText, @Param("productInvType") ProductType productInvType, @Param("status") StatusName status, Pageable pageable);

  @Query("SELECT pp FROM ProductProperty pp WHERE pp.productType = :productType AND pp.status = :status")
  List<ProductProperty> getProdPropertyByTypeAndStatus(@Param("productType") ProductType productType, @Param("status") StatusName status);

  @Modifying
  @Query("UPDATE Product prod SET prod.status = :status WHERE prod.id = :id")
  int productStatusChange(@Param("id") Long id, @Param("status") StatusName status);

  @Query("SELECT pd FROM ProductView pd WHERE pd.productInvType = :productInvType AND pd.status = :status")
  List<ProductView> getProductViewByTypeAndByStatus(@Param("productInvType") ProductType productInvType, @Param("status") StatusName status);

  @Query("SELECT pd FROM ProductView pd WHERE pd.id = :id")
  Optional<ProductView> getProductViewById(@Param("id") Long id);

  @Modifying
  @Query("UPDATE Product prod SET prod.productExistence = prod.productExistence + :productExistence WHERE prod.id = :id")
  int productUpdateExistence(@Param("id") Long id, @Param("productExistence") Double productExistence);

}
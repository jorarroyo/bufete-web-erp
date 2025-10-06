package com.bufete.backend.repository.inventory;

import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.inventory.StampInvDetail;
import com.bufete.backend.model.inventory.StampInvDetailView;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StampInvDetailRepository extends JpaRepository<StampInvDetail, Long> {

  @Query("SELECT sidv FROM StampInvDetailView sidv WHERE sidv.inventoryId = :inventoryId AND sidv.status = :status")
  List<StampInvDetailView> getDetailViewByInventory(@Param("inventoryId") Long inventoryId, @Param("status") StatusName status);

  @Modifying
  @Query("DELETE FROM StampInvDetail WHERE id = :id")
  int deleteStampInvDetailById(@Param("id") Long id);

  @Query("SELECT sidv FROM StampInvDetailView sidv WHERE sidv.id = :id")
  Optional<StampInvDetailView> getDetailViewById(@Param("id") Long id);
}
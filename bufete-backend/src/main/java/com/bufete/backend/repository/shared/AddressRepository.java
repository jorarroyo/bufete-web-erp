package com.bufete.backend.repository.shared;

import java.util.List;
import java.util.Optional;

import com.bufete.backend.model.shared.Address;
import com.bufete.backend.model.shared.AddressView;
import com.bufete.backend.model.shared.StatusName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

  @Query("SELECT ad FROM Address ad WHERE ad.entityId = :entityId AND ad.entityType = :entityType AND ad.status = :status")
  List<Address> getAddressesByEntity(@Param("entityId") Long entityId, @Param("entityType") Integer entityType,
      @Param("status") StatusName status);

  @Query("SELECT adv FROM AddressView adv WHERE adv.entityId = :entityId AND adv.entityType = :entityType")
  List<AddressView> getAddressesViewByEntity(@Param("entityId") Long entityId, @Param("entityType") Integer entityType);

  @Query("SELECT adv FROM AddressView adv WHERE adv.id = :id")
  Optional<AddressView> getAddressesViewById(@Param("id") Long id);
}
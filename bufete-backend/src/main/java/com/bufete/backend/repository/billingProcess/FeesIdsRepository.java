package com.bufete.backend.repository.billingProcess;

import com.bufete.backend.model.billingProcess.FeesReceiptSettlementIds;
import com.bufete.backend.model.shared.ReceiptSettlementType;
import com.bufete.backend.model.shared.StatusName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeesIdsRepository extends JpaRepository<FeesReceiptSettlementIds, Long> {

    @Query("SELECT frs.objectId FROM FeesReceiptSettlementIds frs " +
            "WHERE frs.feesReceiptSettlement.id = :id " +
            "AND frs.objectType = :type AND frs.status = :status")
    List<Long> getFeesIds(@Param("id") Long id, @Param("type")ReceiptSettlementType type,
                          @Param("status") StatusName status);

    @Query("SELECT frs FROM FeesReceiptSettlementIds frs " +
            "WHERE frs.feesReceiptSettlement.id = :id " +
            "AND frs.status = :status")
    List<FeesReceiptSettlementIds> getAllFeesById(@Param("id") Long id, @Param("status") StatusName status);

    @Query("SELECT frs.id FROM FeesReceiptSettlementIds frs " +
            "WHERE frs.feesReceiptSettlement.id = :id " +
            "AND frs.objectId NOT IN (:objectIds) " +
            "AND frs.objectType = :type AND frs.status = :status")
    List<Long> getUnusedFeesIds(@Param("id") Long id, @Param("objectIds") Long[] objectIds,
                                @Param("type")ReceiptSettlementType type,
                                @Param("status") StatusName status);

    @Query("SELECT frs.objectId FROM FeesReceiptSettlementIds frs " +
            "WHERE frs.objectType = :type AND frs.status = :status")
    List<Long> getFeesAssignedIds(@Param("type")ReceiptSettlementType type, @Param("status") StatusName status);

    @Query("SELECT frs.objectId FROM FeesReceiptSettlementIds frs " +
            "WHERE frs.feesReceiptSettlement.id <> :id " +
            "AND frs.objectType = :type AND frs.status = :status")
    List<Long> getFeesIdsBySettleId(@Param("id") Long id, @Param("type")ReceiptSettlementType type,
                          @Param("status") StatusName status);

    @Query("SELECT frs.id FROM FeesReceiptSettlementIds frs " +
            "INNER JOIN CaseActivity ca ON ca.id = frs.objectId AND frs.objectType = :type " +
            "WHERE ca.employeeId = :employeeId AND frs.feesReceiptSettlement.id = :id")
    List<Long> getAttorneyFees(@Param("type") ReceiptSettlementType type, @Param("employeeId") Long employeeId,
            @Param("id") Long id);

    @Modifying
    @Query("UPDATE FeesReceiptSettlementIds SET status = :status WHERE id IN (:ids)")
    void setFeesIdsStatus(@Param("status") StatusName status, @Param("ids") Long[] ids);

    @Modifying
    @Query("UPDATE FeesReceiptSettlementIds SET status = :status WHERE objectType = :type AND feesReceiptSettlement.id = :id")
    void updateFeesIdsStatus(@Param("status") StatusName status, @Param("type") ReceiptSettlementType type,
                             @Param("id") Long id);

}

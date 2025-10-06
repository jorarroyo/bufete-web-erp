package com.bufete.backend.payload.billingProcess;

import com.bufete.backend.model.shared.ReceiptSettlementType;
import com.bufete.backend.model.shared.StatusName;

import java.util.List;

public class FeesChangeStatusList {
    private Long[] ids;
    private ReceiptSettlementType receiptSettlementType;
    private StatusName status;

    public FeesChangeStatusList(Long[] ids, ReceiptSettlementType receiptSettlementType, StatusName status) {
        this.ids = ids;
        this.receiptSettlementType = receiptSettlementType;
        this.status = status;
    }

    public FeesChangeStatusList() {
    }

    public Long[] getIds() {
        return ids;
    }

    public void setIds(Long[] ids) {
        this.ids = ids;
    }

    public ReceiptSettlementType getReceiptSettlementType() {
        return receiptSettlementType;
    }

    public void setReceiptSettlementType(ReceiptSettlementType receiptSettlementType) {
        this.receiptSettlementType = receiptSettlementType;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }
}

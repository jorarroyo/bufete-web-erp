package com.bufete.backend.payload.inventory;

import com.bufete.backend.model.shared.StatusName;

import java.io.Serializable;
import java.util.List;

public class StampInvStatusResponse implements Serializable {
    private Long id;
    private StatusName status;
    private List<StampInvListResponse> list;

    public StampInvStatusResponse(Long id, StatusName status, List<StampInvListResponse> list) {
        this.id = id;
        this.status = status;
        this.list = list;
    }

    public StampInvStatusResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StatusName getStatus() {
        return status;
    }

    public void setStatus(StatusName status) {
        this.status = status;
    }

    public List<StampInvListResponse> getList() {
        return list;
    }

    public void setList(List<StampInvListResponse> list) {
        this.list = list;
    }
}

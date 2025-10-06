package com.bufete.backend.service.shared;

import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.model.shared.StatusHistory;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.shared.StatusFlowResponse;
import com.bufete.backend.payload.shared.StatusHistoryResponse;
import com.bufete.backend.repository.shared.StatusFlowRepository;
import com.bufete.backend.repository.shared.StatusHistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusService {

  @Autowired
  private StatusHistoryRepository statusHistoryRepository;

  @Autowired
  private StatusFlowRepository statusFlowRepository;

  public List<StatusFlowResponse> getNextStatus(Integer entityType) {
    return statusFlowRepository.findByEntityType(entityType).stream().map(stflw -> {
      return new StatusFlowResponse(stflw.getId(), stflw.getPrevStatus(), stflw.getNextStatus());
    }).collect(Collectors.toList());
  }

  public List<StatusHistoryResponse> getStatusHistory(Long entityId, Integer entityType) {
    return statusHistoryRepository.findByIdAndType(entityId, entityType).stream().map(sthst -> {
      return new StatusHistoryResponse(sthst.getId(), sthst.getComment(), sthst.getCreated(), sthst.getPrevStatus() + " -> " + sthst.getNextStatus());
    }).collect(Collectors.toList());
  }

  public StatusHistory changeStatus(StatusHistory statusHistory) {
    return statusHistoryRepository.save(statusHistory);
  }

  public String getStatusFlowPrivilege(Integer entityType, StatusName nextStatus) {
    return statusFlowRepository.findPrivilegeByEntityType(entityType, nextStatus);
  }
}
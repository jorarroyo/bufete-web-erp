package com.bufete.backend.controller.shared;

import java.util.List;

import com.bufete.backend.payload.shared.StatusFlowResponse;
import com.bufete.backend.payload.shared.StatusHistoryResponse;
import com.bufete.backend.service.shared.StatusService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/status")
public class StatusController {

  @Autowired
  private StatusService statusService;

  @GetMapping("/history/{entityId}/{entityType}")
  public List<StatusHistoryResponse> getStatusHistory(@PathVariable Long entityId, @PathVariable Integer entityType) {
      return statusService.getStatusHistory(entityId, entityType);
  }

  @GetMapping("/list/{entityType}")
  public List<StatusFlowResponse> getStatusFlow(@PathVariable Integer entityType) {
    return statusService.getNextStatus(entityType);
  }
  
}
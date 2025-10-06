package com.bufete.backend.controller.inventory;

import javax.validation.Valid;

import com.bufete.backend.payload.inventory.StampDutyListResponse;
import com.bufete.backend.payload.inventory.StampDutyRequest;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.inventory.StampDutyService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/stamp_duty")
public class StampDutyController {

  @Autowired
  private StampDutyService stampDutyService;

  @GetMapping
  @Secured({ RoleConstants.TIMBRE_FISCAL_INVENTARIO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public PagedResponse<StampDutyListResponse> getStampDutyPaged(@CurrentUser UserPrincipal currentUser,
  @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
  @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
  @RequestParam(value = "searchText", defaultValue = "") String searchText,
  @RequestParam(value = "sort", defaultValue = "assignDate") String sort,
  @RequestParam(value = "direction", defaultValue = "desc") String direction) {
    return stampDutyService.getStampDutyPaged(currentUser, page, size, searchText, sort, direction);
  }

  @PostMapping
  @Secured({ RoleConstants.TIMBRE_FISCAL_INVENTARIO_CREA, RoleConstants.USUARIO_ADMIN })
  public Long createStampDuty(@Valid @RequestBody StampDutyRequest stampDutyRequest) {
    return stampDutyService.createStampDuty(stampDutyRequest);
  }
}
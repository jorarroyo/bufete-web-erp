package com.bufete.backend.controller.inventory;

import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.payload.inventory.*;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.inventory.StampInventoryService;
import com.bufete.backend.service.recordFiles.EmployeeService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/stamp_inv")
public class StampInvController {

  @Autowired
  private StampInventoryService stampInventoryService;

  @Autowired
  private EmployeeService employeeService;

  @GetMapping
  @Secured({ RoleConstants.TIMBRE_FISCAL_INVENTARIO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public PagedResponse<StampInvListResponse> getProductPaged(@CurrentUser UserPrincipal currentUser,
  @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
  @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
  @RequestParam(value = "searchText", defaultValue = "") String searchText,
  @RequestParam(value = "sort", defaultValue = "assignDate") String sort,
  @RequestParam(value = "direction", defaultValue = "desc") String direction) {
    return stampInventoryService.getStampInvPaged(currentUser, page, size, searchText, sort, direction);
  }

  @PostMapping
  @Secured({ RoleConstants.TIMBRE_FISCAL_INVENTARIO_CREA, RoleConstants.TIMBRE_FISCAL_INVENTARIO_EDITA, RoleConstants.USUARIO_ADMIN })
  public StampInvResponse createStampDuty(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody StampInvRequest stampInvRequest)
      throws Exception {
    if (stampInvRequest.getRequesterId() == null) {
      stampInvRequest.setRequesterId(employeeService.getEmployee(currentUser.getEmployeeId()).getId());
    }
    Long newStamp = stampInventoryService.createStampInv(stampInvRequest, false);
    // Validate if stampInv is an authorized request
    if (stampInvRequest.getRequestType() == AppConstants.REQUEST && stampInvRequest.getStatus() == StatusName.FINALIZADO) {
      StampInvRequest newRequest = stampInvRequest;
      newRequest.setRequestType(AppConstants.INVENTORY_OUT);
      newRequest.setId(null);
      stampInventoryService.createStampInv(newRequest, true);
    }
    return stampInventoryService.getStampInvById(newStamp);
  }

  @PostMapping("/re-entry")
  @Secured({ RoleConstants.TIMBRE_FISCAL_INVENTARIO_CREA, RoleConstants.TIMBRE_FISCAL_INVENTARIO_EDITA, RoleConstants.USUARIO_ADMIN })
  public StampInvResponse createReEntryStampDuty(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody StampInvRequest stampInvRequest)
      throws Exception {
    if (stampInvRequest.getRequesterId() == null) {
      stampInvRequest.setRequesterId(employeeService.getEmployee(currentUser.getEmployeeId()).getId());
    }
    StampInvRequest newStamp = stampInventoryService.updateStampInv(stampInvRequest);
    // Validate if stampInv is an authorized request
    newStamp.setRequestType(AppConstants.INVENTORY_IN);
    newStamp.setId(null);
    Long newId = stampInventoryService.createStampInv(newStamp, true);
    return stampInventoryService.getStampInvById(newId);
  }

  @GetMapping("/{stampInvId}")
  @Secured({ RoleConstants.TIMBRE_FISCAL_INVENTARIO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public StampInvResponse getInventoryById(@PathVariable Long stampInvId) {
    return stampInventoryService.getStampInvById(stampInvId);
  }

  @PatchMapping
  @Secured({ RoleConstants.TIMBRE_FISCAL_INVENTARIO_CAMBIA_ESTADO, RoleConstants.TIMBRE_FISCAL_INVENTARIO_AUTORIZA, RoleConstants.USUARIO_ADMIN })
  public void statusChange(@Valid @RequestBody StatusHistoryRequest changeStatusRequests) throws Exception {
    stampInventoryService.changeStatus(changeStatusRequests);
  }

  @GetMapping("/list-view/{recordId}")
  @Secured({ RoleConstants.TIMBRE_FISCAL_INVENTARIO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public StampInvStatusResponse getInventoryByRecordId(@PathVariable Long recordId) {
    return stampInventoryService.getInventoryByRecordId(recordId);
  }

  @GetMapping("/report/{recordId}")
  @Secured({ RoleConstants.TIMBRE_FISCAL_INVENTARIO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<StampInvReport> getInvReportByRecordId(@PathVariable Long recordId) {
    return stampInventoryService.getInvReportByRecordId(recordId);
  }

  @PatchMapping("/move_to")
  @Secured({ RoleConstants.TIMBRE_FISCAL_INVENTARIO_CREA, RoleConstants.TIMBRE_FISCAL_INVENTARIO_EDITA, RoleConstants.USUARIO_ADMIN })
  public void moveStampInvToRecordFile(@Valid @RequestBody StampInvMoveToRequest request) {
    stampInventoryService.moveStampInvToRecordFile(request);
  }
}
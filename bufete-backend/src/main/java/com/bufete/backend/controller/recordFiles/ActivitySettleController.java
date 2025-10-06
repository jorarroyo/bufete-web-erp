package com.bufete.backend.controller.recordFiles;

import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.payload.recordFiles.ActivitySettleListResponse;
import com.bufete.backend.payload.recordFiles.ActivitySettleResponseList;
import com.bufete.backend.payload.recordFiles.ActivitySettlementRequest;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.recordFiles.ActivitySettlementService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/activity_settle")
public class ActivitySettleController {

  @Autowired
  private ActivitySettlementService activitySettlementService;

  @GetMapping
  @Secured({ RoleConstants.AGENDA_LIQUIDACION_LECTURA, RoleConstants.USUARIO_ADMIN })
  public PagedResponse<ActivitySettleResponseList> getActivitiesSettle(@CurrentUser UserPrincipal currentUser,
      @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
      @RequestParam(value = "proctorAgendaId", defaultValue = "") Long proctorAgendaId,
      @RequestParam(value = "searchText", defaultValue = "") String searchText,
      @RequestParam(value = "sort", defaultValue = "") String sort,
      @RequestParam(value = "direction", defaultValue = "") String direction) {
    return activitySettlementService.getActivitySettlePage(currentUser, page, size, searchText, proctorAgendaId, sort, direction);  
  }

  @GetMapping("/list/{proctorAgendaId}")
  public List<ActivitySettleResponseList> getActivitySettleByProctorId(@PathVariable Long proctorAgendaId) {
    return activitySettlementService.findAllByProctorId(proctorAgendaId);
  }

  @PostMapping
  @Secured({ RoleConstants.AGENDA_LIQUIDACION_CREA, RoleConstants.USUARIO_ADMIN })
  public List<ActivitySettleResponseList> createActivitySettle(@Valid @RequestBody ActivitySettlementRequest request) {
    activitySettlementService.createActivitySettle(request);
    return activitySettlementService.findAllByProctorId(request.getProctorAgendaId());
  }

  @GetMapping("/{detailId}")
  @Secured({ RoleConstants.AGENDA_LIQUIDACION_LECTURA, RoleConstants.USUARIO_ADMIN })
  public ActivitySettleListResponse getActiveSettleDetail(@PathVariable Long detailId) {
    return activitySettlementService.getActivitySettlementById(detailId);
  }

  @DeleteMapping("/{activitySettleId}/{proctorAgendaId}")
  @Secured({ RoleConstants.AGENDA_LIQUIDACION_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<ActivitySettleResponseList> deleteActivitySettle(@PathVariable Long activitySettleId, @PathVariable Long proctorAgendaId) {
    activitySettlementService.deleteActivitySettle(activitySettleId);
    return activitySettlementService.findAllByProctorId(proctorAgendaId); 
  }

}
package com.bufete.backend.controller.recordFiles;

import java.text.ParseException;
import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.recordFiles.*;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.recordFiles.CaseActivityService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/case_activity")
public class CaseActivityController {

  @Autowired
  private CaseActivityService caseActivityService;

  @GetMapping
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public PagedResponse<CaseActivityResponse> getCaseActivities(@CurrentUser UserPrincipal currentUser,
      @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
      @RequestParam(value = "search", defaultValue = "") String search,
      @RequestParam(value = "sort", defaultValue = "") String sort,
      @RequestParam(value = "direction", defaultValue = "") String direction) {
    return caseActivityService.getCaseActivityPaged(currentUser, page, size, search, sort, direction);
  }

  @GetMapping("/list_by_record/{recordId}")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public CaseActivityListResponde getAllActivities(@PathVariable Long recordId)
      throws ParseException {
    return caseActivityService.getCaseActivityList(recordId);
  }

  @GetMapping("/list/{params}")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public CaseActivityListResponde getAllActivitiesByStatus(@PathVariable String params) {
    return caseActivityService.getCaseActivityListByStatus(params);
  }

  @GetMapping("/unassigned")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<CaseActivityResponse> getAllUnassignedActivities() {
    return caseActivityService.getUnassignedActivities();
  }

  @GetMapping("/assigned/{proctorAgendaId}")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<CaseActivityResponse> getAllAssignedActivities(@PathVariable Long proctorAgendaId) {
    StatusName statusIn [] = {StatusName.FINALIZADO};
    return caseActivityService.getCaseActivitiesByProctorAgendaId(proctorAgendaId, statusIn);
  }

  @GetMapping("/printable/{proctorAgendaId}")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<CaseActivityResponse> getAllAssignedActivitiesToPrint(@PathVariable Long proctorAgendaId) {
    StatusName statusIn [] = {StatusName.UTILIZADO, StatusName.FINALIZADO};
    return caseActivityService.getCaseActivitiesByProctorAgendaId(proctorAgendaId, statusIn);
  }

  @GetMapping("/list/{employeeId}/{recordId}/{params}")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public CaseActivityListResponde getAllActivities(@PathVariable Long employeeId, @PathVariable Long recordId, @PathVariable String params) {
    return caseActivityService.getCaseActivityListByEmployeeId(employeeId, recordId, params);
  }
  
  @GetMapping("/{caseActivityId}")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public CaseActivityRequest getCaseActivityById(@PathVariable Long caseActivityId) {
    return caseActivityService.getCaseActivityById(caseActivityId);
  }

  @GetMapping("/view/{caseActivityId}")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public CaseActivityResponse getCaseActivityViewById(@PathVariable Long caseActivityId) {
    return caseActivityService.getCaseActivityViewById(caseActivityId);
  }

  @PostMapping
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_CREA, RoleConstants.USUARIO_ADMIN })
  public CaseActivityRequest createCaseActivity(@Valid @RequestBody CaseActivityRequest caseActivityRequest) {
    return caseActivityService.createCaseActivity(caseActivityRequest);
  }

  @DeleteMapping("/{caseActivityId}")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> deleteCaseActivity(@PathVariable Long caseActivityId) {
    caseActivityService.deleteCaseActivity(caseActivityId);
    return ResponseEntity.ok(new ApiResponse(true, "Actividad desasignada con éxito!!!"));
  }

  @PostMapping("/assined_list")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_CREA, RoleConstants.USUARIO_ADMIN })
  public List<CaseActivityResponse> getActivityListByIds(@Valid @RequestBody List<Long> ids) {
    return caseActivityService.getCaseActivityByIds(ids);
  }

  @PostMapping("/available")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<CaseActivityResponse> getAllAvailable(@Valid @RequestBody ActivityAvailableRequest availableRequest) {
    return caseActivityService.getActivitiesByEmployeeIdAndAssignDate(availableRequest.getEmployeeId());
  }

  @PatchMapping("/reasign")
  @Secured({ RoleConstants.EXPEDIENTE_ACTIVIDAD_CREA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> updateActivityFileRecord(@Valid @RequestBody CaseActivityReasignRequest request) throws Exception {
    caseActivityService.updateCaseActivityRecordFile(request);
    return ResponseEntity.ok(new ApiResponse(true, "Actividad reasignada a expediente con éxito!!!"));
  }
}
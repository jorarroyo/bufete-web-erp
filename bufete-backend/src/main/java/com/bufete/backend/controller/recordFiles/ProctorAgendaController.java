package com.bufete.backend.controller.recordFiles;

import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.payload.recordFiles.ProctorAgendaDetailResponse;
import com.bufete.backend.payload.recordFiles.ProctorAgendaListResponse;
import com.bufete.backend.payload.recordFiles.ProctorAgendaRequest;
import com.bufete.backend.payload.recordFiles.ProctorAgendaResponse;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.recordFiles.ProctorAgendaService;
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
@RequestMapping("/api/proctor_agenda")
public class ProctorAgendaController {

  @Autowired
  private ProctorAgendaService proctorAgendaService;

  @GetMapping
  @Secured({ RoleConstants.AGENDA_PROCURADOR_LECTURA, RoleConstants.USUARIO_ADMIN })
  public PagedResponse<ProctorAgendaResponse> getProctorAgendaPage(@CurrentUser UserPrincipal currentUser,
      @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
      @RequestParam(value = "searchText", defaultValue = "") String searchText,
      @RequestParam(value = "sort", defaultValue = "assignDate") String sort,
      @RequestParam(value = "direction", defaultValue = "desc") String direction) {
    return proctorAgendaService.getProctorAgendaPaged(currentUser, page, size, searchText, sort, direction);  
  }

  @GetMapping("/{proctorAgendaId}")
  @Secured({ RoleConstants.AGENDA_PROCURADOR_LECTURA, RoleConstants.USUARIO_ADMIN })
  public ProctorAgendaListResponse getProctorAgendaByID(@PathVariable Long proctorAgendaId) {
    return proctorAgendaService.getProctorAgendaById(proctorAgendaId);
  }

  @PostMapping
  @Secured({ RoleConstants.AGENDA_PROCURADOR_CREA, RoleConstants.AGENDA_PROCURADOR_EDITA, RoleConstants.USUARIO_ADMIN })
  public ProctorAgendaListResponse createProctorAgenda(@Valid @RequestBody ProctorAgendaRequest request)
      throws Exception {
    Long newId = proctorAgendaService.createProctorAgenda(request);
    return proctorAgendaService.getProctorAgendaById(newId);
  }

  @PatchMapping
  @Secured({ RoleConstants.AGENDA_PROCURADOR_CAMBIO_ESTADO, RoleConstants.AGENDA_PROCURADOR_AUTORIZA, RoleConstants.USUARIO_ADMIN })
  public void statusChange(@Valid @RequestBody StatusHistoryRequest changeStatusRequests) throws Exception {
    proctorAgendaService.changeStatus(changeStatusRequests);
  }

  @PatchMapping("/detail")
  @Secured({ RoleConstants.AGENDA_PROCURADOR_CAMBIO_ESTADO, RoleConstants.AGENDA_PROCURADOR_AUTORIZA, RoleConstants.USUARIO_ADMIN })
  public List<ProctorAgendaDetailResponse> statusChangeDetail(@Valid @RequestBody StatusHistoryRequest changeStatusRequests) {
    Long id = proctorAgendaService.changeStatusDetail(changeStatusRequests);
    return proctorAgendaService.getDetailList(id);
  }
}
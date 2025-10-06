package com.bufete.backend.service.recordFiles;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.appConfig.AppConfiguration;
import com.bufete.backend.model.recordFiles.CaseActivity;
import com.bufete.backend.model.recordFiles.ProctorAgenda;
import com.bufete.backend.model.recordFiles.ProctorAgendaDetail;
import com.bufete.backend.model.recordFiles.ProctorAgendaView;
import com.bufete.backend.model.shared.StatusHistory;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.recordFiles.ProctorAgendaActivityRequest;
import com.bufete.backend.payload.recordFiles.ProctorAgendaDetailResponse;
import com.bufete.backend.payload.recordFiles.ProctorAgendaListResponse;
import com.bufete.backend.payload.recordFiles.ProctorAgendaRequest;
import com.bufete.backend.payload.recordFiles.ProctorAgendaResponse;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.repository.appConfig.AppConfigRepository;
import com.bufete.backend.repository.recordFiles.ActivitySettlementRepository;
import com.bufete.backend.repository.recordFiles.CaseActivityRepository;
import com.bufete.backend.repository.recordFiles.ProctorAgendaDetailRepository;
import com.bufete.backend.repository.recordFiles.ProctorAgendaRepository;
import com.bufete.backend.repository.shared.StatusHistoryRepository;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.shared.StatusService;
import com.bufete.backend.util.AppId;
import com.bufete.backend.util.Validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProctorAgendaService {
  //#region Autowired
  @Autowired
  private ProctorAgendaRepository proctorAgendaRepository;

  @Autowired
  private ProctorAgendaDetailRepository proctorAgendaDetailRepository;

  @Autowired
  private CaseActivityRepository caseActivityRepository;

  @Autowired
  private AppConfigRepository appConfigRepository;

  @Autowired
  private StatusService statusService;

  @Autowired
  private StatusHistoryRepository statusHistoryRepository;

  @Autowired
  private ActivitySettlementRepository activitySettlementRepository;

  @Autowired
  private ActivitySettlementService activitySettlementService;
  //#endregion

  public PagedResponse<ProctorAgendaResponse> getProctorAgendaPaged(UserPrincipal currentUser, int page, int size, String searchText, String sort, String direction) {
    Validators.validatePageNumberAndSize(page, size);

    Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, Validators.toCamelCase(sort));
    Page<ProctorAgendaView> proctorAgenda = proctorAgendaRepository.findPagedProctorAgendaView(searchText, pageable);

    if (proctorAgenda.getNumberOfElements() == 0) {
      return new PagedResponse<>(Collections.emptyList(), proctorAgenda.getNumber(), proctorAgenda.getSize(),
          proctorAgenda.getTotalElements(), proctorAgenda.getTotalPages(), proctorAgenda.isLast());
    }

    List<ProctorAgendaResponse> proctorAgendaResponse = proctorAgenda.stream().map(pagd -> {
      return new ProctorAgendaResponse(pagd.getId(), pagd.getEmployeeId(), pagd.getEmployeeName(), pagd.getAssignDate(), pagd.getComment(), pagd.getStatus(), 
          pagd.getProctorAgendaCostLocal(), pagd.getProctorAgendaCostOuter(), pagd.getCreated(), pagd.getModified());
    }).collect(Collectors.toList());

    return new PagedResponse<>(proctorAgendaResponse, proctorAgenda.getNumber(), proctorAgenda.getSize(),
          proctorAgenda.getTotalElements(), proctorAgenda.getTotalPages(), proctorAgenda.isLast());
  }

  public ProctorAgendaListResponse getProctorAgendaById(Long id) {
    ProctorAgendaView proctorView = proctorAgendaRepository.findProctorViewById(id);
    StatusName statusIds [] = {StatusName.ABIERTO, StatusName.PROCESO, StatusName.TERMINADO};
    List<ProctorAgendaDetailResponse> proctorDetailView = proctorAgendaDetailRepository.findCaseActivityByProctorAgendaId(id, statusIds)
      .stream().map(procDet -> {
        return new ProctorAgendaDetailResponse(procDet.getId(), procDet.getActivityName(), procDet.getInstitutionName(), procDet.getAssignDate(), 
          procDet.getStatus(), procDet.getEmployeeName(), procDet.getFileNum(), procDet.getPriority(), procDet.getProctorDetailId(), procDet.getActivityCost(),
          procDet.getComment(), procDet.getCurrencyType(), procDet.getClientName(), procDet.getCheckNumber(), procDet.getCheckAmount());
      }).collect(Collectors.toList());
    ProctorAgendaListResponse response = new ProctorAgendaListResponse(proctorView.getId(), proctorView.getEmployeeId(), proctorView.getEmployeeName(), proctorView.getAssignDate(), 
        proctorView.getComment(), proctorView.getStatus(), proctorView.getProctorAgendaCostLocal(), proctorView.getProctorAgendaCostOuter(), 
        proctorView.getAgendaReturnAmountLocal(), proctorView.getAgendaReturnAmountOuter(), proctorDetailView);
    response.setInvoiceList(activitySettlementService.findAllByProctorId(proctorView.getId()));
    return response;
  }

  @Transactional
  public Long createProctorAgenda(ProctorAgendaRequest proctorAgendaRequest) throws Exception {
    ProctorAgenda newProctorAgenda = new ProctorAgenda(proctorAgendaRequest.getEmployeeId(), proctorAgendaRequest.getAssignDate(), 
          proctorAgendaRequest.getComment(), proctorAgendaRequest.getStatus(), proctorAgendaRequest.getProctorAgendaCostLocal(), Double.valueOf(0), 
          proctorAgendaRequest.getProctorAgendaCostOuter(), Double.valueOf(0), proctorAgendaRequest.getAgendaReturnAmountLocal(), 
          proctorAgendaRequest.getAgendaReturnAmountOuter());
      if (proctorAgendaRequest.getId() != null) {
        newProctorAgenda.setId(proctorAgendaRequest.getId());
        // caseActivityRepository.unAssignActivity(proctorAgendaRequest.getId());
        // proctorAgendaDetailRepository.unAssignProctorDetail(proctorAgendaRequest.getId());
      }
      proctorAgendaRepository.save(newProctorAgenda);
      if (proctorAgendaRequest.getId() == null) {
        Long ids[] = proctorAgendaRequest.getActivityList().stream().map(x -> x.getActivityId()).collect(Collectors.toList()).toArray(Long[]::new);
        caseActivityRepository.assignActivity(newProctorAgenda.getId(), newProctorAgenda.getEmployeeId(), newProctorAgenda.getAssignDate(), ids);
        for (ProctorAgendaActivityRequest activity : proctorAgendaRequest.getActivityList()) {
          ProctorAgendaDetail detail = new ProctorAgendaDetail(newProctorAgenda.getId(), activity.getActivityId(), "", StatusName.ABIERTO, activity.getActivityCost(), activity.getCurrencyType());
          proctorAgendaDetailRepository.save(detail);
        }
        caseActivityRepository.caseActivityStatusChange(ids, StatusName.UTILIZADO);
      }

//    StatusName statusIds [] = {StatusName.ABIERTO, StatusName.PROCESO, StatusName.TERMINADO};
//    List<ProctorAgendaDetailResponse> proctorDetailView = proctorAgendaDetailRepository.findCaseActivityByProctorAgendaId(newProctorAgenda.getId(), statusIds)
//      .stream().map(procDet -> {
//        return new ProctorAgendaDetailResponse(procDet.getId(), procDet.getActivityName(), procDet.getInstitutionName(), procDet.getAssignDate(),
//          procDet.getStatus(), procDet.getEmployeeName(), procDet.getFileNum(), procDet.getPriority(), procDet.getProctorDetailId(), procDet.getActivityCost(),
//          procDet.getComment(), procDet.getCurrencyType(), procDet.getClientName());
//      }).collect(Collectors.toList());
//    ProctorAgendaView proctorView = proctorAgendaRepository.findProctorViewById(newProctorAgenda.getId());
//    return new ProctorAgendaListResponse(proctorView.getId(), proctorView.getEmployeeId(), proctorView.getEmployeeName(), proctorView.getAssignDate(),
//        proctorView.getComment(), proctorView.getStatus(), proctorView.getProctorAgendaCostLocal(), proctorView.getProctorAgendaCostOuter(),
//        proctorView.getAgendaReturnAmountLocal(), proctorView.getAgendaReturnAmountOuter(), proctorDetailView);
    return newProctorAgenda.getId();
  }

  @Transactional(rollbackFor = Exception.class)
  public void changeStatus(StatusHistoryRequest request) throws Exception {
    ProctorAgenda proctorAgenda = proctorAgendaRepository.findById(request.getId())
      .orElseThrow(() -> new ResourceNotFoundException("ProctorAgenda", "id", request.getId()));
    
    StatusHistory history = new StatusHistory(request.getId(), AppId.AGENDA, request.getComment(), proctorAgenda.getStatus(), request.getStatus());
    proctorAgenda.setStatus(request.getStatus());
    if (request.getStatus() == StatusName.CERRADO) {
      Double invoiceTotalLocal = activitySettlementRepository.getCurrencyTotal(request.getId(), 1);
      Double invoiceTotalOuter = activitySettlementRepository.getCurrencyTotal(request.getId(), 2);
      if (invoiceTotalLocal < proctorAgenda.getProctorAgendaCostLocal() || invoiceTotalOuter < proctorAgenda.getProctorAgendaCostOuter()) {
        AppConfiguration appConfig = appConfigRepository.findById(1l)
                .orElseThrow(() -> new ResourceNotFoundException("AppConfig", "id", 1));
        Double differenceLocal = Double.parseDouble(appConfig.getConfigValue());
        appConfig = appConfigRepository.findById(2l)
                .orElseThrow(() -> new ResourceNotFoundException("AppConfig", "id", 2));
        Double differenceOuter = Double.parseDouble(appConfig.getConfigValue());


        Double totalLocal = proctorAgenda.getProctorAgendaCostLocal() - (proctorAgenda.getAgendaReturnAmountLocal() + invoiceTotalLocal);
        Double totalOuter = proctorAgenda.getProctorAgendaCostOuter() - (proctorAgenda.getAgendaReturnAmountOuter() + invoiceTotalOuter);

        if (totalLocal < 0 || totalOuter < 0 || totalLocal > differenceLocal || totalOuter > differenceOuter) {
          throw new Exception("Existe una diferencia mayor a la permitida");
        }
      }
      Long[] activityIds = proctorAgendaDetailRepository.findProctorDetailIdsByProctorAgendaId(request.getId(), StatusName.ABIERTO).stream().toArray(Long[]::new);
      if (activityIds.length > 0) {
        caseActivityRepository.caseActivityStatusChange(activityIds, StatusName.ACTIVO);
      }
      proctorAgendaDetailRepository.proctorAgendaActivityStatusChange(request.getId(), StatusName.ABIERTO, StatusName.SIN_MOVIMIENTO);
    } else if (request.getStatus() == StatusName.ELIMINADO) {
      Long[] activityIds = proctorAgendaDetailRepository.findProctorDetailIdsByProctorAgendaId(request.getId(), StatusName.ABIERTO).stream().toArray(Long[]::new);
      caseActivityRepository.caseActivityStatusChange(activityIds, StatusName.ACTIVO);
      proctorAgendaDetailRepository.proctorAgendaActivityStatusChange(request.getId(), StatusName.ABIERTO, StatusName.SIN_MOVIMIENTO);
    }
    proctorAgendaRepository.save(proctorAgenda);
    statusHistoryRepository.save(history);
  }

  @Transactional(rollbackFor = Exception.class)
  public Long changeStatusDetail(StatusHistoryRequest request) {
    ProctorAgendaDetail proctorAgenda = proctorAgendaDetailRepository.findProctorDetailByCaseActivityId(request.getId(), StatusName.SIN_MOVIMIENTO)
      .orElseThrow(() -> new ResourceNotFoundException("ProctorAgendaDetail", "id", request.getId()));
    
    proctorAgenda.setStatus(request.getStatus());
    proctorAgenda.setComment(request.getComment());
    proctorAgendaDetailRepository.save(proctorAgenda);
    StatusHistory history = new StatusHistory(request.getId(), AppId.AGENDA_DETAIL, request.getComment(), proctorAgenda.getStatus(), request.getStatus());
    statusService.changeStatus(history);
    if (request.getStatus() == StatusName.PROCESO) {
      CaseActivity caseAct = caseActivityRepository.findById(request.getId())
        .orElseThrow(() -> new ResourceNotFoundException("CaseActivity", "id", proctorAgenda.getCaseActivityId()));
      CaseActivity newCase = 
        new CaseActivity(null, caseAct.getActivityId(), caseAct.getInstitutionId(), caseAct.getComment(),
                caseAct.getActivityTime(), request.getAssignDate(), StatusName.ACTIVO, caseAct.getRecordFileId(),
                caseAct.getEmployeeId(), caseAct.getActivityCost(), caseAct.getCurrencyType(), caseAct.getCheckNumber(),
                caseAct.getCheckAmount(), caseAct.getActivityStartDate(), caseAct.getActivityEndDate(),
                caseAct.getCaseActivityType(), caseAct.getActivityName());
      caseActivityRepository.save(newCase);
    }
    Long ids[] = {request.getId()};
    // if (request.getStatus() == StatusName.SIN_MOVIMIENTO) {
    //   caseActivityRepository.caseActivityStatusChange(ids, StatusName.SIN_MOVIMIENTO);
    // } else {  
      caseActivityRepository.caseActivityStatusChange(ids, StatusName.FINALIZADO);
    // }
    return proctorAgenda.getProctorAgendaId();
  }
  
  public List<ProctorAgendaDetailResponse> getDetailList(Long id) {
    StatusName statusIds [] = {StatusName.ABIERTO, StatusName.PROCESO, StatusName.TERMINADO};
    return proctorAgendaDetailRepository.findCaseActivityByProctorAgendaId(id, statusIds)
      .stream().map(procDet -> {
        return new ProctorAgendaDetailResponse(procDet.getId(), procDet.getActivityName(), procDet.getInstitutionName(), procDet.getAssignDate(), 
          procDet.getStatus(), procDet.getEmployeeName(), procDet.getFileNum(), procDet.getPriority(), procDet.getProctorDetailId(), procDet.getActivityCost(),
          procDet.getComment(), procDet.getCurrencyType(), procDet.getClientName(), procDet.getCheckNumber(), procDet.getCheckAmount());
    }).collect(Collectors.toList());
  }
}
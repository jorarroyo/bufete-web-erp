package com.bufete.backend.service.recordFiles;

import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.recordFiles.CaseActivity;
import com.bufete.backend.model.recordFiles.CaseActivityDetail;
import com.bufete.backend.model.recordFiles.CaseActivityView;
import com.bufete.backend.model.recordFiles.Employee;
import com.bufete.backend.model.shared.CaseActivityType;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.recordFiles.*;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.repository.recordFiles.CaseActivityDetailRepository;
import com.bufete.backend.repository.recordFiles.CaseActivityRepository;
import com.bufete.backend.repository.recordFiles.EmployeeRepository;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.Validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CaseActivityService {

  @Autowired
  private CaseActivityRepository caseActivityRepository;

  @Autowired
  private RecordFileService recordFileService;

  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  private CaseActivityDetailRepository caseActivityDetailRepository;

  public CaseActivityListResponde getCaseActivityList(Long recordId) throws ParseException {
    RecordFileRequest recordFile = recordFileService.getRecordFile(recordId);
    StatusName[] statusNames = {StatusName.ACTIVO, StatusName.FINALIZADO};

    List<CaseActivityResponse> 
      list = caseActivityRepository.findAllByIdAndStatus(recordId, statusNames)
      .stream()
//            .filter(f -> f.getCaseActivityType() == CaseActivityType.HONORARIOS)
            .map(caseAct -> {
              List<CaseActivityDetailResponse> detailResponses =
                      caseActivityDetailRepository.getCaseActivityDetailByCaseActivityId(caseAct.getId())
                              .stream()
                              .map(det -> new CaseActivityDetailResponse(det.getId(), det.getEmployee().getId(),
                                      String.join(" ", det.getEmployee().getName(), det.getEmployee().getLastName()))).collect(Collectors.toList());
              return new CaseActivityResponse(caseAct.getId(), caseAct.getActivityName(), caseAct.getInstitutionName(), caseAct.getComment(),
                      caseAct.getActivityTime(), caseAct.getAssignDate(), caseAct.getStatus(), caseAct.getRecordFileId(), caseAct.getEmployeeName(),
                      caseAct.getCreated(), caseAct.getModified(), caseAct.getFileNum(), caseAct.getPriority(), caseAct.getActivityCost(), caseAct.getCurrencyType(),
                      caseAct.getCheckNumber(), caseAct.getCheckAmount(), caseAct.getActivityStartDate(), caseAct.getActivityEndDate(),
                      caseAct.getCaseActivityType(), detailResponses);
            }).collect(Collectors.toList());

    return new CaseActivityListResponde(recordFile.getId(), recordFile.getFileNum(), recordFile.getStatus(), list);
  }

  public CaseActivityListResponde getCaseActivityListByStatus(String param) {
    List<CaseActivityResponse> list = null;
    if (param.equals("active")) {
      list = caseActivityRepository.findAllByStatus(StatusName.ACTIVO)
      .stream().map(caseAct -> {
        List<CaseActivityDetailResponse> detailResponses =
                caseActivityDetailRepository.getCaseActivityDetailByCaseActivityId(caseAct.getId())
                        .stream()
                        .map(det -> new CaseActivityDetailResponse(det.getId(), det.getEmployee().getId(),
                                String.join(" ", det.getEmployee().getName(), det.getEmployee().getLastName()))).collect(Collectors.toList());
        return new CaseActivityResponse(caseAct.getId(), caseAct.getActivityName(), caseAct.getInstitutionName(), caseAct.getComment(), 
          caseAct.getActivityTime(), caseAct.getAssignDate(), caseAct.getStatus(), caseAct.getRecordFileId(), caseAct.getEmployeeName(), 
          caseAct.getCreated(), caseAct.getModified(), caseAct.getFileNum(), caseAct.getPriority(), caseAct.getActivityCost(), caseAct.getCurrencyType(),
          caseAct.getCheckNumber(), caseAct.getCheckAmount(), caseAct.getActivityStartDate(), caseAct.getActivityEndDate(), caseAct.getCaseActivityType(),
                detailResponses);
      }).collect(Collectors.toList());
    } else {
      list = caseActivityRepository.findAllView()
            .stream().map(caseAct -> {
              List<CaseActivityDetailResponse> detailResponses =
                      caseActivityDetailRepository.getCaseActivityDetailByCaseActivityId(caseAct.getId())
                              .stream()
                              .map(det -> new CaseActivityDetailResponse(det.getId(), det.getEmployee().getId(),
                                      String.join(" ", det.getEmployee().getName(), det.getEmployee().getLastName()))).collect(Collectors.toList());
              return new CaseActivityResponse(caseAct.getId(), caseAct.getActivityName(), caseAct.getInstitutionName(), caseAct.getComment(), 
                caseAct.getActivityTime(), caseAct.getAssignDate(), caseAct.getStatus(), caseAct.getRecordFileId(), caseAct.getEmployeeName(), 
                caseAct.getCreated(), caseAct.getModified(), caseAct.getFileNum(), caseAct.getPriority(), caseAct.getActivityCost(), caseAct.getCurrencyType(),
                caseAct.getCheckNumber(), caseAct.getCheckAmount(), caseAct.getActivityStartDate(), caseAct.getActivityEndDate(),
                      caseAct.getCaseActivityType(), detailResponses);
            }).collect(Collectors.toList());
    }
    return new CaseActivityListResponde(Long.parseLong("0"), "", StatusName.ACTIVO, list);
  }

  public CaseActivityListResponde getCaseActivityListByEmployeeId(Long employeeId, Long recordId, String param) {
    RecordFileRequest recordFile = recordFileService.getRecordFile(recordId);

    List<CaseActivityResponse> list = 
      caseActivityRepository.findAllByIdAndStatusAndEmployeeId(recordId, StatusName.ACTIVO, employeeId)
      .stream().map(caseAct -> {
        List<CaseActivityDetailResponse> detailResponses =
                caseActivityDetailRepository.getCaseActivityDetailByCaseActivityId(caseAct.getId())
                        .stream()
                        .map(det -> new CaseActivityDetailResponse(det.getId(), det.getEmployee().getId(),
                                String.join(" ", det.getEmployee().getName(), det.getEmployee().getLastName()))).collect(Collectors.toList());
        return new CaseActivityResponse(caseAct.getId(), caseAct.getActivityName(), caseAct.getInstitutionName(), caseAct.getComment(), 
          caseAct.getActivityTime(), caseAct.getAssignDate(), caseAct.getStatus(), caseAct.getRecordFileId(), caseAct.getEmployeeName(),
          caseAct.getCreated(), caseAct.getModified(), caseAct.getFileNum(), caseAct.getPriority(), caseAct.getActivityCost(), caseAct.getCurrencyType(),
          caseAct.getCheckNumber(), caseAct.getCheckAmount(), caseAct.getActivityStartDate(), caseAct.getActivityEndDate(),
                caseAct.getCaseActivityType(), detailResponses);
      }).collect(Collectors.toList());
    if (param.equals("today")) {
      Format formatter = new SimpleDateFormat("dd/MM/yyyy");
      String today = formatter.format(new Date());
      list = list.stream().filter(caseAct -> formatter.format(caseAct.getAssignDate()) == today).collect(Collectors.toList());
    }
    return new CaseActivityListResponde(recordFile.getId(), recordFile.getFileNum(), recordFile.getStatus(), list);
  }

  public List<CaseActivityResponse> getUnassignedActivities() {
    StatusName statusIn [] = {StatusName.ACTIVO, StatusName.ABIERTO};
    return caseActivityRepository.findAllUnassignedList(statusIn)
    .stream().map(caseAct -> {
      List<CaseActivityDetailResponse> detailResponses =
              caseActivityDetailRepository.getCaseActivityDetailByCaseActivityId(caseAct.getId())
                      .stream()
                      .map(det -> new CaseActivityDetailResponse(det.getId(), det.getEmployee().getId(),
                              String.join(" ", det.getEmployee().getName(), det.getEmployee().getLastName()))).collect(Collectors.toList());
      return new CaseActivityResponse(caseAct.getId(), caseAct.getActivityName(), caseAct.getInstitutionName(), caseAct.getComment(), 
        caseAct.getActivityTime(), caseAct.getAssignDate(), caseAct.getStatus(), caseAct.getRecordFileId(), caseAct.getEmployeeName(),
        caseAct.getCreated(), caseAct.getModified(), caseAct.getFileNum(), caseAct.getPriority(), caseAct.getActivityCost(), caseAct.getCurrencyType(),
        caseAct.getCheckNumber(), caseAct.getCheckAmount(), caseAct.getActivityStartDate(), caseAct.getActivityEndDate(),
              caseAct.getCaseActivityType(), detailResponses);
    }).collect(Collectors.toList());
  }

  @Transactional
  public CaseActivityRequest createCaseActivity(CaseActivityRequest caseActivityRequest) {
    CaseActivity newCase = new CaseActivity(caseActivityRequest.getId(), caseActivityRequest.getActivityId(),
            caseActivityRequest.getInstitutionId(), caseActivityRequest.getComment(), caseActivityRequest.getActivityTime(),
            caseActivityRequest.getAssignDate(), caseActivityRequest.getStatus(), caseActivityRequest.getRecordFileId(),
            caseActivityRequest.getEmployeeId(), caseActivityRequest.getActivityCost(), caseActivityRequest.getCurrencyType(),
            caseActivityRequest.getCheckNumber(), caseActivityRequest.getCheckAmount(), caseActivityRequest.getActivityStartDate(),
            caseActivityRequest.getActivityEndDate(), caseActivityRequest.getCaseActivityType(), caseActivityRequest.getActivityName());
    newCase = caseActivityRepository.save(newCase);
    caseActivityRequest.setId(newCase.getId());
    List<CaseActivityDetailRequest> caseActivityDetailRequests = new ArrayList<>();
    if (caseActivityRequest.getCaseActivityDetailRequest() != null && !caseActivityRequest.getCaseActivityDetailRequest().isEmpty()) {
      CaseActivity finalNewCase = newCase;
      caseActivityRequest.getCaseActivityDetailRequest()
              .stream().forEach(s -> {
                if (s.getId() == null) {
                  Employee employee = employeeRepository.findById(s.getEmployeeId())
                          .orElseThrow(() -> new ResourceNotFoundException("Case Activity Detail", "id", finalNewCase.getId()));
                  var newDetail = new CaseActivityDetail(employee, finalNewCase.getId());
                  caseActivityDetailRepository.save(newDetail);
                  caseActivityDetailRequests.add(new CaseActivityDetailRequest(newDetail.getId(), newDetail.getEmployee().getId(),
                          String.join(" ", newDetail.getEmployee().getName(), newDetail.getEmployee().getLastName()),
                          StatusName.ACTIVO));
                } else {
                  if (s.getStatus() == StatusName.DELETED) {
                    caseActivityDetailRepository.deleteCaseActivityDetailById(s.getId());
                  }
                }
              });
    }
    return caseActivityRequest;
  }

  public CaseActivityRequest getCaseActivityById(Long caseActivityId) {
    CaseActivity caseActivity = caseActivityRepository.findById(caseActivityId)
        .orElseThrow(() -> new ResourceNotFoundException("Case Activity", "id", caseActivityId));
    var detailList = caseActivityDetailRepository.getCaseActivityDetailByCaseActivityId(caseActivityId);
    List<CaseActivityDetailRequest> requestDetail = detailList
            .stream().map(s -> new CaseActivityDetailRequest(s.getId(), s.getEmployee().getId(),
                    String.join(" ", s.getEmployee().getName(), s.getEmployee().getLastName()), StatusName.ACTIVO))
            .collect(Collectors.toList());
    CaseActivityRequest request = new CaseActivityRequest(caseActivity.getId(), caseActivity.getActivityId(), 
            caseActivity.getInstitutionId(), caseActivity.getComment(), caseActivity.getActivityTime(), 
            caseActivity.getAssignDate(), caseActivity.getStatus(), caseActivity.getRecordFileId(), caseActivity.getEmployeeId(), 
            caseActivity.getActivityCost(), caseActivity.getCurrencyType(), caseActivity.getCheckNumber(), 
            caseActivity.getCheckAmount(), caseActivity.getActivityStartDate(), caseActivity.getActivityEndDate(),
            caseActivity.getCaseActivityType(), caseActivity.getActivityName(), requestDetail);
    return request;
  }

  public List<CaseActivityResponse> getCaseActivityByIds(List<Long> caseActivityId) {
    List<CaseActivityView> caseActivity = caseActivityRepository.findByListId(caseActivityId);
    return caseActivity.stream().map(caseAct -> {
      List<CaseActivityDetailResponse> detailResponses =
              caseActivityDetailRepository.getCaseActivityDetailByCaseActivityId(caseAct.getId())
                      .stream()
                      .map(det -> new CaseActivityDetailResponse(det.getId(), det.getEmployee().getId(),
                              String.join(" ", det.getEmployee().getName(), det.getEmployee().getLastName()))).collect(Collectors.toList());
      return new CaseActivityResponse(caseAct.getId(), caseAct.getActivityName(), caseAct.getInstitutionName(), caseAct.getComment(), caseAct.getActivityTime(), 
          caseAct.getAssignDate(), caseAct.getStatus(), caseAct.getRecordFileId(), caseAct.getEmployeeName(), caseAct.getCreated(), caseAct.getModified(), 
          caseAct.getFileNum(), caseAct.getPriority(), caseAct.getActivityCost(), caseAct.getCurrencyType(),
          caseAct.getCheckNumber(), caseAct.getCheckAmount(), caseAct.getActivityStartDate(), caseAct.getActivityEndDate(), caseAct.getCaseActivityType(),
              detailResponses);
    }).collect(Collectors.toList());
  }

  public CaseActivityResponse getCaseActivityViewById(Long caseActivityId) {
    CaseActivityView caseAct = caseActivityRepository.findViewById(caseActivityId);
    List<CaseActivityDetailResponse> detailResponses =
            caseActivityDetailRepository.getCaseActivityDetailByCaseActivityId(caseAct.getId())
                    .stream()
                    .map(det -> new CaseActivityDetailResponse(det.getId(), det.getEmployee().getId(),
                            String.join(" ", det.getEmployee().getName(), det.getEmployee().getLastName()))).collect(Collectors.toList());
    CaseActivityResponse caseResp = new CaseActivityResponse(caseAct.getId(), caseAct.getActivityName(), caseAct.getInstitutionName(), caseAct.getComment(), caseAct.getActivityTime(), 
      caseAct.getAssignDate(), caseAct.getStatus(), caseAct.getRecordFileId(), caseAct.getEmployeeName(), caseAct.getCreated(), caseAct.getModified(), 
      caseAct.getFileNum(), caseAct.getPriority(), caseAct.getActivityCost(), caseAct.getCurrencyType(),
      caseAct.getCheckNumber(), caseAct.getCheckAmount(), caseAct.getActivityStartDate(), caseAct.getActivityEndDate(), caseAct.getCaseActivityType(), detailResponses);
    caseResp.setActivityId(caseAct.getActivityId());
    caseResp.setInstitutionId(caseAct.getInstitutionId());
    caseResp.setEmployeeId(caseAct.getEmployeeId());
    return caseResp;
  }

  public void deleteCaseActivity(Long caseActivityId) {
    CaseActivity caseActivity = caseActivityRepository.findById(caseActivityId)
        .orElseThrow(() -> new ResourceNotFoundException("Case Activity", "id", caseActivityId));
    caseActivity.setStatus(StatusName.ELIMINADO);
    caseActivityRepository.save(caseActivity);
  }

  public PagedResponse<CaseActivityResponse> getCaseActivityPaged(UserPrincipal currentUser, int page, int size,
    String searchText,String sort, String direction) {
    Validators.validatePageNumberAndSize(page, size);

    StatusName[] rejectedStatuses = {StatusName.ELIMINADO};
    Long[] positions = {AppConstants.LAWYER_POSSITION};
    Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, Validators.toCamelCase(sort));
    Page<CaseActivityView> caseActivity = caseActivityRepository.getPagedCaseActivityView(rejectedStatuses, positions, searchText, pageable);

    if (caseActivity.getNumberOfElements() == 0) {
      return new PagedResponse<>(Collections.emptyList(), caseActivity.getNumber(), caseActivity.getSize(),
          caseActivity.getTotalElements(), caseActivity.getTotalPages(), caseActivity.isLast());
    }

    List<CaseActivityResponse> caseActivityResponse = caseActivity.stream().map(caseAct -> {
      List<CaseActivityDetailResponse> detailResponses =
              caseActivityDetailRepository.getCaseActivityDetailByCaseActivityId(caseAct.getId())
                      .stream()
                      .map(det -> new CaseActivityDetailResponse(det.getId(), det.getEmployee().getId(),
                              String.join(" ", det.getEmployee().getName(), det.getEmployee().getLastName()))).collect(Collectors.toList());
      return new CaseActivityResponse(caseAct.getId(), caseAct.getActivityName(), caseAct.getInstitutionName(), caseAct.getComment(), caseAct.getActivityTime(), 
          caseAct.getAssignDate(), caseAct.getStatus(), caseAct.getRecordFileId(), caseAct.getEmployeeName(),
          caseAct.getCreated(), caseAct.getModified(), caseAct.getFileNum(), caseAct.getPriority(), caseAct.getActivityCost(), caseAct.getCurrencyType(),
          caseAct.getCheckNumber(), caseAct.getCheckAmount(), caseAct.getActivityStartDate(), caseAct.getActivityEndDate(), caseAct.getCaseActivityType(),
              detailResponses);
    }).collect(Collectors.toList());

    return new PagedResponse<>(caseActivityResponse, caseActivity.getNumber(), caseActivity.getSize(),
    caseActivity.getTotalElements(), caseActivity.getTotalPages(), caseActivity.isLast());
  }

  public List<CaseActivityResponse> getCaseActivitiesByProctorAgendaId(Long proctorAgendaId, StatusName[] statusIn) {
    return caseActivityRepository.findCaseActivityByProctorAgendaId(proctorAgendaId, statusIn)
      .stream().map(caseAct -> {
              List<CaseActivityDetailResponse> detailResponses =
                      caseActivityDetailRepository.getCaseActivityDetailByCaseActivityId(caseAct.getId())
                              .stream()
                              .map(det -> new CaseActivityDetailResponse(det.getId(), det.getEmployee().getId(),
                                      String.join(" ", det.getEmployee().getName(), det.getEmployee().getLastName()))).collect(Collectors.toList());
        return new CaseActivityResponse(caseAct.getId(), caseAct.getActivityName(), caseAct.getInstitutionName(), caseAct.getComment(), 
          caseAct.getActivityTime(), caseAct.getAssignDate(), caseAct.getStatus(), caseAct.getRecordFileId(), caseAct.getEmployeeName(),
          caseAct.getCreated(), caseAct.getModified(), caseAct.getFileNum(), caseAct.getPriority(), caseAct.getActivityCost(), caseAct.getCurrencyType(),
          caseAct.getCheckNumber(), caseAct.getCheckAmount(), caseAct.getActivityStartDate(), caseAct.getActivityEndDate(), caseAct.getCaseActivityType(),
                detailResponses);
      }).collect(Collectors.toList());
  }

  public List<CaseActivityResponse> getActivitiesByEmployeeIdAndAssignDate(Long employeeId) {
    return caseActivityRepository.findAllByEmployeeIdAndAssignDate(employeeId, StatusName.ACTIVO)
    .stream().map(caseAct -> {
              List<CaseActivityDetailResponse> detailResponses =
                      caseActivityDetailRepository.getCaseActivityDetailByCaseActivityId(caseAct.getId())
                              .stream()
                              .map(det -> new CaseActivityDetailResponse(det.getId(), det.getEmployee().getId(),
                                      String.join(" ", det.getEmployee().getName(), det.getEmployee().getLastName()))).collect(Collectors.toList());
      return new CaseActivityResponse(caseAct.getId(), caseAct.getActivityName(), caseAct.getInstitutionName(), caseAct.getComment(), 
        caseAct.getActivityTime(), caseAct.getAssignDate(), caseAct.getStatus(), caseAct.getRecordFileId(), caseAct.getEmployeeName(),
        caseAct.getCreated(), caseAct.getModified(), caseAct.getFileNum(), caseAct.getPriority(), caseAct.getActivityCost(),
              caseAct.getCurrencyType(), caseAct.getCheckNumber(), caseAct.getCheckAmount(), caseAct.getActivityStartDate(),
              caseAct.getActivityEndDate(), caseAct.getCaseActivityType(), detailResponses);
    }).collect(Collectors.toList());
  }

  @Transactional
  public void updateCaseActivityRecordFile(CaseActivityReasignRequest request) throws Exception {
    caseActivityRepository.caseActChangeRecord(request.getId(), request.getRecordFileId());
  }

  public void updateCaseActRecordFileReference(Long newRecordFileId, Long recordFileId) {
    StatusName[] statusList = { StatusName.ACTIVO, StatusName.FINALIZADO };
    caseActivityRepository.updateCaseActRecordFileReference(newRecordFileId, recordFileId, statusList);
  }
}
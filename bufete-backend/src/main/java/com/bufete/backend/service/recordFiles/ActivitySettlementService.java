package com.bufete.backend.service.recordFiles;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.recordFiles.ActivitySettlement;
import com.bufete.backend.model.recordFiles.ActivitySettlementDetail;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.recordFiles.ActivitySettleDetailRequest;
import com.bufete.backend.payload.recordFiles.ActivitySettleDetailResponse;
import com.bufete.backend.payload.recordFiles.ActivitySettleListResponse;
import com.bufete.backend.payload.recordFiles.ActivitySettleResponseList;
import com.bufete.backend.payload.recordFiles.ActivitySettlementRequest;
import com.bufete.backend.payload.recordFiles.CaseActivityResponse;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.repository.recordFiles.ActivitySettleDetailRepository;
import com.bufete.backend.repository.recordFiles.ActivitySettlementRepository;
import com.bufete.backend.repository.recordFiles.ProctorAgendaRepository;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.util.Validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ActivitySettlementService {

  @Autowired
  private ActivitySettlementRepository activitySettlementRepository;

  @Autowired
  private ActivitySettleDetailRepository activitySettleDetailRepository;

  @Autowired
  private CaseActivityService caseActivityService;

  @Autowired
  private ProctorAgendaRepository proctorAgendaRepository;

  public PagedResponse<ActivitySettleResponseList> getActivitySettlePage(UserPrincipal currentUser, int page, int size,
      String searchText, Long proctorAgendaId, String sort, String direction) {
    Validators.validatePageNumberAndSize(page, size);

    StatusName[] statusIn = { StatusName.ACTIVO, StatusName.ABIERTO };
    Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
        Validators.toCamelCase(sort));
    Page<ActivitySettlement> activitySettle = activitySettlementRepository.getPagedActivitySettle(searchText,
        proctorAgendaId, statusIn, pageable);

    if (activitySettle.getNumberOfElements() == 0) {
      return new PagedResponse<>(Collections.emptyList(), activitySettle.getNumber(), activitySettle.getSize(),
          activitySettle.getTotalElements(), activitySettle.getTotalPages(), activitySettle.isLast());
    }

    List<ActivitySettleResponseList> activitySettleResponse = activitySettle.stream().map(actSt -> {
      return new ActivitySettleResponseList(actSt.getId(), actSt.getComments(), actSt.getInvoiceNum(),
          actSt.getInvoiceRange(), actSt.getInvoiceName(), actSt.getInvoiceDescription(), actSt.getInvoiceTotal(),
          actSt.getStatus(), actSt.getAssignDate(), actSt.getInvoiceType(), actSt.getInvoiceCurrency());
    }).collect(Collectors.toList());
    return new PagedResponse<>(activitySettleResponse, activitySettle.getNumber(), activitySettle.getSize(),
        activitySettle.getTotalElements(), activitySettle.getTotalPages(), activitySettle.isLast());
  }

  public ActivitySettleListResponse getActivitySettlementById(Long id) {
    ActivitySettlement newSettle = activitySettlementRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("ActivitySettlement", "id", id));

    List<ActivitySettleDetailResponse> newDetailRes = new ArrayList<>();
    List<ActivitySettlementDetail> detail = activitySettleDetailRepository.findAllByActivitySettleId(id);
    for (ActivitySettlementDetail activitySettleDetail : detail) {
      CaseActivityResponse caseAct = caseActivityService
          .getCaseActivityViewById(activitySettleDetail.getCaseActivityId());
      newDetailRes.add(new ActivitySettleDetailResponse(activitySettleDetail.getId(),
          activitySettleDetail.getCaseActivityId(), activitySettleDetail.getCostDetail(), caseAct.getActivityName(),
          caseAct.getInstitutionName(), caseAct.getComment(), caseAct.getAssignDate(), caseAct.getActivityTime(),
          caseAct.getStatus(), caseAct.getEmployeeName(), caseAct.getFileNum(), caseAct.getPriority()));
    }

    return new ActivitySettleListResponse(id, newSettle.getComments(), newSettle.getInvoiceNum(),
        newSettle.getInvoiceRange(), newSettle.getInvoiceName(), newSettle.getInvoiceDescription(),
        newSettle.getInvoiceTotal(), newSettle.getStatus(), newSettle.getAssignDate(), newSettle.getProctorAgendaId(),
        newDetailRes);
  }

  @Transactional
  public ActivitySettleListResponse createActivitySettle(ActivitySettlementRequest settlement) {
    ActivitySettlement newSettle = new ActivitySettlement(settlement.getComments(), settlement.getInvoiceNum(),
        settlement.getInvoiceRange(), settlement.getInvoiceName(), settlement.getInvoiceDescription(),
        settlement.getInvoiceTotal(), settlement.getStatus(), settlement.getAssignDate(),
        settlement.getProctorAgendaId(), settlement.getInvoiceType(), settlement.getInvoiceCurrency());
    if (settlement.getId() != null) {
      newSettle.setId(settlement.getId());
    }
    activitySettlementRepository.save(newSettle);
    for (ActivitySettleDetailRequest settleDetail : settlement.getActivityList()) {
      ActivitySettlementDetail detail = new ActivitySettlementDetail(newSettle.getId(),
          settleDetail.getCaseActivityId(), settleDetail.getCostDetail());
      if (settleDetail.getId() != null) {
        detail.setId(settleDetail.getId());
      }

      activitySettleDetailRepository.save(detail);
    }
    proctorAgendaRepository.updateInvoiceAmount(settlement.getInvoiceCurrency() == 1 ? settlement.getInvoiceTotal() : 0,
        settlement.getInvoiceCurrency() == 2 ? settlement.getInvoiceTotal() : 0, settlement.getProctorAgendaId());
    return getActivitySettlementById(newSettle.getId());
  }

  public List<ActivitySettleResponseList> findAllByProctorId(Long proctorAgendaId) {
    StatusName[] statusIn = { StatusName.ACTIVO, StatusName.ABIERTO };
    return activitySettlementRepository.findAllByProctorId(proctorAgendaId, statusIn).stream().map(actSt -> {
      return new ActivitySettleResponseList(actSt.getId(), actSt.getComments(), actSt.getInvoiceNum(),
          actSt.getInvoiceRange(), actSt.getInvoiceName(), actSt.getInvoiceDescription(), actSt.getInvoiceTotal(),
          actSt.getStatus(), actSt.getAssignDate(), actSt.getInvoiceType(), actSt.getInvoiceCurrency());
    }).collect(Collectors.toList());
  }

  @Transactional
  public void deleteActivitySettle(Long activitySettleId) {
    activitySettlementRepository.deleteActivitySettle(activitySettleId);
    activitySettleDetailRepository.deleteActivitySettleDetail(activitySettleId);
  }

}
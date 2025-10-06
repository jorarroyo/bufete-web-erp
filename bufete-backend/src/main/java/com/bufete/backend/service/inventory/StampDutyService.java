package com.bufete.backend.service.inventory;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.bufete.backend.model.inventory.StampDuty;
import com.bufete.backend.model.inventory.StampDutyAction;
import com.bufete.backend.model.inventory.StampDutyView;
import com.bufete.backend.payload.inventory.StampDutyListResponse;
import com.bufete.backend.payload.inventory.StampDutyRequest;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.repository.inventory.StampDutyActionRepository;
import com.bufete.backend.repository.inventory.StampDutyRepository;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.util.Validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StampDutyService {

  @Autowired
  private StampDutyRepository stampDutyRepository;

  @Autowired
  private StampDutyActionRepository stampDutyActionRepository;

  public PagedResponse<StampDutyListResponse> getStampDutyPaged(UserPrincipal currentUser, int page, int size, String searchText, String sort, String direction) {
    Validators.validatePageNumberAndSize(page, size);

    Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, Validators.toCamelCase(sort));
    Page<StampDutyView> stampDuty = stampDutyRepository.findPagedStampDutyView(searchText, pageable);
    
    if (stampDuty.getNumberOfElements() == 0) {
      return new PagedResponse<>(Collections.emptyList(), stampDuty.getNumber(), stampDuty.getSize(), stampDuty.getTotalElements(), stampDuty.getTotalPages(), stampDuty.isLast());
    }

    List<StampDutyListResponse> stampDutyResponse = stampDuty.stream().map(pagd -> {
      return new StampDutyListResponse(pagd.getId(), pagd.getStampTypeName(), pagd.getDesignationTypeName(), pagd.getYear(), pagd.getTotalStampNumber());
    }).collect(Collectors.toList());

    return new PagedResponse<>(stampDutyResponse, stampDuty.getNumber(), stampDuty.getSize(), stampDuty.getTotalElements(), stampDuty.getTotalPages(), stampDuty.isLast());
  }
  
  @Transactional
  public Long createStampDuty(StampDutyRequest stampDutyRequest) {
    Optional<StampDuty> stampDutyValidation = stampDutyRepository.findByTypeAndDesignationAndYear(stampDutyRequest.getStampType(), stampDutyRequest.getDesignationType(), stampDutyRequest.getYear());
    StampDuty stampDuty = null;
    if (stampDutyValidation.isPresent()) {
      stampDuty = stampDutyValidation.get();
      stampDutyRepository.updateTotalStampNumber(stampDutyRequest.getStampNumber(), stampDuty.getId());
    } else {
      stampDuty = new StampDuty(stampDutyRequest.getStampType(), stampDutyRequest.getDesignationType(), stampDutyRequest.getYear(), stampDutyRequest.getStampNumber());
      stampDutyRepository.save(stampDuty);
    }

    StampDutyAction stampDutyAction = new StampDutyAction(stampDuty.getId(), stampDutyRequest.getComment(), stampDutyRequest.getStampNumber(), stampDutyRequest.getPurchaseDate(), 
      stampDutyRequest.getEmployeeId(), stampDutyRequest.getFormNumber(), stampDutyRequest.getFormRange(), stampDutyRequest.getAction(), stampDutyRequest.getActivityId());
    
    stampDutyActionRepository.save(stampDutyAction);
    return stampDuty.getId();
  }

}
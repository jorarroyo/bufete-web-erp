package com.bufete.backend.service.inventory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.inventory.ProductMovement;
import com.bufete.backend.model.inventory.ProductView;
import com.bufete.backend.model.inventory.StampInvDetail;
import com.bufete.backend.model.inventory.StampInvDetailView;
import com.bufete.backend.model.inventory.StampInventory;
import com.bufete.backend.model.inventory.StampInventoryView;
import com.bufete.backend.model.recordFiles.RecordFile;
import com.bufete.backend.model.shared.ActionsName;
import com.bufete.backend.model.shared.ProductType;
import com.bufete.backend.model.shared.StatusHistory;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.inventory.*;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.repository.inventory.ProductMovRepository;
import com.bufete.backend.repository.inventory.ProductRepository;
import com.bufete.backend.repository.inventory.StampInvDetailRepository;
import com.bufete.backend.repository.inventory.StampInvRepository;
import com.bufete.backend.repository.recordFiles.RecordFileRepository;
import com.bufete.backend.security.RoleChecker;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.shared.StatusService;
import com.bufete.backend.util.AppConstants;
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
public class StampInventoryService {

  @Autowired
  private StampInvRepository stampInvRepository;

  @Autowired
  private StampInvDetailRepository stampInvDetailRepository;

  @Autowired
  private ProductMovRepository productMovRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private StatusService statusService;

  @Autowired
  private ProductService productService;

  @Autowired
  private RoleChecker roleChecker;

  @Autowired
  private RecordFileRepository recordFileRepository;

  public PagedResponse<StampInvListResponse> getStampInvPaged(UserPrincipal currentUser, int page, int size, String searchText, String sort, String direction) {
    Validators.validatePageNumberAndSize(page, size);
    StatusName[] statuses = {StatusName.RECHAZADO, StatusName.FINALIZADO};
    Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, Validators.toCamelCase(sort));
    Page<StampInventoryView> stamp = stampInvRepository.getAllInventoryView(searchText, statuses, pageable);
    
    if (stamp.getNumberOfElements() == 0) {
      return new PagedResponse<>(Collections.emptyList(), stamp.getNumber(), stamp.getSize(), stamp.getTotalElements(), stamp.getTotalPages(), stamp.isLast());
    }

    List<StampInvListResponse> stampResponse = stamp.stream().map(stmp -> {
      return new StampInvListResponse(stmp.getId(), stmp.getInventoryTypeName(), stmp.getRequestDate(), stmp.getRequesterName(), stmp.getFileNum(), 
        stmp.getTotal(), stmp.getCreated(), stmp.getStatus(), stmp.getRequestType());
    }).collect(Collectors.toList());

    return new PagedResponse<>(stampResponse, stamp.getNumber(), stamp.getSize(), stamp.getTotalElements(), stamp.getTotalPages(), stamp.isLast());
  }

  @Transactional(rollbackFor = Exception.class)
  public Long createStampInv(StampInvRequest stampInvRequest, boolean cloneDetail) throws Exception {
    StatusName currentStatus = stampInvRequest.getRequestType() == AppConstants.INVENTORY_OUT || stampInvRequest.getRequestType() == AppConstants.INVENTORY_IN ? StatusName.AUTORIZADO : stampInvRequest.getStatus(); 

    StampInventory stamp = 
      new StampInventory(stampInvRequest.getId(), stampInvRequest.getRequestType(), stampInvRequest.getRequesterId(), stampInvRequest.getRequestDate(), 
      stampInvRequest.getReference(), stampInvRequest.getRecordId(), stampInvRequest.getTotal(), ProductType.TIMBRES, currentStatus, stampInvRequest.getReceiptNumber());
    stampInvRepository.save(stamp);
    ActionsName action = stampInvRequest.getRequestType() == AppConstants.INVENTORY_OUT ? ActionsName.SALIDA : ActionsName.ENTRADA; 

    for (StampInvDetailRequest detailRequest : stampInvRequest.getDetailList()) {
      if (detailRequest.getStatus() == StatusName.DELETED) {
        if (detailRequest.getId() != null) {
          stampInvDetailRepository.deleteStampInvDetailById(detailRequest.getId());
        }
      } else {
        if (stampInvRequest.getRequestType() == AppConstants.REQUEST && stampInvRequest.getStatus() == StatusName.FINALIZADO) {
          if (productService.validateExistence(detailRequest.getProductId(), detailRequest.getQuantityRequest())) {
            throw new Exception("No hay suficiente existencia");
          }
        }
        StampInvDetail detail;
        if (cloneDetail) {
          detail = new StampInvDetail(null, stamp.getId(), detailRequest.getProductId(), detailRequest.getQuantityRequest());
        } else {
          detail = new StampInvDetail(detailRequest.getId(), stamp.getId(), detailRequest.getProductId(), detailRequest.getQuantityRequest());
        }
        stampInvDetailRepository.save(detail);
        if (stampInvRequest.getRequestType() == AppConstants.INVENTORY_OUT| stampInvRequest.getRequestType() == AppConstants.INVENTORY_IN) {
          ProductMovement movement = new ProductMovement(detail.getId(), action, detailRequest.getProductId(), detailRequest.getQuantityRequest(), stamp.getId());
          productMovRepository.save(movement);
          productRepository.productUpdateExistence(detailRequest.getProductId(), stampInvRequest.getRequestType() == AppConstants.INVENTORY_OUT ? detailRequest.getQuantityRequest() * -1 : detailRequest.getQuantityRequest());
        }
      }
    }

    return stamp.getId();
  }

  @Transactional(rollbackFor = Exception.class)
  public StampInvRequest updateStampInv(StampInvRequest stampInvRequest) throws Exception {
    Double oldTotal = 0d;
    Double newTotal = 0d;
    for (StampInvDetailRequest detailRequest : stampInvRequest.getDetailList()) {
      Double oldQuantity = 0d;
      StampInvDetailView newDetail = stampInvDetailRepository.getDetailViewById(detailRequest.getId()).orElse(new StampInvDetailView());
      oldQuantity = newDetail.getQuantityRequest() - detailRequest.getQuantityRequest();
      oldTotal += detailRequest.getQuantityRequest() * newDetail.getUnitValue();
      newTotal += oldQuantity * newDetail.getUnitValue();
      if (detailRequest.getStatus() == StatusName.DELETED) {
        if (detailRequest.getId() != null) {
          stampInvDetailRepository.deleteStampInvDetailById(detailRequest.getId());
        }
      } else {
        StampInvDetail detail = new StampInvDetail(detailRequest.getId(), stampInvRequest.getId(), detailRequest.getProductId(), detailRequest.getQuantityRequest());
        stampInvDetailRepository.save(detail);
      }
      detailRequest.setQuantityRequest(oldQuantity);
    }
    StampInventory stamp = 
      new StampInventory(stampInvRequest.getId(), stampInvRequest.getRequestType(), stampInvRequest.getRequesterId(), stampInvRequest.getRequestDate(), 
      stampInvRequest.getReference(), stampInvRequest.getRecordId(), oldTotal, ProductType.TIMBRES, stampInvRequest.getStatus(), 
      stampInvRequest.getReceiptNumber());
    stampInvRepository.save(stamp);
    stampInvRequest.setDetailList(
      stampInvRequest.getDetailList().stream().filter(s -> s.getQuantityRequest() > 0).collect(Collectors.toList())
    );
    stampInvRequest.setTotal(newTotal);
    return stampInvRequest;
  }

  public StampInvResponse getStampInvById(Long id) {
    StampInventoryView inventory = stampInvRepository.getInvViewById(id)
      .orElseThrow(() -> new ResourceNotFoundException("StampInventory", "id", id));
    List<StampInvDetailResponse> detailView = stampInvDetailRepository.getDetailViewByInventory(id, StatusName.ACTIVO).stream().map(det -> {
      return new StampInvDetailResponse(det.getId(), id, det.getProductId(), det.getProductCode(), det.getProductName(), det.getStatus(), det.getUnitValue(), 
        det.getMinQuantity(), det.getProductExistence(), det.getQuantityRequest());
    }).collect(Collectors.toList());

    return new StampInvResponse(inventory.getId(), inventory.getRequestType(), inventory.getRequesterId(), inventory.getRequestDateOriginal(), 
        inventory.getReference(), inventory.getFileRecordId(), inventory.getTotal(), detailView, inventory.getStatus(), inventory.getFileNum(), inventory.getReceiptNumber());
  }

  @Transactional
  public void changeStatus(StatusHistoryRequest request) throws Exception {
    String[] privilege = { "ROLE_USUARIO_ADMIN", "ROLE_" +
        statusService.getStatusFlowPrivilege(AppId.INVENTARIO_TIMBRES, request.getStatus()) };
    if (!roleChecker.hasRole(privilege)) {
      throw new Exception("No posee accesos para realizar esta acción");
    }
    
    StampInventory inventory = stampInvRepository.findById(request.getId())
      .orElseThrow(() -> new ResourceNotFoundException("StampInventory", "id", request.getId()));
    StatusHistory history = new StatusHistory(request.getId(), AppId.INVENTARIO_TIMBRES, request.getComment(), inventory.getStatus(), request.getStatus());
    
    stampInvRepository.stampInvStatusChange(request.getId(), request.getStatus());
    statusService.changeStatus(history);
  }

  public StampInvStatusResponse getInventoryByRecordId(Long recordId) {
    RecordFile recordFile = recordFileRepository.findById(recordId)
            .orElseThrow(() -> new ResourceNotFoundException("RecordFile", "id", recordId));
    Integer[] requestTypes = {AppConstants.REQUEST, AppConstants.INVENTORY_OUT, AppConstants.INVENTORY_IN};
    StatusName[] statuses = {StatusName.ELABORADO, StatusName.PENDIENTE, StatusName.AUTORIZADO};
    List<StampInvListResponse> list = stampInvRepository
      .getInventoryByRecordId(recordId, requestTypes, statuses).stream().map(stmp -> new StampInvListResponse(stmp.getId(), stmp.getInventoryTypeName(), stmp.getRequestDate(), stmp.getRequesterName(), stmp.getFileNum(),
        stmp.getTotal(), stmp.getCreated(), stmp.getStatus(), stmp.getRequestType())).collect(Collectors.toList());

    return new StampInvStatusResponse(recordId, recordFile.getStatus(), list);
  }

  public List<StampInvReport> getInvReportByRecordId(Long recordId) {
    List<ProductView> products = productRepository.getProductViewByTypeAndByStatus(ProductType.TIMBRES, StatusName.ACTIVO);
    StatusName[] statuses = {StatusName.RECHAZADO, StatusName.FINALIZADO};
    var result = stampInvRepository.getInvReportByRecordId(recordId, statuses).stream().map(rpt -> {
      List<String> included = new ArrayList<String>();
      final Double[] totalImport = {0d};
      Integer numSign = rpt.getRequestType() == AppConstants.INVENTORY_IN ? -1 : 1;
      List<StampInvReportDetail> detailViews = stampInvDetailRepository.getDetailViewByInventory(rpt.getId(), StatusName.ACTIVO).stream().map(det -> {
        included.add(det.getProductCode());
        totalImport[0] += det.getQuantityRequest() * det.getUnitValue();
        return new StampInvReportDetail(det.getProductId(), det.getProductCode(), det.getQuantityRequest() * numSign);
      }).collect(Collectors.toList());
      products.stream().forEach(prd -> {
        if (!included.contains(prd.getProductCode())) {
          detailViews.add(new StampInvReportDetail(prd.getId(), prd.getProductCode(), 0d));
        }
      });
      List<StampInvReportDetail> sortedList = detailViews.stream()
        .sorted(Comparator.comparing(StampInvReportDetail::getId))
        .collect(Collectors.toList());
      return new StampInvReport(rpt.getId(), rpt.getRequestDate(), rpt.getRequesterName(), rpt.getFileNum(), rpt.getClientName(), rpt.getReference(),
              totalImport[0] * numSign, rpt.getRequestType(), sortedList);
    }).collect(Collectors.toList());
    return result.stream().filter(s -> s.getRequestType() == AppConstants.INVENTORY_OUT || s.getRequestType() == AppConstants.INVENTORY_IN).collect(Collectors.toList());
  }

  public void updateRecordFileReference(Long newRecordId, Long recordId) {
    StatusName[] statusList = { StatusName.ELABORADO, StatusName.PENDIENTE, StatusName.AUTORIZADO };
    stampInvRepository.updateRecordFileReference(newRecordId, recordId, statusList);
  }

  @Transactional
  public void moveStampInvToRecordFile(StampInvMoveToRequest request) {
    StampInventory stampInventory = stampInvRepository.findById(request.getId())
            .orElseThrow(() -> new ResourceNotFoundException("StampInventoryService", "id", request.getId()));
    stampInventory.setRecordId(request.getRecordId());
    stampInvRepository.save(stampInventory);
  }
}
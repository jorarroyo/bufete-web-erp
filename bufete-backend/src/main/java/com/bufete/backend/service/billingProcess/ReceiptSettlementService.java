package com.bufete.backend.service.billingProcess;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.accountReceivable.AdvanceBalance;
import com.bufete.backend.model.billingProcess.*;
import com.bufete.backend.model.recordFiles.Client;
import com.bufete.backend.model.recordFiles.Employee;
import com.bufete.backend.model.shared.ReceiptSettleEnumType;
import com.bufete.backend.model.shared.ReceiptSettlementType;
import com.bufete.backend.model.shared.StatusHistory;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.accountReceivable.AdvanceBalanceResponse;
import com.bufete.backend.payload.billingProcess.*;
import com.bufete.backend.payload.recordFiles.ChildClientRequest;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.repository.accountReceivable.AdvanceBalanceRepository;
import com.bufete.backend.repository.billingProcess.*;
import com.bufete.backend.repository.recordFiles.CaseActivityRepository;
import com.bufete.backend.repository.recordFiles.ClientRepository;
import com.bufete.backend.repository.recordFiles.EmployeeRepository;
import com.bufete.backend.security.RoleChecker;
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

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReceiptSettlementService {

    @Autowired
    private ReceiptSettlementRepository receiptSettlementRepository;

    @Autowired
    private FeesIdsRepository feesIdsRepository;

    @Autowired
    private ReceiptSettlementDetailRepository receiptSettlementDetailRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private StatusService statusService;

    @Autowired
    private RoleChecker roleChecker;

    @Autowired
    private CaseActivityRepository caseActivityRepository;

    @Autowired
    private ExpenseDetailRepository expenseDetailRepository;

    @Autowired
    private ReceiptSettleReportRepository receiptSettleReportRepository;

    @Autowired
    private ReceiptService receiptService;

    @Autowired
    private AdvanceBalanceRepository advanceBalanceRepository;

    public PagedResponse<ReceiptSettleResponseView> getAllReceiptSettlements(UserPrincipal currentUser, int page, int size,
                                                                             String searchText, String sort, String direction) {
        Validators.validatePageNumberAndSize(page, size);
        StatusName[] disabledStatuses = {StatusName.ELIMINADO};
        Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
                Validators.toCamelCase(sort));
        Page<ReceiptSettlementView> settlement = receiptSettlementRepository.getPagedReceiptSettlement(searchText, disabledStatuses, pageable);

        if (settlement.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), settlement.getNumber(), settlement.getSize(),
                    settlement.getTotalElements(), settlement.getTotalPages(), settlement.isLast());
        }

        List<ReceiptSettleResponseView> response =
                settlement
                        .stream()
                        .map(settle -> new ReceiptSettleResponseView(settle.getId(), settle.getClientName(), settle.getStatus(),
                                settle.getReceiptTotal(), settle.getType(), settle.getCreated(), settle.getModified()))
                .collect(Collectors.toList());

        return new PagedResponse<>(response, settlement.getNumber(), settlement.getSize(),
                settlement.getTotalElements(), settlement.getTotalPages(), settlement.isLast());
    }

    public ReceiptSettlementRequest getReceiptSettlement(Long id) {
        ReceiptSettlement settlement = receiptSettlementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt Settlement", "id", id));

        if (settlement.getFeesReceiptSettlementList() == null) {
            List<FeesReceiptSettlementIds> newFeesList = feesIdsRepository.getAllFeesById(id, StatusName.ACTIVO);
            settlement.setFeesReceiptSettlementList(newFeesList);
        } else {
            settlement.setFeesReceiptSettlementList(
                    settlement.getFeesReceiptSettlementList()
                            .stream()
                            .filter(s -> s.getStatus() == StatusName.ACTIVO)
                            .collect(Collectors.toList()));
        }

        if (settlement.getReceiptSettlementDetailList() == null) {
            settlement.setReceiptSettlementDetailList(receiptSettlementDetailRepository.getByParentId(id, StatusName.ACTIVO));
        } else {
            settlement.setReceiptSettlementDetailList(
                    settlement.getReceiptSettlementDetailList()
                        .stream()
                        .filter(s -> s.getStatus() == StatusName.ACTIVO)
                        .collect(Collectors.toList())
            );
        }

        return new ReceiptSettlementRequest(settlement.getId(), settlement.getClient().getId(), settlement.getStatus(),
                settlement.getReceiptTotal(), settlement.getType(),
                settlement.getFeesReceiptSettlementList()
                        .stream()
                        .filter(f -> f.getObjectType() == ReceiptSettlementType.HONORARIOS)
                        .map(FeesReceiptSettlementIds::getObjectId).toArray(Long[]::new),
                settlement.getFeesReceiptSettlementList()
                        .stream()
                        .filter(f -> f.getObjectType() == ReceiptSettlementType.PROCURACION)
                        .map(FeesReceiptSettlementIds::getObjectId).toArray(Long[]::new),
                settlement.getFeesReceiptSettlementList()
                        .stream()
                        .filter(f -> f.getObjectType() == ReceiptSettlementType.TIMBRES)
                        .map(FeesReceiptSettlementIds::getObjectId).toArray(Long[]::new),
                settlement.getFeesReceiptSettlementList()
                        .stream()
                        .filter(f -> f.getObjectType() == ReceiptSettlementType.GASTOS)
                        .map(FeesReceiptSettlementIds::getObjectId).toArray(Long[]::new),
                settlement.getReceiptSettlementDetailList()
                        .stream()
                        .filter(f -> f.getStatus() == StatusName.ACTIVO)
                        .map(rsd -> new ReceiptSettleDetailRequest(rsd.getId(), rsd.getObjectType(), rsd.getComment(),
                                rsd.getEmployeeId(), rsd.getActivityTime(), rsd.getCostPerHour(), rsd.getExchangeValue(),
                                rsd.getCostDetail(), rsd.getDiscount(), rsd.getDiscountType(), rsd.getUseISR(),
                                rsd.getUseIVA(), rsd.getUseBilling(), rsd.getTotal(), rsd.getStatus(), rsd.getAdvanceBalance()))
                        .collect(Collectors.toList()), String.join(" ",
                settlement.getClient().getName(), (settlement.getClient().getClientType() == 2 ? settlement.getClient().getLastName() : "").trim())
        );
    }

    @Transactional
    public Long createReceiptSettlement(ReceiptSettlementRequest request) {
        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client", "id", request.getClientId()));

        ReceiptSettlement settlement = new ReceiptSettlement(client, request.getStatus(),
                request.getReceiptTotal(), request.getType());

        if (request.getId() != null) {
            settlement.setId(request.getId());
        }
        receiptSettlementRepository.save(settlement);

        List<FeesChangeStatusList> feesChangeStatusLists = new ArrayList<>();

        if (settlement.getType() == ReceiptSettleEnumType.LIQUIDACION) {
            List<FeesReceiptSettlementIds> feesIds = new ArrayList<>();

            if (request.getId() == null) {
                feesIds.addAll(Arrays
                        .stream(request.getAttorneyFeesRequestList())
                        .map(s -> new FeesReceiptSettlementIds(settlement, ReceiptSettlementType.HONORARIOS,
                                s, StatusName.ACTIVO)).collect(Collectors.toList()));

                // Actualizar estado de actividades de honorario para ya no ser utilizadas
                if (request.getAttorneyFeesRequestList().length > 0) {
//                    caseActivityRepository.caseActivityStatusChange(request.getAttorneyFeesRequestList(), StatusName.FINALIZADO);
                    feesChangeStatusLists.add(new FeesChangeStatusList(request.getAttorneyFeesRequestList(), ReceiptSettlementType.HONORARIOS, StatusName.FINALIZADO));
                }

                feesIds.addAll(Arrays
                        .stream(request.getActivityFeesRequestList())
                        .map(s -> new FeesReceiptSettlementIds(settlement, ReceiptSettlementType.PROCURACION,
                                s, StatusName.ACTIVO)).collect(Collectors.toList()));
                feesIds.addAll(Arrays
                        .stream(request.getStampsFeesRequestList())
                        .map(s -> new FeesReceiptSettlementIds(settlement, ReceiptSettlementType.TIMBRES,
                                s, StatusName.ACTIVO)).collect(Collectors.toList()));
                feesIds.addAll(Arrays
                        .stream(request.getExpensesFeesRequestList())
                        .map(s -> new FeesReceiptSettlementIds(settlement, ReceiptSettlementType.GASTOS,
                                s, StatusName.ACTIVO)).collect(Collectors.toList()));
                // Actualizar estado de gastos para ya no se utilizadas
                if (request.getExpensesFeesRequestList().length > 0) {
//                    expenseDetailRepository.updateStatusByIds(request.getExpensesFeesRequestList(), StatusName.FINALIZADO);
                    feesChangeStatusLists.add(new FeesChangeStatusList(request.getExpensesFeesRequestList(), ReceiptSettlementType.GASTOS, StatusName.FINALIZADO));
                }
            } else {
                // Comparar los ids de la db para cambiarles estado

                Long[] attorneyIds = request.getAttorneyFeesRequestList().length > 0 ?
                        feesIdsRepository.getUnusedFeesIds(request.getId(), request.getAttorneyFeesRequestList(),
                                ReceiptSettlementType.HONORARIOS, StatusName.ACTIVO)
                                .toArray(Long[]::new) : new Long[]{};
                Long[] activitiesIds = request.getActivityFeesRequestList().length > 0 ?
                        feesIdsRepository.getUnusedFeesIds(request.getId(), request.getActivityFeesRequestList(),
                                ReceiptSettlementType.PROCURACION, StatusName.ACTIVO)
                                .toArray(Long[]::new) : new Long[]{};
                Long[] stampsIds = request.getStampsFeesRequestList().length > 0 ?
                        feesIdsRepository.getUnusedFeesIds(request.getId(), request.getStampsFeesRequestList(),
                                ReceiptSettlementType.TIMBRES, StatusName.ACTIVO)
                                .toArray(Long[]::new) : new Long[]{};
                Long[] expensesIds = request.getExpensesFeesRequestList().length > 0 ?
                        feesIdsRepository.getUnusedFeesIds(request.getId(), request.getExpensesFeesRequestList(),
                                ReceiptSettlementType.GASTOS, StatusName.ACTIVO)
                                .toArray(Long[]::new) : new Long[]{};

                if (attorneyIds.length > 0) {
                    feesIdsRepository.setFeesIdsStatus(StatusName.ELIMINADO, attorneyIds);
//                    caseActivityRepository.caseActivityStatusChange(attorneyIds, StatusName.ACTIVO);
                    feesChangeStatusLists.add(new FeesChangeStatusList(attorneyIds, ReceiptSettlementType.HONORARIOS, StatusName.ACTIVO));
                }
                if (activitiesIds.length > 0) {
                    feesIdsRepository.setFeesIdsStatus(StatusName.ELIMINADO, activitiesIds);
                }
                if (stampsIds.length > 0) {
                    feesIdsRepository.setFeesIdsStatus(StatusName.ELIMINADO, stampsIds);
                }
                if (expensesIds.length > 0) {
                    feesIdsRepository.setFeesIdsStatus(StatusName.ELIMINADO, expensesIds);
//                    expenseDetailRepository.updateStatusByIds(expensesIds, StatusName.ACTIVO);
                    feesChangeStatusLists.add(new FeesChangeStatusList(expensesIds, ReceiptSettlementType.GASTOS, StatusName.ACTIVO));
                }

                // Cambiar de estado a los ids que no vienen en el request

                List<Long> newAttorneyIds = feesIdsRepository.getFeesIds(request.getId(), ReceiptSettlementType.HONORARIOS,
                        StatusName.ACTIVO);
                List<Long> newActivitiesIds = feesIdsRepository.getFeesIds(request.getId(), ReceiptSettlementType.PROCURACION,
                        StatusName.ACTIVO);
                List<Long> newStampsIds = feesIdsRepository.getFeesIds(request.getId(), ReceiptSettlementType.TIMBRES,
                        StatusName.ACTIVO);
                List<Long> newExpensesIds = feesIdsRepository.getFeesIds(request.getId(), ReceiptSettlementType.GASTOS,
                        StatusName.ACTIVO);

                // Validar si existen nuevos ids e insertarlos
                feesIds.addAll(Arrays.stream(request.getAttorneyFeesRequestList())
                        .filter(f -> !newAttorneyIds.contains(f))
                        .map(s -> new FeesReceiptSettlementIds(settlement, ReceiptSettlementType.HONORARIOS,
                                s, StatusName.ACTIVO)).collect(Collectors.toList()));
                // Actualizar estado de actividades de honorario para ya no ser utilizadas
                if (request.getAttorneyFeesRequestList().length > 0) {
                    feesChangeStatusLists.add(new FeesChangeStatusList(
                            Arrays.stream(request.getAttorneyFeesRequestList())
                                    .filter(f -> !newAttorneyIds.contains(f)).toArray(Long[]::new),
                            ReceiptSettlementType.HONORARIOS,
                            StatusName.FINALIZADO));
                }
                feesIds.addAll(Arrays.stream(request.getActivityFeesRequestList())
                        .filter(f -> !newActivitiesIds.contains(f))
                        .map(s -> new FeesReceiptSettlementIds(settlement, ReceiptSettlementType.PROCURACION,
                                s, StatusName.ACTIVO)).collect(Collectors.toList()));
                feesIds.addAll(Arrays.stream(request.getStampsFeesRequestList())
                        .filter(f -> !newStampsIds.contains(f))
                        .map(s -> new FeesReceiptSettlementIds(settlement, ReceiptSettlementType.TIMBRES,
                                s, StatusName.ACTIVO)).collect(Collectors.toList()));
                feesIds.addAll(Arrays.stream(request.getExpensesFeesRequestList())
                        .filter(f -> !newExpensesIds.contains(f))
                        .map(s -> new FeesReceiptSettlementIds(settlement, ReceiptSettlementType.GASTOS,
                                s, StatusName.ACTIVO)).collect(Collectors.toList()));
                // Actualizar estado de gastos para ya no se utilizadas
                if (request.getExpensesFeesRequestList().length > 0) {
                    feesChangeStatusLists.add(new FeesChangeStatusList(
                            Arrays.stream(request.getExpensesFeesRequestList())
                            .filter(f -> !newExpensesIds.contains(f)).toArray(Long[]::new),
                            ReceiptSettlementType.GASTOS,
                            StatusName.FINALIZADO));
                }
            }

            feesIdsRepository.saveAll(feesIds);
        }
        List<ReceiptSettlementDetail> detail = new ArrayList<>();

        if (settlement.getType() == ReceiptSettleEnumType.LIQUIDACION) {
            // Obtener los totales de cada rubro
            List<AttorneyFeesTotal> attorneyFeesTotals = request.getAttorneyFeesRequestList().length > 0 ? receiptSettlementRepository.getAttorneyTotal(request.getAttorneyFeesRequestList()) : new ArrayList<>();
            Double activityFeesTotals = request.getActivityFeesRequestList().length > 0 ? receiptSettlementRepository.getActivitiesTotal(request.getActivityFeesRequestList()) : 0;
            Double stampsFeesTotals = request.getStampsFeesRequestList().length > 0 ? receiptSettlementRepository.getStampsTotal(request.getStampsFeesRequestList()) : 0;
            List<ExpensesFeesTotal> expensesFeesTotals = request.getExpensesFeesRequestList().length > 0 ? receiptSettlementRepository.getExpansesTotal(request.getExpensesFeesRequestList()) : new ArrayList<>();

            if (request.getId() != null) {
                receiptSettlementDetailRepository.deleteAllById(request.getId());
            }

            // Cambiar de estado los honorarios y gastos
            for (FeesChangeStatusList item : feesChangeStatusLists) {
                if (item.getReceiptSettlementType() == ReceiptSettlementType.HONORARIOS) {
                    caseActivityRepository.caseActivityStatusChange(item.getIds(), item.getStatus());
                }
                if (item.getReceiptSettlementType() == ReceiptSettlementType.GASTOS) {
                    expenseDetailRepository.updateStatusByIds(item.getIds(), item.getStatus());
                }
            }

            // Validar si el total es mayor de 0 y agregar una nueva instancia del detalle
            if (!attorneyFeesTotals.isEmpty()) {
                detail.addAll(
                        attorneyFeesTotals
                                .stream()
                                .map(aft -> {
                                    Employee employee = employeeRepository.findById(aft.getEmployeeId())
                                            .orElseThrow(() -> new ResourceNotFoundException("Empleados", "id", aft.getEmployeeId()));
                                    return new ReceiptSettlementDetail(settlement, ReceiptSettlementType.HONORARIOS,
                                            String.join(" ", "Honorarios",
                                                    String.join(" ", employee.getName(), employee.getLastName())),
                                            aft.getEmployeeId(), aft.getActivityTime(), 0d, 1d, 0d, 0d,
                                            false, false, false, true, 0d, StatusName.ACTIVO, null);
                                }).collect(Collectors.toList()));
            }
            if (activityFeesTotals != 0) {
                detail.add(new ReceiptSettlementDetail(settlement, ReceiptSettlementType.PROCURACION,
                        "Gastos Administrativos", 0l, 0d,
                        0d, 1d, activityFeesTotals, 0d,
                        false, false, false, true, activityFeesTotals, StatusName.ACTIVO, null));
            }

            if (stampsFeesTotals != 0) {
                detail.add(new ReceiptSettlementDetail(settlement, ReceiptSettlementType.TIMBRES,
                        "Timbres", 0l, 0d,
                        0d, 1d, stampsFeesTotals, 0d,
                        false, false, false, true, stampsFeesTotals, StatusName.ACTIVO, null));
            }

            if (!expensesFeesTotals.isEmpty()) {
                detail.addAll(expensesFeesTotals.stream().map(det -> new ReceiptSettlementDetail(settlement, ReceiptSettlementType.GASTOS,
                        det.getConceptName(), 0l, 0d,
                        0d, 1d, det.getTotal(), 0d,
                        false, false, false, true, det.getTotal(), StatusName.ACTIVO, null)).collect(Collectors.toList()));
            }
        } else {
            detail = request.getReceiptSettleDetailRequestList()
                    .stream()
                    .map(det -> {
                        ReceiptSettlementDetail rsDetail =
                                new ReceiptSettlementDetail(settlement, det.getObjectType(), det.getComment(),
                                        det.getEmployeeId(), det.getActivityTime(),
                                        det.getCostPerHour(), det.getExchangeValue(), det.getCostDetail(), det.getDiscount(),
                                        det.getDiscountType(), det.getUseISR(), det.getUseIVA(), det.getUseBilling(),
                                        det.getTotal(), det.getStatus(), det.getAdvanceBalance());
                        if (det.getId() != null) {
                            rsDetail.setId(det.getId());
                        }
                        return rsDetail;
                    })
                    .collect(Collectors.toList());
        }

        receiptSettlementDetailRepository.saveAll(detail);

        return settlement.getId();
    }

    @Transactional
    public long saveDetail(ReceiptSettlementRequest request) {
        ReceiptSettlement settlement = receiptSettlementRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("ReceiptSettlement", "id", request.getId()));

        settlement.setReceiptTotal(0d);
        List<ReceiptSettlementDetail> detail = request.getReceiptSettleDetailRequestList()
                .stream()
                .map(det -> {
                    ReceiptSettlementDetail rsDetail =
                            new ReceiptSettlementDetail(settlement, det.getObjectType(), det.getComment(),
                                    det.getEmployeeId(), det.getActivityTime(),
                                    det.getCostPerHour(), det.getExchangeValue(), det.getCostDetail(), det.getDiscount(),
                                    det.getDiscountType(), det.getUseISR(), det.getUseIVA(), det.getUseBilling(), det.getTotal(),
                                    det.getStatus() == null ? StatusName.ACTIVO : det.getStatus(), det.getAdvanceBalance());
                    if (det.getId() != null) {
                        rsDetail.setId(det.getId());
                    }
                    if (det.getStatus() == StatusName.ACTIVO) {
                        settlement.setReceiptTotal(settlement.getReceiptTotal() + det.getTotal());
                    }
                    if (det.getStatus() == StatusName.ELIMINADO) {
                        if (det.getObjectType() == ReceiptSettlementType.HONORARIOS) {
                            List<Long> ids = feesIdsRepository.getAttorneyFees(det.getObjectType(), det.getEmployeeId(), request.getId());
                            feesIdsRepository.setFeesIdsStatus(StatusName.ELIMINADO, ids.toArray(Long[]::new));
                            caseActivityRepository.caseActivityStatusChange(ids.toArray(Long[]::new), StatusName.ACTIVO);
                        }
                        if (det.getObjectType() == ReceiptSettlementType.GASTOS) {
                            List<Long> expensesIds = feesIdsRepository.getFeesAssignedIds(ReceiptSettlementType.GASTOS, StatusName.ACTIVO);
                            expenseDetailRepository.updateStatusByIds(expensesIds.toArray(Long[]::new), StatusName.ACTIVO);
                        }
                        if (det.getObjectType() == ReceiptSettlementType.PROCURACION ||
                                det.getObjectType() == ReceiptSettlementType.TIMBRES ||
                                det.getObjectType() == ReceiptSettlementType.GASTOS) {
                            feesIdsRepository.updateFeesIdsStatus(StatusName.ELIMINADO, det.getObjectType(), request.getId());
                        }
                    }
                    return rsDetail;
                })
                .collect(Collectors.toList());

        receiptSettlementRepository.save(settlement);
        receiptSettlementDetailRepository.saveAll(detail);
        return request.getId();
    }

    public FeesReceiptSettleListResponse getFeesByClientId(Long id, Long settlementId) {

        List<Long> usedFees;
        List<Long> usedActivities;
        List<Long> usedStamps;
        List<Long> usedExpenses;
        if (settlementId == -1) {
            usedFees = feesIdsRepository.getFeesAssignedIds(ReceiptSettlementType.HONORARIOS, StatusName.ACTIVO);
            usedActivities = feesIdsRepository.getFeesAssignedIds(ReceiptSettlementType.PROCURACION, StatusName.ACTIVO);
            usedStamps = feesIdsRepository.getFeesAssignedIds(ReceiptSettlementType.TIMBRES, StatusName.ACTIVO);
            usedExpenses = feesIdsRepository.getFeesAssignedIds(ReceiptSettlementType.GASTOS, StatusName.ACTIVO);
        } else {
            usedFees = feesIdsRepository.getFeesIdsBySettleId(settlementId,ReceiptSettlementType.HONORARIOS, StatusName.ACTIVO);
            usedActivities = feesIdsRepository.getFeesIdsBySettleId(settlementId,ReceiptSettlementType.PROCURACION, StatusName.ACTIVO);
            usedStamps = feesIdsRepository.getFeesIdsBySettleId(settlementId,ReceiptSettlementType.TIMBRES, StatusName.ACTIVO);
            usedExpenses = feesIdsRepository.getFeesIdsBySettleId(settlementId,ReceiptSettlementType.GASTOS, StatusName.ACTIVO);
        }

        List<FeesReceiptSettleResponse> fees =
                receiptSettlementRepository.getFeesByClientId(id).stream()
                        .filter(f -> !usedFees.contains(f.getId()))
                        .map(fee -> new FeesReceiptSettleResponse(fee.getId(), fee.getFileNum(),
                                fee.getDescription(), fee.getEmployeeName(), fee.getActivityName(), fee.getActivityTime()))
                        .collect(Collectors.toList());

        List<ActivitiesReceiptSettleResponse> activities =
                receiptSettlementRepository.getActivitiesByClientId(id).stream()
                        .filter(f -> !usedActivities.contains(f.getId()))
                        .map(fee -> new ActivitiesReceiptSettleResponse(fee.getId(), fee.getFileNum(),
                                fee.getDescription(), fee.getEmployeeName(), fee.getActivityName(),
                                fee.getInstitutionName(), fee.getCurrency(), fee.getExchangeValue(), fee.getTotal()))
                        .collect(Collectors.toList());

        List<StampReceiptSettleResponse> stamps =
                receiptSettlementRepository.getStampsByClientId(id).stream()
                        .filter(f -> !usedStamps.contains(f.getId()))
                        .map(fee -> new StampReceiptSettleResponse(fee.getId(), fee.getFileNum(),
                                fee.getDescription(), fee.getCurrency(), fee.getExchangeValue(), fee.getTotal()))
                        .collect(Collectors.toList());

        List<ExpensesReceiptSettleResponse> expenses =
                receiptSettlementRepository.getExpensesByClientId(id).stream()
                        .filter(f -> !usedExpenses.contains(f.getId()))
                        .map(fee -> new ExpensesReceiptSettleResponse(fee.getId(), fee.getFileNum(), fee.getExpensesNum(),
                                fee.getProviderName(), fee.getConceptName(), fee.getCurrencyName(), fee.getExchangeValue(),
                                fee.getTotal()))
                        .collect(Collectors.toList());

        return new FeesReceiptSettleListResponse(fees, activities, stamps, expenses);
    }

    @Transactional
    public void changeStatus(StatusHistoryRequest request) throws Exception {
        String[] privilege = { "ROLE_USUARIO_ADMIN", "ROLE_" +
                statusService.getStatusFlowPrivilege(AppId.LIQUIDACION_FACTURA, request.getStatus()) };
        if (!roleChecker.hasRole(privilege)) {
            throw new Exception("No posee accesos para realizar esta acción");
        }

        ReceiptSettlement receiptSettlement = receiptSettlementRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("ReceiptSettlement", "id", request.getId()));

        StatusHistory history = new StatusHistory(request.getId(), AppId.LIQUIDACION_FACTURA, request.getComment(),
                receiptSettlement.getStatus(), request.getStatus());
        receiptSettlement.setStatus(request.getStatus());

        if (request.getStatus() == StatusName.FACTURADO) {
            receiptService.generateReceipt(request.getId());
        }

        receiptSettlementRepository.save(receiptSettlement);
        statusService.changeStatus(history);
    }

    public ReceiptSettlement getReceiptSettleEntity(Long id) {
        ReceiptSettlement settlement = receiptSettlementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt Settlement", "id", id));

        if (settlement.getFeesReceiptSettlementList() == null) {
            List<FeesReceiptSettlementIds> newFeesList = feesIdsRepository.getAllFeesById(id, StatusName.ACTIVO);
            settlement.setFeesReceiptSettlementList(newFeesList);
        } else {
            settlement.setFeesReceiptSettlementList(
                    settlement.getFeesReceiptSettlementList()
                            .stream()
                            .filter(s -> s.getStatus() == StatusName.ACTIVO)
                            .collect(Collectors.toList()));
        }

        if (settlement.getReceiptSettlementDetailList() == null) {
            settlement.setReceiptSettlementDetailList(receiptSettlementDetailRepository.getByParentId(id, StatusName.ACTIVO));
        } else {
            settlement.setReceiptSettlementDetailList(
                    settlement.getReceiptSettlementDetailList()
                            .stream()
                            .filter(s -> s.getStatus() == StatusName.ACTIVO)
                            .collect(Collectors.toList())
            );
        }

        return settlement;
    }

    @Transactional
    public Long createReceiptSettleReport(ReceiptSettleReportRequest request) {
        ReceiptSettlement settlement = receiptSettlementRepository.findById(request.getReceiptSettlementId())
                .orElseThrow(() -> new ResourceNotFoundException("Receipt Settlement", "id", request.getReceiptSettlementId()));

        if (settlement.getReceiptSettlementDetailList() == null) {
            settlement.setReceiptSettlementDetailList(
                    receiptSettlementDetailRepository.getByParentId(request.getReceiptSettlementId(), StatusName.ACTIVO));
        } else {
            settlement.setReceiptSettlementDetailList(
                    settlement.getReceiptSettlementDetailList()
                            .stream()
                            .filter(s -> s.getStatus() == StatusName.ACTIVO)
                            .collect(Collectors.toList())
            );
        }

        // Validar que no exista un registro de reporte en la bdd

        ReceiptSettlementReport report = receiptSettleReportRepository.getReportInfoById(request.getId())
                .orElse(new ReceiptSettlementReport());

        final Double[] total = {0d};
        for (ReceiptSettlementDetail detail : settlement.getReceiptSettlementDetailList()) {
            if (detail.getObjectType() == ReceiptSettlementType.ANTICIPO || detail.getObjectType() == ReceiptSettlementType.ISR) {
                total[0] -= detail.getTotal();
            } else {
                total[0] += detail.getTotal();
            }
        }

        Date date = Calendar.getInstance().getTime();
        Locale l = new Locale ( "es" , "ES" );
        SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy", l);
        String today = formatter.format(date);

        if (report.getId() == null) {

            report = new ReceiptSettlementReport(settlement.getId(), String.join(" ",
                    settlement.getClient().getName(),
                    (settlement.getClient().getClientType() == 2 ? settlement.getClient().getLastName() : "")).trim(),
                    "Guatemala, " + today, request.getFileNum(), request.getHeaderText(), request.getFooterText(),
                    total[0]);

        } else {
            report.setClientName(String.join(" ",
                    settlement.getClient().getName(),
                    (settlement.getClient().getClientType() == 2 ? settlement.getClient().getLastName() : "")).trim());
            report.setDocumentDate("Guatemala, " + today);
            report.setFileNum(request.getFileNum());
            report.setHeaderText(request.getHeaderText());
            report.setFooterText(request.getFooterText());
            report.setTotal(total[0]);
        }
        receiptSettleReportRepository.save(report);


        // Convertir los datos en el payload

        return report.getId();
    }

    public ReceiptSettleReportRequest getReceiptSettleReport(Long id) {
        ReceiptSettlement settlement = receiptSettlementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt Settlement", "id", id));

        if (settlement.getReceiptSettlementDetailList() == null) {
            settlement.setReceiptSettlementDetailList(
                    receiptSettlementDetailRepository.getByParentId(id, StatusName.ACTIVO));
        } else {
            settlement.setReceiptSettlementDetailList(
                    settlement.getReceiptSettlementDetailList()
                            .stream()
                            .filter(s -> s.getStatus() == StatusName.ACTIVO)
                            .collect(Collectors.toList())
            );
        }

        // Validar que no exista un registro de reporte en la bdd

        ReceiptSettlementReport report = receiptSettleReportRepository.getReportInfoById(id)
                .orElse(new ReceiptSettlementReport());

        List<ReceiptSettleReportDetailRequest> reportDetail = new ArrayList<>();
        final Double[] total = {0d};
        reportDetail.addAll(settlement.getReceiptSettlementDetailList()
                .stream()
                .filter(f -> f.getStatus() == StatusName.ACTIVO)
                .map(det -> {
                    if (det.getObjectType() == ReceiptSettlementType.ANTICIPO || det.getObjectType() == ReceiptSettlementType.ISR) {
                        total[0] -= det.getTotal();
                    } else {
                        total[0] += det.getTotal();
                    }
                    return new ReceiptSettleReportDetailRequest(det.getId(), det.getObjectType(),
                            det.getComment() + (det.getUseIVA() ? " + IVA": ""), det.getTotal());
                }).collect(Collectors.toList()));

        Date date = Calendar.getInstance().getTime();
        Locale l = new Locale ( "es" , "ES" );
        SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy", l);
        String today = formatter.format(date);

        if (report.getId() == null) {

            report = new ReceiptSettlementReport(settlement.getId(), String.join(" ",
                    settlement.getClient().getName(),
                    (settlement.getClient().getClientType() == 2 ? settlement.getClient().getLastName() : "")).trim(),
                    "Guatemala, " + today, "", "", "",
                    total[0]);

        }

        // Convertir los datos en el payload

        ReceiptSettleReportRequest response =
                new ReceiptSettleReportRequest(report.getId(), settlement.getId(), report.getClientName(), report.getDocumentDate(),
                        report.getFileNum(), report.getHeaderText(), report.getFooterText(), total[0], reportDetail);

        return response;
    }

    public List<AdvanceBalanceResponse> getAdvanceBalanceList(Long id) {
        List<Long> clientIds = new ArrayList<>();

        // busco el cliente
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ReceiptSettlementService", "id", id));
        clientIds.add(id);
        // reviso si tiene papa y si tiene obtengo al papa y a los hermanos
        if (client.getParentClient() != null) {
            Client clientParent = clientRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("ReceiptSettlementService", "id", id));
            clientIds.add(clientParent.getId());
            clientRepository.findClientsByParentId(clientParent.getId())
                    .stream().forEach(c -> clientIds.add(c.getId()));
        } else {
            // si no tiene papa busco si tiene hijos
            clientRepository.findClientsByParentId(id)
                    .stream().forEach(c -> clientIds.add(c.getId()));
        }
        return advanceBalanceRepository.getAdvanceBalanceBy(clientIds.toArray(Long[]::new), StatusName.ACTIVO)
                        .stream().map(ab -> new AdvanceBalanceResponse(ab.getId(),
                                ab.getPaymentReceipt().getCurrency().getShortName(), ab.getPaymentBalance(), ab.getPaymentReceipt().getId()))
                        .collect(Collectors.toList());
    }
}

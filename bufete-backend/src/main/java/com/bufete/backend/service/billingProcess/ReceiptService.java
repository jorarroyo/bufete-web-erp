package com.bufete.backend.service.billingProcess;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.appConfig.AppConfiguration;
import com.bufete.backend.model.appConfig.Currency;
import com.bufete.backend.model.billingProcess.*;
import com.bufete.backend.model.billingProcess.sequence.DocumentSequence;
import com.bufete.backend.model.billingProcess.sequence.DocumentType;
import com.bufete.backend.model.recordFiles.Client;
import com.bufete.backend.model.shared.*;
import com.bufete.backend.payload.billingProcess.*;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.payload.accountReceivable.ReceiptsPaymentDetailResponse;
import com.bufete.backend.repository.appConfig.CurrencyRepository;
import com.bufete.backend.repository.billingProcess.*;
import com.bufete.backend.repository.billingProcess.sequence.DocumentSequenceRepository;
import com.bufete.backend.repository.recordFiles.ClientRepository;
import com.bufete.backend.repository.shared.AddressRepository;
import com.bufete.backend.security.RoleChecker;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.appConfig.AppConfigService;
import com.bufete.backend.service.shared.CommonService;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReceiptService {

    @Autowired
    private ReceiptRepository receiptRepository;

    @Autowired
    private ReceiptDetailsRepository receiptDetailsRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private StatusService statusService;

    @Autowired
    private RoleChecker roleChecker;

    @Autowired
    private ReceiptSettlementService receiptSettlementService;

    @Autowired
    private AppConfigService appConfigService;

    @Autowired
    private CommonService commonService;

    @Autowired
    private DocumentSequenceRepository documentSequenceRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private InvoiceSerieRepository invoiceSerieRepository;

    @Autowired
    private OneTimeClientRepository oneTimeClientRepository;

    public PagedResponse<ReceiptResponseView> getAllReceipts(UserPrincipal currentUser, int page, int size,
                                                             String searchText, String sort, String direction) {
        Validators.validatePageNumberAndSize(page, size);
        StatusName[] disabledStatuses = {StatusName.ELIMINADO};
        Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
                Validators.toCamelCase(sort));
        Page<ReceiptView> receiptViews = receiptRepository.getPagedReceipts(searchText, disabledStatuses, pageable);

        if (receiptViews.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), receiptViews.getNumber(), receiptViews.getSize(),
                    receiptViews.getTotalElements(), receiptViews.getTotalPages(), receiptViews.isLast());
        }

        List<ReceiptResponseView> response =
                receiptViews
                .stream()
                .map(receipt -> new ReceiptResponseView(receipt.getId(), receipt.getSerialNumber(), receipt.getClientName(), receipt.getNit(),
                        receipt.getStatus(), receipt.getReceiptDate(), receipt.getReceiptTotal(),
                        receipt.getReceiptTotalDiscount(), receipt.getCreated(), receipt.getModified(), receipt.getCurrencyName(), receipt.getSeriesName()))
                .collect(Collectors.toList());

        return new PagedResponse<>(response, receiptViews.getNumber(), receiptViews.getSize(),
                receiptViews.getTotalElements(), receiptViews.getTotalPages(), receiptViews.isLast());
    }

    public ReceiptResponse getReceipt(Long id) {
        Receipt receipt = receiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt", "id", id));

        OneTimeClientResponse oneTimeClientResponse = new OneTimeClientResponse();

        if (receipt.getReceiptDetails() == null) {
            receipt.setReceiptDetails(receiptDetailsRepository.findAllByParentId(receipt.getId(), StatusName.ACTIVO));
        }

        if (receipt.getOneTimeClient()) {
            OneTimeClient oneTimeClient = oneTimeClientRepository
                .getByReceiptId(receipt.getId())
                .orElseThrow(() -> new ResourceNotFoundException("oneTimeClient", "id", receipt.getId()));
                    oneTimeClientResponse = new OneTimeClientResponse(oneTimeClient.getId(), oneTimeClient.getName(),
                            oneTimeClient.getAddress(), oneTimeClient.getNit());
        }

        if (receipt.getOneTimeClient()) {
            return new ReceiptResponse(receipt.getId(), receipt.getSerialNumber(), receipt.getReceiptSettlementId(), null,
                    "",null, receipt.getStatus(),
                    receipt.getReceiptDate(), receipt.getReceiptTotal(), receipt.getReceiptTotalDiscount(), receipt.getObjectType(),
                    receipt.getCurrency().getId(), receipt.getReceiptIVA(), receipt.getExchangeRate(),
                    receipt.getOneTimeClient(), oneTimeClientResponse,
                    receipt.getReceiptDetails()
                            .stream()
                            .filter(f -> f.getStatus() == StatusName.ACTIVO)
                            .map(det -> new ReceiptDetailsResponse(det.getId(), det.getDescription(),
                                    det.getLineAmount(), det.getLineDiscount(), det.getLineTotal(), det.getStatus(),
                                    det.getUseISR(), det.getUseIVA()))
                            .collect(Collectors.toList()));
        }

        return new ReceiptResponse(receipt.getId(), receipt.getSerialNumber(), receipt.getReceiptSettlementId(), receipt.getClient().getId(),
                String.join(" ",
                        receipt.getClient().getName(), (receipt.getClient().getClientType() == 2 ? receipt.getClient().getLastName() : "").trim()),
                receipt.getReceiptAddress(), receipt.getStatus(),
                receipt.getReceiptDate(), receipt.getReceiptTotal(), receipt.getReceiptTotalDiscount(), receipt.getObjectType(),
                receipt.getCurrency().getId(), receipt.getReceiptIVA(), receipt.getExchangeRate(),
                receipt.getOneTimeClient(), oneTimeClientResponse,
                receipt.getReceiptDetails()
                        .stream()
                        .filter(f -> f.getStatus() == StatusName.ACTIVO)
                        .map(det -> new ReceiptDetailsResponse(det.getId(), det.getDescription(),
                            det.getLineAmount(), det.getLineDiscount(), det.getLineTotal(), det.getStatus(),
                                det.getUseISR(), det.getUseIVA()))
                        .collect(Collectors.toList()));
    }

    public FELReceiptResponse getFELReceipt(Long id) {
        Receipt receipt = receiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt", "id", id));

        OneTimeClient oneTimeClient = new OneTimeClient();

        if (receipt.getReceiptDetails() == null) {
            receipt.setReceiptDetails(receiptDetailsRepository.findAllByParentId(receipt.getId(), StatusName.ACTIVO));
        }

        if (receipt.getOneTimeClient()) {
            oneTimeClient = oneTimeClientRepository
                    .getByReceiptId(receipt.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("oneTimeClient", "id", receipt.getId()));
        }

        AppConfiguration configuration = appConfigService.getAppConfigByName("IVA_PORCENTAJE");

        Double ivaPerc = Double.parseDouble(configuration.getConfigValue()) / 100;
        Double ivaTotal = Math.round((receipt.getReceiptTotal() - receipt.getReceiptTotal() / (1 + ivaPerc))*100)/100.d;

        if (receipt.getOneTimeClient()) {
            return new FELReceiptResponse(receipt.getId(), "01", oneTimeClient.getId(), oneTimeClient.getName(),
                    oneTimeClient.getNit(), oneTimeClient.getAddress(), "", receipt.getReceiptDate(), 1, "", 1d, "HRS",
                    receipt.getReceiptTotal(), receipt.getReceiptTotal() - ivaTotal, ivaTotal, receipt.getReceiptTotal(),
                    receipt.getReceiptTotalDiscount(), "GUATEMALA", "IVA", ivaPerc, "GTQ", "CONTADO", 1d,
                    receipt.getReceiptDetails()
                            .stream().map(det -> {
                Double lineIva = Math.round((det.getLineTotal() - det.getLineTotal() / (1 + ivaPerc))*100)/100.d;
                return new FELReceiptDetailResponse("S", 1d, det.getDescription(), det.getLineTotal(),
                        det.getLineDiscount(), det.getLineTotal() - lineIva, lineIva);
                }).collect(Collectors.toList()));
        }

        AddressView addressView = addressRepository.getAddressesViewById(receipt.getReceiptAddress())
                .orElseThrow(() -> new ResourceNotFoundException("Receipt", "id", id));

        return new FELReceiptResponse(receipt.getId(), "01", receipt.getClient().getId(), String.join(" ",
                receipt.getClient().getName(), (receipt.getClient().getClientType() == 2 ? receipt.getClient().getLastName() : "").trim()),
                receipt.getClient().getNit(), String.join(" ", addressView.getAddress(), "Zona ",
                addressView.getZone(), addressView.getMunicipality()), "", receipt.getReceiptDate(), 1, "", 1d, "HRS",
                receipt.getReceiptTotal(), receipt.getReceiptTotal() - ivaTotal, ivaTotal, receipt.getReceiptTotal(),
                receipt.getReceiptTotalDiscount(), "GUATEMALA", "IVA", ivaPerc, receipt.getCurrency().getShortName(), "CONTADO", 1d,
                receipt.getReceiptDetails()
                        .stream().map(det -> {
                            Double lineIva = Math.round((det.getLineTotal() - det.getLineTotal() / (1 + ivaPerc))*100)/100.d;
                            return new FELReceiptDetailResponse("S", 1d, det.getDescription(), det.getLineTotal(),
                                    det.getLineDiscount(), det.getLineTotal() - lineIva, lineIva);
                }).collect(Collectors.toList()));
    }

    @Transactional
    public Long createReceipt(ReceiptRequest request) {
        Client client;
        if (request.getOneTimeClient()) {
            client = null;
        } else {
            client = clientRepository.findById(request.getClientId())
                    .orElseThrow(() -> new ResourceNotFoundException("Receipt", "clientId", request.getClientId()));
        }

        Currency currency = currencyRepository.findById(request.getCurrencyId())
                .orElseThrow(() -> new ResourceNotFoundException("Currency", "id", request.getCurrencyId()));

        Receipt receipt = new Receipt(request.getSerialNumber(), client, request.getAddressId(), request.getReceiptSettlementId(), request.getStatus(),
                request.getReceiptDate(), request.getReceiptTotal(), request.getReceiptIVA(), currency, request.getReceiptTotalDiscount(), null, request.getObjectType(),
                request.getExchangeRate(), request.getOneTimeClient(), request.getReceiptTotal() - request.getReceiptTotalDiscount());

        if (request.getId() != null) {
            receipt.setId(request.getId());
        } else {
            DocumentSequence sequence = documentSequenceRepository.save(new DocumentSequence(DocumentType.FACTURA));
            receipt.setId(sequence.getId());
        }

        receiptRepository.save(receipt);

        List<ReceiptDetail> details = request.getDetails()
                .stream()
                .map(det -> {
                    ReceiptDetail newDetail = new ReceiptDetail(receipt, det.getDescription(), det.getLineAmount(), det.getLineDiscount(),
                            det.getLineTotal(), det.getStatus(), det.getUseISR(), det.getUseIVA());
                    if (det.getId() != null) {
                        newDetail.setId(det.getId());
                    }
                    return newDetail;
                })
                .collect(Collectors.toList());

        receiptDetailsRepository.saveAll(details);

        if (request.getOneTimeClient()) {
            OneTimeClient oneTimeClient =
                    new OneTimeClient(request.getOneTimeClientRequest().getName(),
                            request.getOneTimeClientRequest().getAddress(), request.getOneTimeClientRequest().getNit(),
                            receipt.getId());
            if (request.getOneTimeClientRequest().getId() != null) {
                oneTimeClient.setId(request.getOneTimeClientRequest().getId());
            }
            oneTimeClientRepository.save(oneTimeClient);
        }

        return receipt.getId();
    }

    @Transactional
    public Long generateReceipt(Long receiptSettlementId) throws Exception {
        StatusName[] statusNames = { StatusName.ELIMINADO, StatusName.ANULADO };
        Receipt receiptExists = receiptRepository.findByReceiptSettlementId(receiptSettlementId, statusNames)
                .orElse(new Receipt());
        if (receiptExists.getId() != null) {
            throw new Exception("Ya existe una factura asociada a la liquidación");
        }

        ReceiptSettlement settlement = receiptSettlementService.getReceiptSettleEntity(receiptSettlementId);

        Currency currency = currencyRepository.findById(1l)
                .orElseThrow(() -> new ResourceNotFoundException("Currency", "id", 1l));

        List<ShareCatResponse> addresses = commonService.getAddressesByIdAndType(settlement.getClient().getId(), AppId.CLIENTES);
        Long address_id = addresses.isEmpty() ? null : addresses.get(0).getId();

        AppConfiguration nonFreeDescription = appConfigService.getAppConfigByName("RECEIPT_NONFREE_DEFAULT_DESCRIPTION");
        AppConfiguration freeDescription = appConfigService.getAppConfigByName("RECEIPT_FREE_DEFAULT_DESCRIPTION");

        Double nonFreeLineAmount = 0d, nonFreeLineDiscount = 0d, nonFreeLineTotal = 0d;
        Double freeLineAmount = 0d, freeLineDiscount = 0d, freeLineTotal = 0d;
        Double advanceBalance = 0d, isrTotal = 0d;

        for (ReceiptSettlementDetail item : settlement.getReceiptSettlementDetailList()) {
            if (item.getObjectType() == ReceiptSettlementType.HONORARIOS ||
                    item.getObjectType() == ReceiptSettlementType.PROCURACION ||
                    item.getObjectType() == ReceiptSettlementType.TIMBRES ||
                    item.getObjectType() == ReceiptSettlementType.GASTOS) {
                nonFreeLineAmount += item.getCostDetail();
                nonFreeLineDiscount += item.getDiscount();
                nonFreeLineTotal += item.getTotal();
            }
            if (item.getObjectType() == ReceiptSettlementType.LIBRE && item.getUseBilling()) {
                freeLineAmount += item.getCostDetail();
                freeLineDiscount += item.getDiscount();
                freeLineTotal += item.getTotal();
            }
            if (item.getObjectType() == ReceiptSettlementType.ANTICIPO) {
                advanceBalance += item.getTotal();
            }
            if (item.getObjectType() == ReceiptSettlementType.ISR) {
                isrTotal += item.getTotal();
            }
        }

        Double grandTotal = Math.round((nonFreeLineTotal + freeLineTotal - advanceBalance - isrTotal) * 100.0) / 100.0;
        Double grandIVA = Math.round((grandTotal - grandTotal / 1.12) * 100.0) / 100.0;
        Double grandDiscount = Math.round((nonFreeLineDiscount + freeLineDiscount) * 100.0) / 100.0;

        Receipt receipt =
                new Receipt("", settlement.getClient(), address_id, receiptSettlementId, StatusName.EN_EDICION,
                new Date(), grandTotal, grandIVA, currency, grandDiscount, null, ReceiptSettleEnumType.LIQUIDACION, 1.0,
                        false, grandTotal - grandDiscount);

        DocumentSequence sequence = documentSequenceRepository.save(new DocumentSequence(DocumentType.FACTURA));
        receipt.setId(sequence.getId());

        receiptRepository.save(receipt);

        List<ReceiptDetail> details = new ArrayList<>();

        if (nonFreeLineTotal != 0) {
            details.add(new ReceiptDetail(receipt, nonFreeDescription.getConfigValue(),
                    Math.round((nonFreeLineTotal + nonFreeLineDiscount) * 100.0) / 100.0,
                    Math.round(nonFreeLineDiscount * 100.0) / 100.0,
                    Math.round(nonFreeLineTotal * 100.0) / 100.0, StatusName.ACTIVO, null, null));
        }
        if (freeLineTotal != 0) {
            details.add(new ReceiptDetail(receipt, freeDescription.getConfigValue(),
                    Math.round((freeLineTotal + freeLineDiscount) * 100.0) / 100.0,
                    Math.round(freeLineDiscount * 100.0) / 100.0,
                    Math.round(freeLineTotal * 100.0) / 100.0, StatusName.ACTIVO, null, null));
        }

        receiptDetailsRepository.saveAll(details);

        return receipt.getId();
    }

    @Transactional
    public void changeStatus(ChanceStatusRequest request) throws Exception {
        String[] privilege = { "ROLE_USUARIO_ADMIN", "ROLE_" +
                statusService.getStatusFlowPrivilege(AppId.FACTURACION, request.getStatus()) };
        if (!roleChecker.hasRole(privilege)) {
            throw new Exception("No posee accesos para realizar esta acción");
        }

        Receipt receipt = receiptRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Receipt", "id", request.getId()));

        StatusHistory history = new StatusHistory(request.getId(), AppId.FACTURACION, request.getComment(),
                receipt.getStatus(), request.getStatus());

        receipt.setStatus(request.getStatus());
        if (request.getSerialNumber() != null) {
            receipt.setSerialNumber(request.getSerialNumber());
        }

        if (request.getInvoiceSeriesId() != null) {
            InvoiceSerie invoiceSerie = invoiceSerieRepository.findById(request.getInvoiceSeriesId())
                    .orElse(null);
            receipt.setInvoiceSerie(invoiceSerie);
        }

        receiptRepository.save(receipt);
        statusService.changeStatus(history);
    }

    public List<ReceiptReportResponse> getReceiptReport(ReceiptReportRequest request) {
        StatusName[] usedStatus = { StatusName.IMPRESO, StatusName.GENERADA, StatusName.ANULADO };
        if (request.getInvoiceId() == 0) {
            return receiptRepository.getReceiptsByDate(request.getStartDate(), request.getEndDate(), usedStatus)
                    .stream()
                    .map(s -> new ReceiptReportResponse(s.getId(), s.getClientName(), s.getSerialNumber(), s.getStatus(),
                            s.getReceiptDate(), s.getReceiptTotal(), s.getReceiptTotalNoIVA(), s.getReceiptRetention(),
                            s.getReceiptNoRetention(), s.getInvoiceSeriesId(), s.getSeriesValue(), s.getExchangeRate(), s.getCurrencyName()))
                    .collect(Collectors.toList());
        }
        return receiptRepository.getReceiptsByDateAndInvoice(request.getStartDate(), request.getEndDate(), request.getInvoiceId(), usedStatus)
                .stream()
                .map(s -> new ReceiptReportResponse(s.getId(), s.getClientName(), s.getSerialNumber(), s.getStatus(),
                        s.getReceiptDate(), s.getReceiptTotal(), s.getReceiptTotalNoIVA(), s.getReceiptRetention(),
                        s.getReceiptNoRetention(), s.getInvoiceSeriesId(), s.getSeriesValue(), s.getExchangeRate(), s.getCurrencyName()))
                .collect(Collectors.toList());
    }

    public List<ReceiptsPaymentDetailResponse> getReceiptsBalanceList(Long clientId, Long currencyId, Long paymentId) {
        return receiptDetailsRepository
                .findAllPaymentDetailsById(clientId, currencyId, paymentId)
                .stream().map(s -> new ReceiptsPaymentDetailResponse(s.getId(),
                        s.getSerialNumber(), s.getSeriesValue(), s.getBalance(), s.getStatus(),
                        s.getClientId(), s.getReceiptTotal(), s.getCurrencyId(), s.getCurrencyName(), s.getReceiptDate()))
                .collect(Collectors.toList());
    }
}

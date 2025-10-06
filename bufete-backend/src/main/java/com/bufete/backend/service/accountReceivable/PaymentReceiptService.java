package com.bufete.backend.service.accountReceivable;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.accountReceivable.*;
import com.bufete.backend.model.appConfig.Currency;
import com.bufete.backend.model.billingProcess.*;
import com.bufete.backend.model.catalogs.Bank;
import com.bufete.backend.model.catalogs.TransactionType;
import com.bufete.backend.model.recordFiles.Client;
import com.bufete.backend.model.shared.StatusHistory;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.accountReceivable.*;
import com.bufete.backend.payload.billingProcess.*;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.repository.accountReceivable.*;
import com.bufete.backend.repository.appConfig.CurrencyRepository;
import com.bufete.backend.repository.billingProcess.*;
import com.bufete.backend.repository.catalogs.BankRepository;
import com.bufete.backend.repository.catalogs.TransactionTypeRepository;
import com.bufete.backend.repository.recordFiles.ClientRepository;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentReceiptService {

    @Autowired
    private PaymentReceiptRepository paymentReceiptRepository;

    @Autowired
    private PaymentReceiptDetailRepository paymentReceiptDetailRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private BankRepository bankRepository;

    @Autowired
    private TransactionTypeRepository transactionTypeRepository;

    @Autowired
    private ReceiptRepository receiptRepository;

    @Autowired
    private StatusService statusService;

    @Autowired
    private RoleChecker roleChecker;

    @Autowired
    private PaymentTransDetRepository paymentTransDetRepository;

    @Autowired
    private AdvanceBalanceRepository advanceBalanceRepository;

    public PagedResponse<PaymentReceiptViewResponse> getAllPaymentReceipt(UserPrincipal currentUser, int page, int size,
                                                                          String searchText, String sort, String direction) {
        Validators.validatePageNumberAndSize(page, size);
        StatusName[] disabledStatuses = {StatusName.ELIMINADO};
        Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
                Validators.toCamelCase(sort));

        Page<PaymentReceiptView> paymentReceiptViews = paymentReceiptRepository.getPagedPaymentReceipts(searchText, disabledStatuses, pageable);

        if (paymentReceiptViews.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), paymentReceiptViews.getNumber(), paymentReceiptViews.getSize(),
                    paymentReceiptViews.getTotalElements(), paymentReceiptViews.getTotalPages(), paymentReceiptViews.isLast());
        }

        List<PaymentReceiptViewResponse> response =
                paymentReceiptViews.stream().map(payment -> new PaymentReceiptViewResponse(payment.getId(), payment.getClientName(),
                        payment.getStatus(), payment.getPaymentDate(), payment.getTotalPayment(), payment.getCurrencyName(),
                                payment.getCreated(), payment.getModified()))
                        .collect(Collectors.toList());

        return new PagedResponse<>(response, paymentReceiptViews.getNumber(), paymentReceiptViews.getSize(),
                paymentReceiptViews.getTotalElements(), paymentReceiptViews.getTotalPages(), paymentReceiptViews.isLast());
    }

    public PaymentReceiptResponse getPaymentReceipt(Long id) {
        PaymentReceipt payment = paymentReceiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PaymentReceipt", "id", id));

        StatusName[] statusList = {StatusName.ELABORADO, StatusName.ACTIVO};
        if (payment.getPaymentReceiptDetailList() == null || payment.getPaymentReceiptDetailList().isEmpty()) {
            payment.setPaymentReceiptDetailList(paymentReceiptDetailRepository.findAllByParentId(payment.getId(), statusList));
        }

        if (payment.getPaymentTransDets() == null || payment.getPaymentTransDets().isEmpty()) {
            payment.setPaymentTransDets(paymentTransDetRepository.findByParentId(payment.getId(), StatusName.ACTIVO));
        }

        return new PaymentReceiptResponse(payment.getId(), payment.getClient().getId(),
                String.join(" ", payment.getClient().getName(), (payment.getClient().getClientType() == 2 ?
                        payment.getClient().getLastName() : "").trim()), payment.getStatus(), payment.getPaymentDate(),
                payment.getTotalPayment(), payment.getComments(), payment.getCurrency().getId(), payment.getCurrency().getName(),
                payment.getExchangeRate(),
                payment.getPaymentReceiptDetailList().stream().filter(f -> f.getStatus() == StatusName.ACTIVO || f.getStatus() == StatusName.ELABORADO)
                        .map(det -> new PaymentReceiptDetailResponse(det.getId(), det.getReceipt().getId(), det.getPaymentBalance(), det.getStatus()))
                        .collect(Collectors.toList()),
                payment.getPaymentTransDets().stream().filter(f -> f.getStatus() == StatusName.ACTIVO)
                        .map(det -> new PaymentTransDetResponse(det.getId(), det.getBank() != null ? det.getBank().getId() : null,
                                det.getBank() != null ? det.getBank().getName() : "",
                                det.getTransactionType().getId(), det.getTransactionType().getName(), det.getStatus(),
                                det.getTotalTransaction(), det.getDocNumber()))
                        .collect(Collectors.toList())
                );
    }

    @Transactional
    public Long createPaymentReceipt(PaymentReceiptRequest request) {
        final Double[] totalTransaction = {0d};
        final Double[] totalInvoicePayment = {0d};

        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("PaymentReceipt", "clientId", request.getClientId()));

        Currency currency = currencyRepository.findById(request.getCurrencyId())
                .orElseThrow(() -> new ResourceNotFoundException("Currency", "id", request.getCurrencyId()));

        PaymentReceipt paymentReceipt = new PaymentReceipt(client, request.getStatus(), request.getPaymentDate(), request.getTotalPayment(),
                currency, request.getExchangeRate(), request.getComments());

        if (request.getId() != null) {
            paymentReceipt.setId(request.getId());
        }

        paymentReceiptRepository.save(paymentReceipt);

        List<PaymentTransDet> transDet = request.getTransactionDetailList()
                .stream()
                .map(det -> {
                    TransactionType transactionType = transactionTypeRepository.findById(det.getTransactionTypeId())
                            .orElseThrow(() -> new ResourceNotFoundException("PaymentReceipt", "transactionTypeId", det.getTransactionTypeId()));

                    Bank bank = null;
                    if (det.getBankId() != null) {
                        bank = bankRepository.findById(det.getBankId())
                                .orElse(new Bank());
                    }

                    PaymentTransDet newDetail = new PaymentTransDet(paymentReceipt, bank, transactionType, det.getStatus(), det.getDocNumber(), det.getTotalTransaction());
                    if (det.getId() != null) {
                        newDetail.setId(det.getId());
                    }
                    totalTransaction[0] += det.getTotalTransaction();
                    return newDetail;
                })
                .collect(Collectors.toList());

        paymentTransDetRepository.saveAll(transDet);

        List<PaymentReceiptDetail> details = request.getPaymentReceiptDetailList()
                .stream()
                .map(det -> {
                    Receipt receipt = receiptRepository.findById(det.getReceiptId()).orElseThrow(() -> new ResourceNotFoundException("PaymentReceipt", "receiptId", det.getReceiptId()));
                    PaymentReceiptDetail newDetail = new PaymentReceiptDetail(paymentReceipt, receipt, det.getPaymentBalance(), det.getStatus());
                    if (det.getId() != null) {
                        newDetail.setId(det.getId());
                    }
                    totalInvoicePayment[0] += det.getPaymentBalance();
                    return newDetail;
                })
                .collect(Collectors.toList());
        paymentReceiptDetailRepository.saveAll(details);

        if (totalTransaction[0] > totalInvoicePayment[0]) {
            AdvanceBalance result = advanceBalanceRepository.getAdvanceBalanceById(request.getId(), StatusName.ELABORADO);
            AdvanceBalance advanceBalance = new AdvanceBalance();
            if (result == null) {
                advanceBalance = new AdvanceBalance(paymentReceipt, totalTransaction[0] - totalInvoicePayment[0], StatusName.ELABORADO);
            } else {
                advanceBalance.setPaymentBalance(totalTransaction[0] - totalInvoicePayment[0]);
            }

            advanceBalanceRepository.save(advanceBalance);
        }

        return paymentReceipt.getId();
    }

    @Transactional
    public void changeStatus(ChanceStatusRequest request) throws Exception {
        String[] privilege = { "ROLE_USUARIO_ADMIN", "ROLE_" +
                statusService.getStatusFlowPrivilege(AppId.RECIBO_FACTURA, request.getStatus()) };
        if (!roleChecker.hasRole(privilege)) {
            throw new Exception("No posee accesos para realizar esta acción");
        }

        PaymentReceipt paymentReceipt = paymentReceiptRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("PaymentReceipt", "id", request.getId()));

        StatusHistory history = new StatusHistory(request.getId(), AppId.RECIBO_FACTURA, request.getComment(),
                paymentReceipt.getStatus(), request.getStatus());

        paymentReceipt.setStatus(request.getStatus());

        if (request.getStatus() == StatusName.APLICADO) {
            List<PaymentReceiptDetail> details = paymentReceiptDetailRepository.findAllByParentId(request.getId(), new StatusName[]{StatusName.ELABORADO, StatusName.ACTIVO});
            for (PaymentReceiptDetail det: details) {
                det.setStatus(StatusName.ACTIVO);
                paymentReceiptDetailRepository.save(det);

                Receipt receipt = det.getReceipt();
                if (receipt.getBalance() - det.getPaymentBalance() < 0) {
                    throw new Exception("No puede cambiar de estado, el pago aplicado excede el total de la factura");
                }
                receipt.setBalance(receipt.getBalance() - det.getPaymentBalance());
                receiptRepository.save(receipt);
            }
            AdvanceBalance result = advanceBalanceRepository.getAdvanceBalanceById(request.getId(), StatusName.ELABORADO);
            if (result.getId() != null) {
                result.setStatus(StatusName.ACTIVO);
                advanceBalanceRepository.save(result);
            }
        }

        paymentReceiptRepository.save(paymentReceipt);
        statusService.changeStatus(history);
    }
}

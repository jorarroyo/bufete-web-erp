package com.bufete.backend.service.billingProcess;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.appConfig.Currency;
import com.bufete.backend.model.billingProcess.Expenses;
import com.bufete.backend.model.billingProcess.ExpensesDetail;
import com.bufete.backend.model.billingProcess.ExpensesView;
import com.bufete.backend.model.catalogs.Concept;
import com.bufete.backend.model.catalogs.Provider;
import com.bufete.backend.model.recordFiles.RecordFile;
import com.bufete.backend.model.shared.StatusHistory;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.billingProcess.ExpensesDetailRequest;
import com.bufete.backend.payload.billingProcess.ExpensesRequest;
import com.bufete.backend.payload.billingProcess.ExpensesResponseView;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.repository.appConfig.CurrencyRepository;
import com.bufete.backend.repository.billingProcess.ExpenseDetailRepository;
import com.bufete.backend.repository.billingProcess.ExpenseRepository;
import com.bufete.backend.repository.catalogs.ConceptRepository;
import com.bufete.backend.repository.catalogs.ProviderRepository;
import com.bufete.backend.repository.recordFiles.RecordFileRepository;
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

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

@Service
public class ExpensesService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private ExpenseDetailRepository expenseDetailRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private StatusService statusService;

    @Autowired
    private RoleChecker roleChecker;

    @Autowired
    private ConceptRepository conceptRepository;

    @Autowired
    private RecordFileRepository recordFileRepository;

    @Autowired
    private CurrencyRepository currencyRepository;

    public PagedResponse<ExpensesResponseView> getAllExpenses(UserPrincipal currentUser, int page, int size,
                                                              String searchText, String sort, String direction) {
        Validators.validatePageNumberAndSize(page, size);
        StatusName[] disabledStatuses = {StatusName.ELIMINADO};
        Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
                Validators.toCamelCase(sort));
        Page<ExpensesView> expenses = expenseRepository.getPagedExpenses(searchText, disabledStatuses, pageable);

        if (expenses.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), expenses.getNumber(), expenses.getSize(),
                    expenses.getTotalElements(), expenses.getTotalPages(), expenses.isLast());
        }

        List<ExpensesResponseView> expensesResponse =
                expenses.stream()
                        .map(expense -> new ExpensesResponseView(expense.getId(), expense.getExpensesDate(),
                        expense.getExpensesType(),
                expense.getExpensesNum(), expense.getProviderName(), expense.getConceptName(),
                expense.getStatus(), expense.getExchangeRate(), expense.getExpensesCurrency(),
                expense.getExpensesTotal(), expense.getCreated(), expense.getModified()))
                        .collect(Collectors.toList());

        return new PagedResponse<>(expensesResponse, expenses.getNumber(), expenses.getSize(),
                expenses.getTotalElements(), expenses.getTotalPages(), expenses.isLast());
    }

    public ExpensesRequest getExpenseById(Long id) {
        Expenses expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expenses", "id", id));
        List<ExpensesDetailRequest> expenseDetailsList = expenseRepository.getExpenseDetailsByExpenseId(id).stream().map(expDet -> {
            return new ExpensesDetailRequest(expDet.getId(), expDet.getFileRecordId(), expDet.getStatus(), expDet.getExpenseValue(), expDet.getRecordClientName(), expDet.getRecordFileName());
        }).collect(Collectors.toList());
        ExpensesRequest expensesRequest = new ExpensesRequest(
                expense.getId(),
                expense.getExpensesDate(),
                expense.getExpensesType(),
                expense.getExpensesNum(),
                expense.getProvider().getId(),
                expense.getProvider().getName(),
                expense.getConcept().getId(),
                expense.getConcept().getName(),
                expense.getStatus(),
                expense.getExchangeRate(),
                expense.getExpensesCurrency().getId(),
                expense.getExpensesTotal(),
                expenseDetailsList);
        return expensesRequest;
    }

    @Transactional
    public Long createExpense(ExpensesRequest request) {
        Provider provider = providerRepository.findById(request.getProviderId())
                .orElseThrow(() -> new ResourceNotFoundException("Provider", "id", request.getProviderId()));

        Concept concept = conceptRepository.findById(request.getConceptId())
                .orElseThrow(() -> new ResourceNotFoundException("Concept", "id", request.getConceptId()));

        Currency currency = currencyRepository.findById(request.getExpensesCurrency())
                .orElseThrow(() -> new ResourceNotFoundException("Currency", "id", request.getExpensesCurrency()));

        Expenses expense = new Expenses(request.getExpensesDate(), request.getExpensesType(), request.getExpensesNum(),
                provider, concept, request.getStatus(), request.getExchangeRate(), currency,
                request.getExpensesTotal());


        if (request.getId() != null) {
            expense.setId(request.getId());
        }
        expenseRepository.save(expense);

        if (request.getDetails().size() > 0) {
            List<ExpensesDetail> details = request.getDetails().stream()
                    .map(detailRequest -> {
                        RecordFile recordFile = recordFileRepository.findById(detailRequest.getRecordFileId())
                                .orElseThrow(() -> new ResourceNotFoundException("RecordFile", "id", detailRequest.getRecordFileId()));
                        ExpensesDetail expensesDetail = new ExpensesDetail(
                                expense,
                                recordFile,
                                detailRequest.getExpenseValue()
                        );
                        if (detailRequest.getId() != null){
                            expensesDetail.setId(detailRequest.getId());
                            expensesDetail.setStatus(detailRequest.getStatus());
                        }
                        return expensesDetail;
                    }).collect(Collectors.toList());

            expenseDetailRepository.saveAll(details);
        }
        return expense.getId();
    }
    @Transactional
    public void changeStatus(StatusHistoryRequest request) throws Exception {
        String[] privilege = { "ROLE_USUARIO_ADMIN", "ROLE_" +
                statusService.getStatusFlowPrivilege(AppId.DOCUMENTO_GASTO, request.getStatus()) };
        if (!roleChecker.hasRole(privilege)) {
            throw new Exception("No posee accesos para realizar esta acción");
        }
        Expenses expenses = expenseRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Expenses", "id", request.getId()));

        StatusHistory history = new StatusHistory(
                request.getId(),
                AppId.DOCUMENTO_GASTO,
                request.getComment(),
                expenses.getStatus(),
                request.getStatus()
        );
        expenses.setStatus(request.getStatus());
        expenseRepository.save(expenses);
        statusService.changeStatus(history);
    }
}

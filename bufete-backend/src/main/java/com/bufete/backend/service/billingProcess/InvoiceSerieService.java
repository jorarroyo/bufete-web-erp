package com.bufete.backend.service.billingProcess;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.billingProcess.InvoiceSerie;
import com.bufete.backend.model.billingProcess.InvoiceSerieView;
import com.bufete.backend.model.billingProcess.Receipt;
import com.bufete.backend.model.shared.StatusHistory;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.billingProcess.InvoiceSerieRequest;
import com.bufete.backend.payload.billingProcess.InvoiceSerieResponse;
import com.bufete.backend.payload.billingProcess.InvoiceSerieResponseView;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.repository.billingProcess.InvoiceSerieRepository;
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
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceSerieService {

    @Autowired
    private InvoiceSerieRepository invoiceSerieRepository;

    @Autowired
    private StatusService statusService;

    @Autowired
    private RoleChecker roleChecker;

    public PagedResponse<InvoiceSerieResponseView> getAllInvoiceSeries(UserPrincipal currentUser, int page, int size,
                                                                            String searchText, String sort, String direction) {
        Validators.validatePageNumberAndSize(page, size);
        StatusName[] disabledStatuses = {StatusName.ELIMINADO};
        Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
                Validators.toCamelCase(sort));

        Page<InvoiceSerieView> invoiceSerieViews = invoiceSerieRepository.getPagedInvoiceSeries(searchText, disabledStatuses, pageable);

        if (invoiceSerieViews.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), invoiceSerieViews.getNumber(), invoiceSerieViews.getSize(),
                    invoiceSerieViews.getTotalElements(), invoiceSerieViews.getTotalPages(), invoiceSerieViews.isLast());
        }

        List<InvoiceSerieResponseView> response =
                invoiceSerieViews
                .stream()
                .map(invoice -> new InvoiceSerieResponseView(invoice.getId(), invoice.getSerieName(), invoice.getSerieValue(),
                        invoice.getStatus(), invoice.getCreated(), invoice.getModified()))
                .collect(Collectors.toList());

        return new PagedResponse<>(response, invoiceSerieViews.getNumber(), invoiceSerieViews.getSize(),
                invoiceSerieViews.getTotalElements(), invoiceSerieViews.getTotalPages(), invoiceSerieViews.isLast());
    }

    public List<InvoiceSerieResponse> getInvoiceSeriesList() {
        return invoiceSerieRepository.findAll()
                .stream()
                .filter(s -> s.getStatus() != StatusName.ELIMINADO)
                .map(d -> new InvoiceSerieResponse(d.getId(), d.getSerieName(), d.getSerieValue()))
                .collect(Collectors.toList());
    }

    public InvoiceSerieResponse getInvoiceSeries(Long id) {
        InvoiceSerie invoiceSerie = invoiceSerieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("InvoiceSeries", "id", id));

        return new InvoiceSerieResponse(invoiceSerie.getId(), invoiceSerie.getSerieName(), invoiceSerie.getSerieValue());
    }

    @Transactional
    public Long createInvoiceSeries(InvoiceSerieRequest request) {
        InvoiceSerie invoiceSerie = new InvoiceSerie(request.getSerieName(), request.getSerieValue(), request.getStatus());
        if (request.getId() != null) {
            invoiceSerie.setId(request.getId());
        }

        invoiceSerieRepository.save(invoiceSerie);
        return invoiceSerie.getId();
    }

    @Transactional
    public void changeStatus(StatusHistoryRequest request) throws Exception {
        String[] privilege = { "ROLE_USUARIO_ADMIN", "ROLE_" +
                statusService.getStatusFlowPrivilege(AppId.FACTURACION, request.getStatus()) };
        if (!roleChecker.hasRole(privilege)) {
            throw new Exception("No posee accesos para realizar esta acción");
        }

        InvoiceSerie invoiceSerie = invoiceSerieRepository.findById(request.getId())
                .orElseThrow(() -> new ResourceNotFoundException("InvoiceSeries", "id", request.getId()));

        StatusHistory history = new StatusHistory(request.getId(), AppId.FACTURACION, request.getComment(),
                invoiceSerie.getStatus(), request.getStatus());

        invoiceSerie.setStatus(request.getStatus());

        invoiceSerieRepository.save(invoiceSerie);
        statusService.changeStatus(history);
    }
}

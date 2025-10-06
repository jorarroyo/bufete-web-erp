package com.bufete.backend.controller.billingProcess;

import com.bufete.backend.payload.billingProcess.InvoiceSerieRequest;
import com.bufete.backend.payload.billingProcess.InvoiceSerieResponse;
import com.bufete.backend.payload.billingProcess.InvoiceSerieResponseView;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.billingProcess.InvoiceSerieService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/series")
public class InvoiceSerieController {

    @Autowired
    private InvoiceSerieService invoiceSerieService;

    @GetMapping
    @Secured({RoleConstants.SERIE_FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public PagedResponse<InvoiceSerieResponseView> getPagedInvoiceSeries(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(value = "search", defaultValue = "") String search,
            @RequestParam(value = "sort", defaultValue = "") String sort,
            @RequestParam(value = "direction", defaultValue = "") String direction) {
        return invoiceSerieService.getAllInvoiceSeries(currentUser, page, size, search, sort, direction);
    }

    @GetMapping("/{id}")
    @Secured({RoleConstants.SERIE_FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public InvoiceSerieResponse getInvoiceSeriesById(@PathVariable Long id) {
        return invoiceSerieService.getInvoiceSeries(id);
    }

    @GetMapping("/list")
    @Secured({RoleConstants.SERIE_FACTURA_LECTURA, RoleConstants.FACTURA_LISTADO_SERIES, RoleConstants.USUARIO_ADMIN})
    public List<InvoiceSerieResponse> getAllInvoiceSeries() {
        return invoiceSerieService.getInvoiceSeriesList();
    }

    @PostMapping
    @Secured({RoleConstants.SERIE_FACTURA_CREA, RoleConstants.USUARIO_ADMIN})
    public InvoiceSerieResponse createInvoiceSeries(@Valid @RequestBody InvoiceSerieRequest request) {
        Long id = invoiceSerieService.createInvoiceSeries(request);
        return invoiceSerieService.getInvoiceSeries(id);
    }

    @PatchMapping
    @Secured({RoleConstants.SERIE_FACTURA_CAMBIA_ESTADO, RoleConstants.USUARIO_ADMIN})
    public void statusChange(@Valid @RequestBody StatusHistoryRequest changeStatusRequest) throws Exception {
        invoiceSerieService.changeStatus(changeStatusRequest);
    }
}

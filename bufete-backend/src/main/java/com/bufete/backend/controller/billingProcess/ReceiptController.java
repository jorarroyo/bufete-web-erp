package com.bufete.backend.controller.billingProcess;

import com.bufete.backend.payload.billingProcess.*;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.accountReceivable.ReceiptsPaymentDetailResponse;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.billingProcess.ReceiptService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/receipt")
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;

    @GetMapping
    @Secured({RoleConstants.FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public PagedResponse<ReceiptResponseView> getPagedReceipt(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(value = "search", defaultValue = "") String search,
            @RequestParam(value = "sort", defaultValue = "") String sort,
            @RequestParam(value = "direction", defaultValue = "") String direction) {
        return receiptService.getAllReceipts(currentUser, page, size, search, sort, direction);
    }

    @GetMapping("/{id}")
    @Secured({RoleConstants.FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public ReceiptResponse getReceiptById(@PathVariable Long id) {
        return receiptService.getReceipt(id);
    }

    @GetMapping("/fel/{id}")
    @Secured({RoleConstants.FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public FELReceiptResponse getReceiptFelById(@PathVariable Long id) { return receiptService.getFELReceipt(id); }

    @PostMapping
    @Secured({RoleConstants.FACTURA_CREA, RoleConstants.USUARIO_ADMIN})
    public ReceiptResponse createReceipt(@Valid @RequestBody ReceiptRequest request) {
        Long id = receiptService.createReceipt(request);
        return receiptService.getReceipt(id);
    }

    @GetMapping("/generate/{settleId}")
    @Secured({RoleConstants.FACTURA_CREA, RoleConstants.USUARIO_ADMIN})
    public ReceiptResponse generateNewReceipt(@PathVariable Long settleId) throws Exception {
        Long id = receiptService.generateReceipt(settleId);
        return receiptService.getReceipt(id);
    }

    @PatchMapping
    @Secured({RoleConstants.FACTURA_CAMBIA_ESTADO, RoleConstants.FACTURA_AUTORIZA, RoleConstants.USUARIO_ADMIN})
    public void statusChange(@Valid @RequestBody ChanceStatusRequest changeStatusRequest) throws Exception {
        receiptService.changeStatus(changeStatusRequest);
    }

    @PostMapping("/report")
    @Secured({RoleConstants.REPORTES_FACTURA_MENU, RoleConstants.LISTADO_FACTURA_MENU, RoleConstants.USUARIO_ADMIN})
    public List<ReceiptReportResponse> getReceiptReport(@Valid @RequestBody ReceiptReportRequest request) {
        return receiptService.getReceiptReport(request);
    }

    @GetMapping("/balance")
    @Secured({RoleConstants.FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public List<ReceiptsPaymentDetailResponse> getReceiptBalance(@RequestParam(value = "clientId") Long clientId,
                                                                 @RequestParam(value = "currencyId") Long currencyId,
                                                                 @RequestParam(value = "paymentId", required = false) Long paymentId) {
        return receiptService.getReceiptsBalanceList(clientId, currencyId, paymentId);
    }
}

package com.bufete.backend.controller.billingProcess;

import com.bufete.backend.model.accountReceivable.AdvanceBalance;
import com.bufete.backend.payload.accountReceivable.AdvanceBalanceResponse;
import com.bufete.backend.payload.billingProcess.FeesReceiptSettleListResponse;
import com.bufete.backend.payload.billingProcess.ReceiptSettleReportRequest;
import com.bufete.backend.payload.billingProcess.ReceiptSettleResponseView;
import com.bufete.backend.payload.billingProcess.ReceiptSettlementRequest;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.billingProcess.ReceiptSettlementService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/receipt_settlement")
public class ReceiptSettlementController {

    @Autowired
    private ReceiptSettlementService receiptSettlementService;

    @GetMapping
    @Secured({RoleConstants.LIQUIDACION_FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public PagedResponse<ReceiptSettleResponseView> getPagedReceiptSettlement(@CurrentUser UserPrincipal currentUser,
          @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
          @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
          @RequestParam(value = "search", defaultValue = "") String search,
          @RequestParam(value = "sort", defaultValue = "") String sort,
          @RequestParam(value = "direction", defaultValue = "") String direction) {
        return receiptSettlementService.getAllReceiptSettlements(currentUser, page, size, search, sort, direction);
    }

    @GetMapping("/{id}")
    @Secured({RoleConstants.LIQUIDACION_FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public ReceiptSettlementRequest getReceiptSettleById(@PathVariable Long id) {
        return receiptSettlementService.getReceiptSettlement(id);
    }

    @GetMapping("/fees/{clientId}/{settlementId}")
    @Secured({RoleConstants.LIQUIDACION_FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public FeesReceiptSettleListResponse getFeesByClientId(@PathVariable Long clientId, @PathVariable Long settlementId) {
        return receiptSettlementService.getFeesByClientId(clientId, settlementId);
    }

    @PostMapping
    @Secured({RoleConstants.LIQUIDACION_FACTURA_CREA, RoleConstants.USUARIO_ADMIN})
    public ReceiptSettlementRequest createReceiptSettlement(@Valid @RequestBody ReceiptSettlementRequest request) {
        Long id = receiptSettlementService.createReceiptSettlement(request);
        return receiptSettlementService.getReceiptSettlement(id);
    }

    @PostMapping("/detail")
    @Secured({RoleConstants.LIQUIDACION_FACTURA_CREA, RoleConstants.USUARIO_ADMIN})
    public ReceiptSettlementRequest createReceiptSettlementDetail(@Valid @RequestBody ReceiptSettlementRequest request) {
        Long id = receiptSettlementService.saveDetail(request);
        return receiptSettlementService.getReceiptSettlement(id);
    }

    @PatchMapping
    @Secured({RoleConstants.LIQUIDACION_FACTURA_CAMBIA_ESTADO, RoleConstants.LIQUIDACION_FACTURA_AUTORIZA, RoleConstants.USUARIO_ADMIN})
    public void statusChange(@Valid @RequestBody StatusHistoryRequest changeStatusRequest) throws Exception {
        receiptSettlementService.changeStatus(changeStatusRequest);
    }

    @PostMapping("/report")
    @Secured({RoleConstants.LIQUIDACION_FACTURA_GENERAR_REPORTE, RoleConstants.USUARIO_ADMIN})
    public ReceiptSettleReportRequest createReport(@Valid @RequestBody ReceiptSettleReportRequest request) {
        Long id = receiptSettlementService.createReceiptSettleReport(request);
        return receiptSettlementService.getReceiptSettleReport(request.getReceiptSettlementId());
    }

    @GetMapping("/report/{settleId}")
    @Secured({RoleConstants.LIQUIDACION_FACTURA_GENERAR_REPORTE, RoleConstants.USUARIO_ADMIN})
    public ReceiptSettleReportRequest createReport(@PathVariable Long settleId) {
        return receiptSettlementService.getReceiptSettleReport(settleId);
    }

    @GetMapping("/advance_balance/{clientId}")
    @Secured({RoleConstants.LIQUIDACION_FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public List<AdvanceBalanceResponse> getAdvanceBalanceByClientId(@PathVariable Long clientId) {
        return receiptSettlementService.getAdvanceBalanceList(clientId);
    }
}

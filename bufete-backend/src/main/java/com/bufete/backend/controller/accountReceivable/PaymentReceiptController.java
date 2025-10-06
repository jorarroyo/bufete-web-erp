package com.bufete.backend.controller.accountReceivable;

import com.bufete.backend.payload.billingProcess.ChanceStatusRequest;
import com.bufete.backend.payload.accountReceivable.PaymentReceiptRequest;
import com.bufete.backend.payload.accountReceivable.PaymentReceiptResponse;
import com.bufete.backend.payload.accountReceivable.PaymentReceiptViewResponse;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.accountReceivable.PaymentReceiptService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/payment_receipt")
public class PaymentReceiptController {

    @Autowired
    private PaymentReceiptService paymentReceiptService;

    @GetMapping
    @Secured({RoleConstants.RECIBO_FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public PagedResponse<PaymentReceiptViewResponse> getPagedPaymentReceipt(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(value = "search", defaultValue = "") String search,
            @RequestParam(value = "sort", defaultValue = "") String sort,
            @RequestParam(value = "direction", defaultValue = "") String direction) {
        return paymentReceiptService.getAllPaymentReceipt(currentUser, page, size, search, sort, direction);
    }

    @GetMapping("/{id}")
    @Secured({RoleConstants.RECIBO_FACTURA_LECTURA, RoleConstants.USUARIO_ADMIN})
    public PaymentReceiptResponse getPaymentReceiptById(@PathVariable Long id) {
        return paymentReceiptService.getPaymentReceipt(id);
    }

    @PostMapping
    @Secured({RoleConstants.RECIBO_FACTURA_CREA, RoleConstants.USUARIO_ADMIN})
    public PaymentReceiptResponse createPaymentReceipt(@Valid @RequestBody PaymentReceiptRequest request) {
        Long id = paymentReceiptService.createPaymentReceipt(request);
        return paymentReceiptService.getPaymentReceipt(id);
    }

    @PatchMapping
    @Secured({RoleConstants.RECIBO_FACTURA_CAMBIA_ESTADO, RoleConstants.USUARIO_ADMIN})
    public void statusChange(@Valid @RequestBody ChanceStatusRequest changeStatusRequest) throws Exception {
        paymentReceiptService.changeStatus(changeStatusRequest);
    }
}

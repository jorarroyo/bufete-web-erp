package com.bufete.backend.controller.billingProcess;

import com.bufete.backend.payload.billingProcess.ExpensesRequest;
import com.bufete.backend.payload.billingProcess.ExpensesResponseView;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.billingProcess.ExpensesService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/expenses")
public class ExpensesController {

    @Autowired
    private ExpensesService expensesService;

    @GetMapping
    @Secured({RoleConstants.DOCUMENTOS_GASTOS_LECTURA, RoleConstants.USUARIO_ADMIN})
    public PagedResponse<ExpensesResponseView> getPagedExpenses(@CurrentUser UserPrincipal currentUser,
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(value = "search", defaultValue = "") String search,
            @RequestParam(value = "sort", defaultValue = "") String sort,
            @RequestParam(value = "direction", defaultValue = "") String direction) {
        return expensesService.getAllExpenses(currentUser, page, size, search, sort, direction);
    }

    @GetMapping("/{expenseId}")
    @Secured({RoleConstants.DOCUMENTOS_GASTOS_LECTURA, RoleConstants.USUARIO_ADMIN})
    public ExpensesRequest getExpenseById(@PathVariable Long expenseId) {
        return expensesService.getExpenseById(expenseId);
    }

    @PostMapping
    @Secured({RoleConstants.DOCUMENTOS_GASTOS_CREA, RoleConstants.USUARIO_ADMIN})
    public ExpensesRequest createExpense(@Valid @RequestBody ExpensesRequest request) {
        Long expenseId = expensesService.createExpense(request);
        return expensesService.getExpenseById(expenseId);
    }
    @PatchMapping
    @Secured({ RoleConstants.DOCUMENTOS_GASTOS_CAMBIA_ESTADO, RoleConstants.DOCUMENTOS_GASTOS_AUTORIZA, RoleConstants.USUARIO_ADMIN })
    public void statusChange(@Valid @RequestBody StatusHistoryRequest changeStatusRequests) throws Exception {
        expensesService.changeStatus(changeStatusRequests);
    }
}

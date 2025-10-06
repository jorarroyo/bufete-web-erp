package com.bufete.backend.controller.recordFiles;

import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.recordFiles.EmployeeRequest;
import com.bufete.backend.payload.recordFiles.EmployeesResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.recordFiles.EmployeeService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  @GetMapping
  @Secured({ RoleConstants.EMPLEADO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public PagedResponse<EmployeesResponse> getEmployees(@CurrentUser UserPrincipal currentUser,
      @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
      @RequestParam(value = "search", defaultValue = "") String search,
      @RequestParam(value = "sort", defaultValue = "") String sort,
      @RequestParam(value = "direction", defaultValue = "") String direction) {
    return employeeService.getAllEmployees(currentUser, page, size, search, sort, direction);
  }

  @GetMapping("/active")
  @Secured({ RoleConstants.EMPLEADO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<ShareCatResponse> getActiveEmps() {
    return employeeService.getActiveEmployees();
  }

  @GetMapping("/position/{positionId}")
  @Secured({ RoleConstants.EMPLEADO_LECTURA, RoleConstants.USUARIO_LISTADO_EMPLEADOS,
      RoleConstants.EXPEDIENTE_LISTADO_EMPLEADOS, RoleConstants.EXPEDIENTE_ACTIVIDAD_LISTADO_EMPLEADOS,
      RoleConstants.USUARIO_ADMIN, RoleConstants.TIMBRE_FISCAL_INVENTARIO_LISTADO_EMPLEADOS })
  public List<ShareCatResponse> getEmpsByPosition(@PathVariable Long[] positionId) {
    return employeeService.getEmployeesByPosition(positionId);
  }

  @GetMapping("{employeeId}")
  @Secured({ RoleConstants.EMPLEADO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public EmployeeRequest getEmployeeRequestById(@PathVariable Long employeeId) {
    return employeeService.getEmployee(employeeId);
  }

  @PostMapping
  @Secured({ RoleConstants.EMPLEADO_CREA, RoleConstants.USUARIO_ADMIN })
  public EmployeeRequest createEmployee(@Valid @RequestBody EmployeeRequest employeeRequest) {
    EmployeeRequest employee = employeeService.createEmployee(employeeRequest);
    return employee;
  }

  @PostMapping("/delete")
  @Secured({ RoleConstants.EMPLEADO_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public boolean deleteEmployee(@Valid @RequestBody List<Long> employeeList) {
    return employeeService.deleteEmployee(employeeList);
  }

  @GetMapping("/amount/{employeeId}")
  @Secured({ RoleConstants.EMPLEADO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public Double getAmount(@PathVariable Long employeeId) {
    return employeeService.getAmountByEmployee(employeeId);
  }
}
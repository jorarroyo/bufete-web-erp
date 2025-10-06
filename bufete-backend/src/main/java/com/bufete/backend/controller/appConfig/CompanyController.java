package com.bufete.backend.controller.appConfig;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.model.appConfig.Company;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.payload.appConfig.CompanyRequest;
import com.bufete.backend.payload.appConfig.CompanyResponse;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.appConfig.CompanyService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/company")
public class CompanyController {

  @Autowired
  private CompanyService companyService;

  @GetMapping
  @Secured({ RoleConstants.EMPRESA_LECTURA, RoleConstants.USUARIO_ADMIN })
  public PagedResponse<CompanyResponse> getCompanies(@CurrentUser UserPrincipal currentUser,
      @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
    return companyService.getAllCompanies(currentUser, page, size);
  }

  @PostMapping
  @Secured({ RoleConstants.EMPRESA_CREA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> createCompany(@Valid @RequestBody CompanyRequest companyRequest) {
    Company company = companyService.createCompany(companyRequest);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{companyId}").buildAndExpand(company.getId())
        .toUri();

    return ResponseEntity.created(location).body(new ApiResponse(true, "Empresa creada con éxito!!"));
  }

  @GetMapping("/{companyId}")
  @Secured({ RoleConstants.EMPRESA_LECTURA, RoleConstants.USUARIO_ADMIN })
  public Company getCompanyById(@PathVariable Long companyId) {
    return companyService.getCompanyById(companyId);
  }

  @PutMapping
  @Secured({ RoleConstants.EMPRESA_MODIFICA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> updateCompany(@Valid @RequestBody CompanyRequest companyRequest) {
    companyService.updateCompany(companyRequest);
    return ResponseEntity.ok(new ApiResponse(true, "Empresa actualizada con éxito!!!"));
  }

  @DeleteMapping("/{companyId}")
  @Secured({ RoleConstants.EMPRESA_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> deleteCompany(@PathVariable Long companyId) {
    companyService.deleteCompany(companyId);
    return ResponseEntity.ok(new ApiResponse(true, "Empresa eliminada con éxito!!!"));
  }

  @GetMapping("/list/{params}")
  @Secured({ RoleConstants.EMPRESA_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<Company> getAllCompanies(@PathVariable String params) {
    return companyService.getCompanyList(params);
  }
}
package com.bufete.backend.controller.catalogs;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.model.catalogs.Institution;
import com.bufete.backend.model.catalogs.InstitutionView;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.catalogs.InstitutionRequest;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.service.catalogs.InstitutionService;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/institution")
public class InstitutionController {

  @Autowired
  private InstitutionService institutionService;

  @GetMapping("/list/{params}")
  @Secured({ RoleConstants.INSTITUCION_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<InstitutionView> getAllCompanies(@PathVariable String params) {
    return institutionService.getInstitutionList(params);
  }
  
  @GetMapping("/{institutionId}")
  @Secured({ RoleConstants.INSTITUCION_LECTURA, RoleConstants.USUARIO_ADMIN })
  public InstitutionRequest getInstitutionById(@PathVariable Long institutionId) {
    return institutionService.getInstitutionById(institutionId);
  }

  @PostMapping
  @Secured({ RoleConstants.INSTITUCION_CREA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> createInstitution(@Valid @RequestBody InstitutionRequest institutionRequest) {
    Institution institution = institutionService.createInstitution(institutionRequest);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{institutionId}").buildAndExpand(institution.getId())
        .toUri();

    return ResponseEntity.created(location).body(new ApiResponse(true, "Institución creada con éxito!!"));
  }

  @PutMapping
  @Secured({ RoleConstants.INSTITUCION_MODIFICA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> updateInstitution(@Valid @RequestBody InstitutionRequest institutionRequest) {
    institutionService.updateInstitution(institutionRequest);
    return ResponseEntity.ok(new ApiResponse(true, "Institución actualizada con éxito!!!"));
  }

  @DeleteMapping("/{institutionId}")
  @Secured({ RoleConstants.INSTITUCION_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> deleteInstitution(@PathVariable Long institutionId) {
    institutionService.deleteInstitution(institutionId);
    return ResponseEntity.ok(new ApiResponse(true, "Institución eliminada con éxito!!!"));
  }

  @GetMapping("/status/{status}")
  @Secured({ RoleConstants.INSTITUCION_LECTURA, RoleConstants.EXPEDIENTE_ACTIVIDAD_LISTADO_INSTITUCION, RoleConstants.USUARIO_ADMIN })
  public List<ShareCatResponse> getInstitutionByStatus(@PathVariable StatusName status) {
    return institutionService.getInstitutionByStatus(status);
  }
}
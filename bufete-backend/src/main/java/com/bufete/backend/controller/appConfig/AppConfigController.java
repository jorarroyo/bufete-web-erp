package com.bufete.backend.controller.appConfig;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.model.appConfig.AppConfiguration;
import com.bufete.backend.payload.appConfig.AppConfigRequest;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.appConfig.AppConfigService;
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
@RequestMapping("/api/app-config")
public class AppConfigController {

  @Autowired
  private AppConfigService appConfigService;

  @PostMapping
  @Secured({ RoleConstants.CONFIGURACION_CREA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> createAppConfig(@Valid @RequestBody AppConfigRequest companyRequest) {
    AppConfiguration appConfig = appConfigService.createAppConfig(companyRequest);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{appConfigId}").buildAndExpand(appConfig.getId())
        .toUri();

    return ResponseEntity.created(location).body(new ApiResponse(true, "Configuración creada con éxito!!"));
  }

  @GetMapping("/{appConfigId}")
  @Secured({ RoleConstants.CONFIGURACION_LECTURA, RoleConstants.USUARIO_ADMIN })
  public AppConfigRequest getAppConfigById(@PathVariable Long appConfigId) {
    return appConfigService.getAppConfigById(appConfigId);
  }

  @PutMapping
  @Secured({ RoleConstants.CONFIGURACION_MODIFICA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> updateAppConfig(@Valid @RequestBody AppConfigRequest companyRequest) {
    appConfigService.updateAppConfig(companyRequest);
    return ResponseEntity.ok(new ApiResponse(true, "Configuración actualizada con éxito!!!"));
  }

  @DeleteMapping("/{appConfigId}")
  @Secured({ RoleConstants.CONFIGURACION_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> deleteAppConfig(@PathVariable Long appConfigId) {
    appConfigService.deleteAppConfig(appConfigId);
    return ResponseEntity.ok(new ApiResponse(true, "Configuración eliminada con éxito!!!"));
  }

  @GetMapping("/list/{params}")
  @Secured({ RoleConstants.CONFIGURACION_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<AppConfigRequest> getAllAppConfig(@CurrentUser UserPrincipal currentUser, @PathVariable String params) {
    return appConfigService.getAppConfigList(params, currentUser.getCompanyId());
  }
  
}
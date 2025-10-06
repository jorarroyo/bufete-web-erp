package com.bufete.backend.controller.appConfig;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.model.appConfig.Role;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.payload.appConfig.RoleRequest;
import com.bufete.backend.payload.appConfig.RoleResponse;
import com.bufete.backend.service.appConfig.RoleService;
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
@RequestMapping("/api/roles")
public class RoleController {

  @Autowired
  private RoleService roleService;

  @GetMapping("/list/{params}")
  @Secured({ RoleConstants.ROL_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<RoleResponse> getAllRoles(@PathVariable String params) {
    return roleService.getRolesList(params);
  }

  @PostMapping
  @Secured({ RoleConstants.ROL_CREA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> createRole(@Valid @RequestBody RoleRequest roleRequest) {
    Role role = roleService.createRole(roleRequest);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{roleId}").buildAndExpand(role.getId())
        .toUri();

    return ResponseEntity.created(location).body(new ApiResponse(true, "Rol creado con éxito!!!"));
  }

  @GetMapping("/{roleId}")
  @Secured({ RoleConstants.ROL_LECTURA, RoleConstants.USUARIO_ADMIN })
  public RoleRequest getRoleById(@PathVariable Long roleId) {
    return roleService.getRoleById(roleId);
  }

  @PutMapping
  @Secured({ RoleConstants.ROL_MODIFICA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> updateRole(@Valid @RequestBody RoleRequest roleRequest) {
    roleService.updateRole(roleRequest);
    return ResponseEntity.ok(new ApiResponse(true, "Rol actualizada con éxito!!!"));
  }

  @DeleteMapping("/{roleId}")
  @Secured({ RoleConstants.ROL_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> deleteRole(@PathVariable Long roleId) {
    roleService.deleteRole(roleId);
    return ResponseEntity.ok(new ApiResponse(true, "Rol eliminado con éxito!!!"));
  }
}
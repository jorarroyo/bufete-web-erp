package com.bufete.backend.controller.catalogs;

import com.bufete.backend.model.catalogs.Provider;
import com.bufete.backend.payload.catalogs.ProviderRequest;
import com.bufete.backend.payload.catalogs.ProviderResponse;
import com.bufete.backend.payload.catalogs.ProviderResponseView;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.service.catalogs.ProviderService;
import com.bufete.backend.util.RoleConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/provider")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    @GetMapping("/list/{params}")
    @Secured({RoleConstants.PROVEEDOR_LECTURA, RoleConstants.USUARIO_ADMIN})
    public List<ProviderResponseView> getAllProviders(@PathVariable String params) {
        return providerService.getProviderList(params);
    }

    @GetMapping("/{providerId}")
    @Secured({RoleConstants.PROVEEDOR_LECTURA, RoleConstants.USUARIO_ADMIN})
    public ProviderResponse getProviderById(@PathVariable Long providerId) {
        return providerService.getProviderById(providerId);
    }

    @PostMapping
    @Secured({RoleConstants.PROVEEDOR_CREA, RoleConstants.USUARIO_ADMIN})
    public ResponseEntity<?> createProvider(@Valid @RequestBody ProviderRequest providerRequest) {
        Provider provider = providerService.createProvider(providerRequest);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{providerId}")
                .buildAndExpand(provider.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Proveedor creado con éxito!!"));
    }

    @PutMapping
    @Secured({RoleConstants.PROVEEDOR_MODIFICA, RoleConstants.USUARIO_ADMIN})
    public ResponseEntity<?> updateProvider(@Valid @RequestBody ProviderRequest providerRequest) {
        providerService.updateProvider(providerRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Proveedor actualizado con éxito!!"));
    }

    @DeleteMapping("/{providerId}")
    @Secured({RoleConstants.PROVEEDOR_ELIMINA, RoleConstants.USUARIO_ADMIN})
    public ResponseEntity<?> deleteProvider(@PathVariable Long providerId) {
        providerService.deleteProvider(providerId);
        return ResponseEntity.ok(new ApiResponse(true, "Proveedor eliminado con éxito!!"));
    }

    @GetMapping("/search")
    @Secured({RoleConstants.PROVEEDOR_LECTURA, RoleConstants.USUARIO_ADMIN, RoleConstants.DOCUMENTOS_GASTOS_PROVEEDORES})
    public List<ProviderResponse> searchProviders(@RequestParam(value = "params", required = false) String params) {
        return providerService.searchProviderByCodeAndName(params);
    }
}

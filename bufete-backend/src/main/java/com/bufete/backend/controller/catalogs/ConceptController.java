package com.bufete.backend.controller.catalogs;

import com.bufete.backend.model.catalogs.Concept;
import com.bufete.backend.payload.catalogs.ConceptRequest;
import com.bufete.backend.payload.catalogs.ConceptResponse;
import com.bufete.backend.payload.catalogs.ConceptResponseView;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.service.catalogs.ConceptService;
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
@RequestMapping("/api/concept")
public class ConceptController {

    @Autowired
    private ConceptService conceptService;

    @GetMapping("/list/{params}")
    @Secured({RoleConstants.CONCEPTO_LECTURA, RoleConstants.USUARIO_ADMIN})
    public List<ConceptResponseView> getAllConcepts(@PathVariable String params) {
        return conceptService.getConceptList(params);
    }

    @GetMapping("/{conceptId}")
    @Secured({ RoleConstants.CONCEPTO_LECTURA, RoleConstants.USUARIO_ADMIN })
    public ConceptResponse getConceptById(@PathVariable Long conceptId) {
        return conceptService.getConceptById(conceptId);
    }

    @PostMapping
    @Secured({ RoleConstants.CONCEPTO_CREA, RoleConstants.USUARIO_ADMIN })
    public ResponseEntity<?> createConcept(@Valid @RequestBody ConceptRequest conceptRequest) {
        Concept concept = conceptService.createConcept(conceptRequest);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{conceptId}")
                .buildAndExpand(concept.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Concepto creado con éxito!!"));
    }

    @PutMapping
    @Secured({ RoleConstants.CONCEPTO_MODIFICA, RoleConstants.USUARIO_ADMIN })
    public ResponseEntity<?> updateConcept(@Valid @RequestBody ConceptRequest conceptRequest) {
        conceptService.updateConcept(conceptRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Concepto actualizado con éxito!!!"));
    }

    @DeleteMapping("/{conceptId}")
    @Secured({ RoleConstants.CONCEPTO_ELIMINA, RoleConstants.USUARIO_ADMIN })
    public ResponseEntity<?> deleteConcept(@PathVariable Long conceptId) {
        conceptService.deleteConcept(conceptId);

        return ResponseEntity.ok(new ApiResponse(true, "Concepto eliminado con éxito!!!"));
    }

    @GetMapping("/search")
    @Secured({RoleConstants.CONCEPTO_LECTURA, RoleConstants.USUARIO_ADMIN, RoleConstants.DOCUMENTOS_GASTOS_CONCEPTOS})
    public List<ConceptResponse> searchConcepts(@RequestParam(value = "params", required = false) String params) {
        return conceptService.searchConceptsByCodeAndName(params);
    }
}

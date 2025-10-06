package com.bufete.backend.controller.catalogs;

import java.net.URI;
import java.util.List;

import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.catalogs.RecordTypeRequest;
import com.bufete.backend.payload.catalogs.RecordTypeResponse;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.service.catalogs.RecordTypeService;
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
@RequestMapping("/api/record_type")
public class RecordTypeController {
  
  @Autowired
  private RecordTypeService recordTypeService;

  @GetMapping("/list/{params}")
  @Secured({ RoleConstants.TIPO_EXPEDIENTE_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<RecordTypeResponse> getAllRecordTypes(@PathVariable String params) {
    return recordTypeService.getRecordTypeList(params);
  }

  @GetMapping("/{recordTypeId}")
  @Secured({ RoleConstants.TIPO_EXPEDIENTE_LECTURA, RoleConstants.USUARIO_ADMIN })
  public RecordTypeResponse getRecordTypeById(@PathVariable Long recordTypeId) {
    return recordTypeService.getRecordTypeById(recordTypeId);
  }

  @PostMapping
  @Secured({ RoleConstants.TIPO_EXPEDIENTE_CREA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> createRecordType(@RequestBody RecordTypeRequest entity) {
    RecordTypeResponse recordType = recordTypeService.saveRecordType(entity);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{recordTypeId}").buildAndExpand(recordType.getId())
      .toUri();

    return ResponseEntity.created(location).body(new ApiResponse(true, "Tipo de expediente creada con éxito!!"));
  }

  @PutMapping
  @Secured({ RoleConstants.TIPO_EXPEDIENTE_MODIFICA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> updateRecordType(@RequestBody RecordTypeRequest entity) {
    recordTypeService.saveRecordType(entity);
    return ResponseEntity.ok(new ApiResponse(true, "Tipo de expediente actualizada con éxito!!"));
  }
  
  @DeleteMapping("/{recordTypeId}")
  @Secured({ RoleConstants.TIPO_EXPEDIENTE_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> deleteRecordType(@PathVariable Long recordTypeId) {
    recordTypeService.deleteRecordType(recordTypeId);
    return ResponseEntity.ok(new ApiResponse(true, "Tipo de expediente eliminado con éxito!!"));
  }

  @GetMapping("status/{status}")
  @Secured({ RoleConstants.EXPEDIENTE_TIPO_LISTA, RoleConstants.USUARIO_ADMIN })
  public List<ShareCatResponse> getRecordTypeByStatus(@PathVariable StatusName status) {
    return recordTypeService.getRecordTypeByStatus(status);
  }
}
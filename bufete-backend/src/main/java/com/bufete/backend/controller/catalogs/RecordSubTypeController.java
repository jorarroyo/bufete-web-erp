package com.bufete.backend.controller.catalogs;

import java.net.URI;
import java.util.List;

import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.catalogs.RecordSubTypeRequest;
import com.bufete.backend.payload.catalogs.RecordSubTypeResponse;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.service.catalogs.RecordSubTypeService;
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
@RequestMapping("/api/record_subtype")
public class RecordSubTypeController {
  
  @Autowired
  private RecordSubTypeService recordSubTypeService;

  @GetMapping("/list/{params}")
  @Secured({ RoleConstants.SUB_TIPO_EXPEDIENTE_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<RecordSubTypeResponse> getAllRecordSubTypes(@PathVariable String params) {
    return recordSubTypeService.getRecordSubTypeList(params);
  }

  @GetMapping("/{recordSubTypeId}")
  @Secured({ RoleConstants.SUB_TIPO_EXPEDIENTE_LECTURA, RoleConstants.USUARIO_ADMIN })
  public RecordSubTypeResponse getRecordSubTypeById(@PathVariable Long recordSubTypeId) {
    return recordSubTypeService.getRecordSubTypeById(recordSubTypeId);
  }

  @PostMapping
  @Secured({ RoleConstants.SUB_TIPO_EXPEDIENTE_CREA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> createRecordSubType(@RequestBody RecordSubTypeRequest entity) {
    RecordSubTypeResponse recordSubType = recordSubTypeService.saveRecordSubType(entity);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{recordSubTypeId}").buildAndExpand(recordSubType.getId())
      .toUri();

    return ResponseEntity.created(location).body(new ApiResponse(true, "Sub Tipo de expediente creada con éxito!!"));
  }

  @PutMapping
  @Secured({ RoleConstants.SUB_TIPO_EXPEDIENTE_MODIFICA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> updateRecordSubType(@RequestBody RecordSubTypeRequest entity) {
    recordSubTypeService.saveRecordSubType(entity);
    return ResponseEntity.ok(new ApiResponse(true, "Sub Tipo de expediente actualizada con éxito!!"));
  }

  @DeleteMapping("/{recordSubTypeId}")
  @Secured({ RoleConstants.SUB_TIPO_EXPEDIENTE_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> deleteRecordSubType(@PathVariable Long recordSubTypeId) {
    recordSubTypeService.deleteRecordSubType(recordSubTypeId);
    return ResponseEntity.ok(new ApiResponse(true, "Sub Tipo de expediente eliminado con éxito!!"));
  }

  @GetMapping("status/{recordTypeId}/{status}")
  @Secured({ RoleConstants.EXPEDIENTE_SUBTIPO_LISTA, RoleConstants.USUARIO_ADMIN })
  public List<ShareCatResponse> getRecordSubTypeByStatus(@PathVariable Long recordTypeId, @PathVariable StatusName status) {
    return recordSubTypeService.getRecordSubTypeByStatus(recordTypeId, status);
  }
}
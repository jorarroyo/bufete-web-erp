package com.bufete.backend.controller.recordFiles;

import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.model.recordFiles.RecordFileSearchView;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.recordFiles.RecordFileMergeRequest;
import com.bufete.backend.payload.recordFiles.RecordFileRequest;
import com.bufete.backend.payload.recordFiles.RecordFileResponse;
import com.bufete.backend.payload.recordFiles.RecordFileSearchResponse;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.recordFiles.RecordFileService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/records")
public class RecordFileController {

  @Autowired
  private RecordFileService recordFileService;

  @GetMapping
  @Secured({ RoleConstants.EXPEDIENTE_LECTURA, RoleConstants.USUARIO_ADMIN })
  public PagedResponse<RecordFileResponse> getRecords(@CurrentUser UserPrincipal currentUser,
      @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
      @RequestParam(value = "search", defaultValue = "") String search,
      @RequestParam(value = "sort", defaultValue = "") String sort,
      @RequestParam(value = "direction", defaultValue = "") String direction) {
    return recordFileService.getAllRecordFile(currentUser, page, size, search, sort, direction);
  }

  @GetMapping("{recordId}")
  @Secured({ RoleConstants.EXPEDIENTE_LECTURA, RoleConstants.USUARIO_ADMIN })
  public RecordFileRequest getRecordRequestById(@PathVariable Long recordId) {
    return recordFileService.getRecordFile(recordId);
  }

  @PostMapping
  @Secured({ RoleConstants.EXPEDIENTE_CREA, RoleConstants.EXPEDIENTE_EDITA, RoleConstants.USUARIO_ADMIN })
  public RecordFileRequest createRecordFile(@Valid @RequestBody RecordFileRequest recordFileRequest) {
    return recordFileService.createRecordFile(recordFileRequest);
  }

  @PatchMapping
  @Secured({ RoleConstants.EXPEDIENTE_CAMBIA_ESTADO, RoleConstants.EXPEDIENTE_AUTORIZA, RoleConstants.USUARIO_ADMIN })
  public void statusChange(@Valid @RequestBody StatusHistoryRequest changeStatusRequests) throws Exception {
    recordFileService.changeStatus(changeStatusRequests);
  }

  @GetMapping("/list")
  @Secured({ RoleConstants.EXPEDIENTE_LECTURA, RoleConstants.EXPEDIENTE_ACTIVIDAD_LISTADO_EXPEDIENTES,
      RoleConstants.USUARIO_ADMIN, RoleConstants.TIMBRE_FISCAL_INVENTARIO_LISTADO_EXPEDIENTES })
  public List<ShareCatResponse> getAuthorizedFilesRecord() {
    return recordFileService.getRecordFileByStatus(StatusName.AUTORIZADO);
  }

  @GetMapping("/search")
  @Secured({ RoleConstants.EXPEDIENTE_LECTURA, RoleConstants.EXPEDIENTE_ACTIVIDAD_LISTADO_EXPEDIENTES,
      RoleConstants.USUARIO_ADMIN, RoleConstants.DOCUMENTOS_GASTOS_LISTADO_EXPEDIENTES })
  public PagedResponse<RecordFileResponse> getRecordsSearch(@CurrentUser UserPrincipal currentUser,
      @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
      @RequestParam(value = "search", defaultValue = "") String search,
      @RequestParam(value = "sort", defaultValue = "") String sort,
      @RequestParam(value = "direction", defaultValue = "") String direction,
                                                            @RequestParam(value = "all", defaultValue = "0") boolean all) {
    return recordFileService.getAllRecordFileSearch(currentUser, page, size, search, sort, direction, all);
  }

  @GetMapping("/client-info/{recordId}")
  @Secured({ RoleConstants.EXPEDIENTE_LECTURA, RoleConstants.USUARIO_ADMIN })
  public String getClientNameByRecordFileId(@PathVariable Long recordId) {
    return recordFileService.getRecordFileClientNameById(recordId);
  }

  @GetMapping("/record-search/{optionId}")
  @Secured({RoleConstants.DOCUMENTOS_GASTOS_LISTADO_EXPEDIENTES, RoleConstants.USUARIO_ADMIN})
  public List<RecordFileSearchResponse> getRecordFilesByOption(@PathVariable Long optionId) {
    return recordFileService.getRecordFileListByOption(optionId);
  }

  @PatchMapping("/merge-record")
  @Secured({ RoleConstants.EXPEDIENTE_COMBINA_EXPEDIENTE, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity mergeRecordFile(@Valid @RequestBody RecordFileMergeRequest request) {
    recordFileService.mergeRecordFiles(request.getRecordId(), request.getMergeRecordId());
    return new ResponseEntity(HttpStatus.OK);
  }
}
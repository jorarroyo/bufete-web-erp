package com.bufete.backend.controller.FileManager;

import java.io.IOException;
import java.util.List;

import com.bufete.backend.payload.fileManager.FileDocumentResponse;
import com.bufete.backend.payload.fileManager.FileMgmRequest;
import com.bufete.backend.payload.fileManager.FileMgmResponse;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.service.fileManager.FileManagerService;
import com.bufete.backend.util.RoleConstants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*" , exposedHeaders = {"Content-Disposition"})
@RestController
@RequestMapping("/api/file-manager")
public class FileManagerController {

  private final Logger log = LoggerFactory.getLogger(FileManagerController.class);

  @Autowired
  private FileManagerService fileManagerService;

  @GetMapping("/files/{entityId}/{entityType}")
  @Secured({ RoleConstants.DOCUMENTO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<FileMgmResponse> getAllFiles(@PathVariable Long entityId, @PathVariable Integer entityType) {
    return fileManagerService.getFileManagerList(entityId, entityType);
  }

  @GetMapping("/{fileManagerId}")
  @Secured({ RoleConstants.DOCUMENTO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public FileMgmRequest getFileManagerById(@PathVariable Long fileManagerId) {
    return fileManagerService.getFileById(fileManagerId);
  }

  @DeleteMapping("/{fileManagerId}")
  @Secured({ RoleConstants.DOCUMENTO_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> deleteFileManager(@PathVariable Long fileManagerId) {
    try {
      fileManagerService.deleteFile(fileManagerId);
    } catch (IOException e) {
      log.error(e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ApiResponse(false, "Error al internar eliminar el documento"));
    }
    return ResponseEntity.ok(new ApiResponse(true, "Documento eliminado con éxito!!!"));
  }

  @PostMapping("/upload")
  @Secured({ RoleConstants.DOCUMENTO_CREA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> uploadFile(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id, @RequestParam("type") Integer type) {
    try {
      fileManagerService.createFileManager(archivo, id, type);
    } catch (IOException e) {
      log.error(e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ApiResponse(false, "Error al internar grabar el documento"));
    }

    return ResponseEntity.ok(new ApiResponse(true, "Documento creado con éxito!!"));
  }

  @GetMapping("/download/{fileManagerId}")
  @Secured({ RoleConstants.DOCUMENTO_LECTURA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<byte[]> getFileContentById(@PathVariable Long fileManagerId) {
    FileDocumentResponse file = null;
    try {
      file = fileManagerService.getFileContentById(fileManagerId);
    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }

    if (file == null) {
      return ResponseEntity.ok(new byte[0]);
    }

    HttpHeaders header = new HttpHeaders();
    header.setContentType(MediaType.valueOf(file.getContentType()));
    header.setContentLength(file.getData().length);
    header.set("Content-Disposition", "attachment; filename=" + file.getFileName());
  
    return new ResponseEntity<>(file.getData(), header, HttpStatus.OK);
  }
}
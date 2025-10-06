package com.bufete.backend.service.fileManager;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.fileManager.FileManager;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.appConfig.AppConfigRequest;
import com.bufete.backend.payload.fileManager.FileDocumentResponse;
import com.bufete.backend.payload.fileManager.FileMgmRequest;
import com.bufete.backend.payload.fileManager.FileMgmResponse;
import com.bufete.backend.repository.fileManager.FileManagerRepository;
import com.bufete.backend.service.appConfig.AppConfigService;
import com.bufete.backend.service.shared.UploadFileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileManagerService {

  @Autowired
  private FileManagerRepository fileManagerRepository;

  @Autowired
  private UploadFileService uploadFileService;

  @Autowired
  private AppConfigService appConfigService;

  public List<FileMgmResponse> getFileManagerList(Long entityId, Integer entityType) {
    return fileManagerRepository.findAllView(entityId, entityType, StatusName.ACTIVO)
      .stream().map(file -> {
        return new FileMgmResponse(file.getId(), file.getFileName(), file.getFileType(), file.getFileSize(), 
        file.getFileOwner(), file.getModified(), file.getStatus(), file.getEntityId(), file.getEntityType());
      }).collect(Collectors.toList());
  }

  @Transactional
  public void createFileManager(MultipartFile archivo, Long id, Integer type) throws IOException {
    String nombreArchivo = uploadFileService.copiar(archivo);
    AppConfigRequest filePath = appConfigService.getAppConfigById(6l);
    String tipoArchivo = uploadFileService.getFileType(archivo.getContentType());
    FileManager fileMgm = new FileManager(archivo.getOriginalFilename(), filePath.getConfigValue(), tipoArchivo, 
      archivo.getSize(), StatusName.ACTIVO, nombreArchivo, archivo.getContentType(), id, type);
    fileManagerRepository.save(fileMgm);
  }

  public FileMgmRequest getFileById(Long fileMgmId) {
    FileManager fileMgm = fileManagerRepository.findById(fileMgmId)
        .orElseThrow(() -> new ResourceNotFoundException("File Manager", "id", fileMgmId));
    FileMgmRequest request = new FileMgmRequest();
    request.setId(fileMgm.getId());
    request.setFileName(fileMgm.getFileName());
    request.setFilePath(fileMgm.getFilePath());
    request.setFileSize(fileMgm.getFileSize());
    request.setFileType(fileMgm.getFileType());
    request.setStatus(fileMgm.getStatus());
    request.setEntityId(fileMgm.getEntityId());
    request.setEntityType(fileMgm.getEntityType());
    return request;
  }

  @Transactional
  public void deleteFile(Long fileId) throws IOException {
    FileManager file = fileManagerRepository.findById(fileId)
        .orElseThrow(() -> new ResourceNotFoundException("File Manager", "id", fileId));
    if (uploadFileService.eliminar(file.getFileFullName())) {
      file.setStatus(StatusName.DELETED);
      fileManagerRepository.save(file);
    } else {
      throw new IOException("No se encontro el archivo");
    }
  }

  public FileDocumentResponse getFileContentById(Long fileId) throws IOException {
    FileManager fileMgm = fileManagerRepository.findById(fileId)
        .orElseThrow(() -> new ResourceNotFoundException("File Manager", "id", fileId));
    byte[] file = uploadFileService.getFile(fileMgm.getFileFullName());
    return new FileDocumentResponse(fileMgm.getId(), fileMgm.getFileFullName(), fileMgm.getFileContentType(), file);
  }

  public void updateEntityReference(Long newEntityId, Long entityId) {
    fileManagerRepository.updateEntityReference(newEntityId, entityId, StatusName.ACTIVO);
  }
}
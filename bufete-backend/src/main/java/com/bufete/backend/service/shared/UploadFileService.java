package com.bufete.backend.service.shared;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import com.bufete.backend.payload.appConfig.AppConfigRequest;
import com.bufete.backend.service.appConfig.AppConfigService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadFileService implements IUploadFileService {

  private final Logger log = LoggerFactory.getLogger(UploadFileService.class);

	@Autowired
  private AppConfigService appConfigService;
  
  @Override
	public String copiar(MultipartFile archivo) throws IOException {
		
		String nombreArchivo = UUID.randomUUID().toString() + "_" +  archivo.getOriginalFilename().replace(" ", "");
		
		Path rutaArchivo = getPath(nombreArchivo);
		log.info(rutaArchivo.toString());
		
		Files.copy(archivo.getInputStream(), rutaArchivo);
		
		return nombreArchivo;
	}

	@Override
	public boolean eliminar(String nombreFoto) {
		AppConfigRequest filePath = appConfigService.getAppConfigById(6l);
		if(nombreFoto !=null && nombreFoto.length() >0) {
			Path rutaFotoAnterior = Paths.get(filePath.getConfigValue()).resolve(nombreFoto).toAbsolutePath();
			File archivoFotoAnterior = rutaFotoAnterior.toFile();
			if(archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
				archivoFotoAnterior.delete();
				return true;
			}
		}
		
		return false;
	}

	@Override
	public Path getPath(String nombreFoto) {
		AppConfigRequest filePath = appConfigService.getAppConfigById(6l);
		return Paths.get(filePath.getConfigValue()).resolve(nombreFoto).toAbsolutePath();
  }
  
  public String getFileType(String fileType) {
    if (fileType.endsWith("document") || fileType.endsWith("msword")) {
      return "document";
    }

    if (fileType.endsWith("sheet") || fileType.endsWith("ms-excel")) {
      return "spreadsheet";
    }

    if (fileType.endsWith("pdf")) {
      return "pdf";
    }

    return fileType;
  }

	@Override
	public byte[] getFile(String nombreArchivo) throws IOException {
		if(nombreArchivo !=null && nombreArchivo.length() >0) {
			AppConfigRequest filePath = appConfigService.getAppConfigById(6l);
			Path rutaFotoAnterior = Paths.get(filePath.getConfigValue()).resolve(nombreArchivo).toAbsolutePath();
			File archivoArchivoAnterior = rutaFotoAnterior.toFile();
			if(archivoArchivoAnterior.exists() && archivoArchivoAnterior.canRead()) {
				byte[] byteFile = new byte[(int) archivoArchivoAnterior.length()];

				FileInputStream fis = new FileInputStream(archivoArchivoAnterior);
				fis.read(byteFile);
				fis.close();
				return byteFile;
			}
		}
		return null;
	}
}
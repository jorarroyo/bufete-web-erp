package com.bufete.backend.service.shared;

import java.io.IOException;
import java.nio.file.Path;

import org.springframework.web.multipart.MultipartFile;

public interface IUploadFileService {

  public String copiar(MultipartFile archivo) throws IOException;
	public boolean eliminar(String nombreFoto) throws IOException;
	public Path getPath(String nombreFoto);
	public byte[] getFile(String nombreArchivo) throws IOException;
}
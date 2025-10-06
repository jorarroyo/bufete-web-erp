package com.bufete.backend.payload.fileManager;

public class FileDocumentResponse {

  private Long id;
  private String fileName;
  private String contentType;
  private byte[] data;

  public FileDocumentResponse(Long id, String fileName, String contentType, byte[] data) {
    this.id = id;
    this.fileName = fileName;
    this.contentType = contentType;
    this.data = data;
  }

  public FileDocumentResponse() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public String getContentType() {
    return contentType;
  }

  public void setContentType(String contentType) {
    this.contentType = contentType;
  }

  public byte[] getData() {
    return data;
  }

  public void setData(byte[] data) {
    this.data = data;
  }

}
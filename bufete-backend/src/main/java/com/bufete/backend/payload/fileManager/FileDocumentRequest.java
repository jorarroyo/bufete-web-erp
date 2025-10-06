package com.bufete.backend.payload.fileManager;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FileDocumentRequest implements Serializable {

  private Long id;
  private String name;
  @JsonProperty("file_list")
  private List<FileMgmResponse> fileList;

  public FileDocumentRequest(Long id, String name, List<FileMgmResponse> fileList) {
    this.id = id;
    this.name = name;
    this.fileList = fileList;
  }

  public FileDocumentRequest() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<FileMgmResponse> getFileList() {
    return fileList;
  }

  public void setFileList(List<FileMgmResponse> fileList) {
    this.fileList = fileList;
  }

  private static final long serialVersionUID = 1L;
}
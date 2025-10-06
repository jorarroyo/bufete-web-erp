package com.bufete.backend.service.catalogs;

import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.catalogs.RecordType;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.catalogs.RecordTypeRequest;
import com.bufete.backend.payload.catalogs.RecordTypeResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.repository.catalogs.RecordTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecordTypeService {
  
  @Autowired
  private RecordTypeRepository recordTypeRepository;

  public List<RecordTypeResponse> getRecordTypeList(String param) {
    if (param.equals("active")) {
      return recordTypeRepository.findAll()
        .stream().filter(rec -> rec.getStatus().equals(StatusName.ACTIVO))
        .map(type -> {
          return new RecordTypeResponse(type.getId(), type.getName(), type.getStatus());
        })
        .collect(Collectors.toList());
    }
    return recordTypeRepository.findAll().
      stream().map(type -> {
        return new RecordTypeResponse(type.getId(), type.getName(), type.getStatus());
      })
      .collect(Collectors.toList());
  }

  public RecordTypeResponse saveRecordType(RecordTypeRequest request) {
    RecordType entity = new RecordType(request.getName(), request.getStatus());
    if (request.getId() != null) {
      entity.setId(request.getId());
    }
    recordTypeRepository.save(entity);
    return new RecordTypeResponse(entity.getId(), entity.getName(), entity.getStatus());
  }

  public RecordTypeResponse getRecordTypeById(Long recordTypeId) {
    RecordType recordType = recordTypeRepository.findById(recordTypeId)
      .orElseThrow(() -> new ResourceNotFoundException("Record Type", "id", recordTypeId));
    return new RecordTypeResponse(recordType.getId(), recordType.getName(), recordType.getStatus());
  }

  public void deleteRecordType(Long recordTypeId) {
    RecordType recordType = recordTypeRepository.findById(recordTypeId)
      .orElseThrow(() -> new ResourceNotFoundException("Record Type", "id", recordTypeId));
    recordType.setStatus(StatusName.DELETED);
    recordTypeRepository.save(recordType);
  }

  public List<ShareCatResponse> getRecordTypeByStatus(StatusName status) {
    return recordTypeRepository.findRecordTypeByStatus(status)
      .stream()
      .map(rec -> {
        return new ShareCatResponse(rec.getId(), rec.getName());
      })
      .collect(Collectors.toList());
  }
}
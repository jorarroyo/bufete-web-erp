package com.bufete.backend.service.catalogs;

import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.catalogs.RecordSubType;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.catalogs.RecordSubTypeRequest;
import com.bufete.backend.payload.catalogs.RecordSubTypeResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.repository.catalogs.RecordSubTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecordSubTypeService {
  
  @Autowired
  private RecordSubTypeRepository recordSubTypeRepository;

  public List<RecordSubTypeResponse> getRecordSubTypeList(String param) {
    if (param.equals("active")) {
      return recordSubTypeRepository.findAll()
        .stream().filter(rec -> rec.getStatus().equals(StatusName.ACTIVO))
        .map(type -> {
          return new RecordSubTypeResponse(type.getId(), type.getName(), type.getRecordTypeId(), type.getStatus());
        })
        .collect(Collectors.toList());
    }
    return recordSubTypeRepository.findAll().
      stream().map(type -> {
        return new RecordSubTypeResponse(type.getId(), type.getName(), type.getRecordTypeId(), type.getStatus());
      })
      .collect(Collectors.toList());
  }

  public RecordSubTypeResponse saveRecordSubType(RecordSubTypeRequest request) {
    RecordSubType entity = new RecordSubType(request.getName(), request.getRecordTypeId(), request.getStatus());
    if (request.getId() != null) {
      entity.setId(request.getId());
    }
    recordSubTypeRepository.save(entity);
    return new RecordSubTypeResponse(entity.getId(), entity.getName(), entity.getRecordTypeId(), entity.getStatus());
  }

  public RecordSubTypeResponse getRecordSubTypeById(Long recordSubTypeId) {
    RecordSubType recordSubType = recordSubTypeRepository.findById(recordSubTypeId)
      .orElseThrow(() -> new ResourceNotFoundException("Record Sub Type", "id", recordSubTypeId));
    return new RecordSubTypeResponse(recordSubType.getId(), recordSubType.getName(), recordSubType.getRecordTypeId(), recordSubType.getStatus());
  }

  public void deleteRecordSubType(Long recordSubTypeId) {
    RecordSubType recordSubType = recordSubTypeRepository.findById(recordSubTypeId)
      .orElseThrow(() -> new ResourceNotFoundException("Record Sub Type", "id", recordSubTypeId));
    recordSubType.setStatus(StatusName.DELETED);
    recordSubTypeRepository.save(recordSubType);
  }

  public List<ShareCatResponse> getRecordSubTypeByStatus(Long typeId, StatusName status) {
    return recordSubTypeRepository.findRecordSubTypeByStatus(typeId, status)
      .stream()
      .map(rec -> {
        return new ShareCatResponse(rec.getId(), rec.getName());
      })
      .collect(Collectors.toList());
  }
}
package com.bufete.backend.service.catalogs;

import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.catalogs.Institution;
import com.bufete.backend.model.catalogs.InstitutionView;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.catalogs.InstitutionRequest;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.repository.catalogs.InstitutionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstitutionService {

  @Autowired
  private InstitutionRepository institutionRepository;

  public List<InstitutionView> getInstitutionList(String param) {
    if (param.equals("active")) {
      return institutionRepository.findAllView()
        .stream().filter(ins -> ins.getStatus().equals(StatusName.ACTIVO))
        .collect(Collectors.toList());
    }
    return institutionRepository.findAllView();
  }
  
  public Institution createInstitution(InstitutionRequest institutionRequest) {
    Institution institution = new Institution(institutionRequest.getName(), StatusName.ACTIVO, institutionRequest.getShortName());
    return institutionRepository.save(institution);
  }

  public InstitutionRequest getInstitutionById(Long institutionId) {
    Institution institution = institutionRepository.findById(institutionId)
        .orElseThrow(() -> new ResourceNotFoundException("Institution", "id", institutionId));
    InstitutionRequest request = new InstitutionRequest();
    request.setId(institution.getId());
    request.setName(institution.getName());
    request.setStatus(institution.getStatus());
    request.setShortName(institution.getShortName());
    return request;
  }

  public void updateInstitution(InstitutionRequest institutionRequest) {
    Institution institution = institutionRepository.findById(institutionRequest.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Institution", "id", institutionRequest.getId()));
    institution.setName(institutionRequest.getName());
    institution.setStatus(institutionRequest.getStatus());
    institutionRepository.save(institution);
  }

  public void deleteInstitution(Long institutionId) {
    Institution institution = institutionRepository.findById(institutionId)
        .orElseThrow(() -> new ResourceNotFoundException("Institution", "id", institutionId));
    institution.setStatus(StatusName.DELETED);
    institutionRepository.save(institution);
  }

  public List<ShareCatResponse> getInstitutionByStatus(StatusName status) {
    return institutionRepository.findInstitutionsByStatus(status).stream().map(inst -> {
      return new ShareCatResponse(inst.getId(), inst.getName());
    })
    .collect(Collectors.toList());
  }
}
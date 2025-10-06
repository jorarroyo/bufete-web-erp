package com.bufete.backend.service.shared;

import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.shared.LocationResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.repository.shared.AddressRepository;
import com.bufete.backend.repository.shared.CommonRepository;
import com.bufete.backend.repository.shared.ShareCatRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommonService {

  @Autowired
  private CommonRepository commonRepository;

  @Autowired
  private ShareCatRepository shareCatRepository;

  @Autowired
  private AddressRepository addressRepository;

  public List<LocationResponse> getAllDepartments() {
    return commonRepository.getAllDeptos();
  }

  public List<LocationResponse> getAllContries() {
    return commonRepository.getAllCountries();
  }

  public List<ShareCatResponse> getAllSharedCat(Integer type, Long parentId) {
    return shareCatRepository.getAllCatalogs(type, StatusName.ACTIVO, parentId)
        .stream()
        .map(cat -> new ShareCatResponse(cat.getId(), cat.getName()))
        .collect(Collectors.toList());
  }

  public List<ShareCatResponse> getAddressesByIdAndType(Long entityId, Integer entityType) {
    return addressRepository.getAddressesViewByEntity(entityId, entityType)
            .stream()
            .map(address -> {
              String zone = address.getZone() != null ? String.join(" ", "Zona ", address.getAddress()) : "";
              String municipality = address.getMunicipality() != null ? address.getMunicipality() : "";
              return new ShareCatResponse(address.getId(),
                        String.join(" ", address.getAddress(),
                                zone, municipality).trim());
            })
            .collect(Collectors.toList());
  }
}
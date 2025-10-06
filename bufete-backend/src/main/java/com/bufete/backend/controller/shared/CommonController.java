package com.bufete.backend.controller.shared;

import java.util.List;

import com.bufete.backend.payload.shared.LocationResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.service.shared.CommonService;

import com.bufete.backend.util.RoleConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/shared")
public class CommonController {

  @Autowired
  private CommonService commonService;

  @GetMapping("/deptos")
  public List<LocationResponse> getDeptos() {
    return commonService.getAllDepartments();
  }

  @GetMapping("/countries")
  public List<LocationResponse> getCountries() {
    return commonService.getAllContries();
  }

  @GetMapping("/catalogs/{type}/{parentId}")
  public List<ShareCatResponse> getCatalogs(@PathVariable Integer type, @PathVariable Long parentId) {
    return commonService.getAllSharedCat(type, parentId);
  }

  @GetMapping("/addresses/{id}/{type}")
  @Secured({RoleConstants.FACTURA_LISTADO_DIRECCIONES, RoleConstants.USUARIO_ADMIN})
  public List<ShareCatResponse> getAddressesByIdAndType(@PathVariable Long id, @PathVariable Integer type) {
    return commonService.getAddressesByIdAndType(id, type);
  }
}
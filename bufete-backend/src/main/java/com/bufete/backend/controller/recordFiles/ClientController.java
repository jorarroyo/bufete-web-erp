package com.bufete.backend.controller.recordFiles;

import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.payload.recordFiles.ChildClientRequest;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.PersonalInfoRequest;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.recordFiles.ClientRequest;
import com.bufete.backend.payload.recordFiles.ClientsReponse;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.recordFiles.ClientService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.RoleConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/clients")
public class ClientController {

  @Autowired
  private ClientService clientService;

  @GetMapping
  @Secured({ RoleConstants.CLIENTE_LECTURA, RoleConstants.USUARIO_ADMIN })
  public PagedResponse<ClientsReponse> getClients(@CurrentUser UserPrincipal currentUser,
      @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
      @RequestParam(value = "search", defaultValue = "") String search,
      @RequestParam(value = "sort", defaultValue = "") String sort,
      @RequestParam(value = "direction", defaultValue = "") String direction) {
    return clientService.getAllClients(currentUser, page, size, search, sort, direction);
  }

  @GetMapping("{clientId}")
  @Secured({ RoleConstants.CLIENTE_LECTURA, RoleConstants.USUARIO_ADMIN })
  public ClientRequest getClientRequestById(@PathVariable Long clientId) {
    return clientService.getClient(clientId);
  }

  @PostMapping
  @Secured({ RoleConstants.CLIENTE_CREA, RoleConstants.USUARIO_ADMIN })
  public ClientRequest createClient(@Valid @RequestBody ClientRequest clientRequest) {
    ClientRequest client = clientService.createClient(clientRequest);
    return client;
  }

  @DeleteMapping("{clientId}")
  @Secured({ RoleConstants.CLIENTE_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public void deleteClient(@PathVariable Long clientId) {
    clientService.deleteClient(clientId);
  }

  @GetMapping("/status/{status}")
  @Secured({ RoleConstants.CLIENTE_LECTURA, RoleConstants.EXPEDIENTE_LISTADO_CLIENTES, RoleConstants.USUARIO_ADMIN })
  public List<ShareCatResponse> getClientRequestById(@PathVariable StatusName status) {
    return clientService.getClientByStatus(status);
  }

  @GetMapping("/personal-info/{clientId}")
  @Secured({ RoleConstants.CLIENTE_LECTURA, RoleConstants.EXPEDIENTE_LISTADO_CLIENTES, RoleConstants.USUARIO_ADMIN })
  public PersonalInfoRequest getPersonalInfoRequest(@PathVariable Long clientId) {
    return clientService.getPersonalInfo(clientId);
  }

  @GetMapping("/search")
  @Secured({RoleConstants.CLIENTE_LECTURA, RoleConstants.USUARIO_ADMIN,
          RoleConstants.LIQUIDACION_FACTURA_LISTADO_CLIENTES, RoleConstants.FACTURA_LISTADO_CLIENTES})
  public List<ShareCatResponse> getClientSearch(@RequestParam(value = "params", required = false) String params) {
    return clientService.searchClients(params);
  }

  @GetMapping("/search-child")
  @Secured({RoleConstants.CLIENTE_LECTURA, RoleConstants.USUARIO_ADMIN,
          RoleConstants.LIQUIDACION_FACTURA_LISTADO_CLIENTES, RoleConstants.FACTURA_LISTADO_CLIENTES})
  public List<ChildClientRequest> getClientSearchChild(@RequestParam(value = "params", required = false) String params) {
    return clientService.searchClientsChild(params);
  }

  @GetMapping("/list-child/{parentId}")
  @Secured({RoleConstants.CLIENTE_LECTURA, RoleConstants.USUARIO_ADMIN,
          RoleConstants.LIQUIDACION_FACTURA_LISTADO_CLIENTES, RoleConstants.FACTURA_LISTADO_CLIENTES})
  public List<ChildClientRequest> getClientChildByParentId(@PathVariable Long parentId) {
    return clientService.searchChildByParentId(parentId);
  }
}
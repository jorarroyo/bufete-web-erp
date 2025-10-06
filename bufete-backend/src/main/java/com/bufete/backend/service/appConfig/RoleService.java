package com.bufete.backend.service.appConfig;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.appConfig.AppOption;
import com.bufete.backend.model.appConfig.Role;
import com.bufete.backend.model.appConfig.RoleAppOption;
import com.bufete.backend.model.appConfig.RoleOptionKey;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.appConfig.RoleRequest;
import com.bufete.backend.payload.appConfig.RoleResponse;
import com.bufete.backend.repository.appConfig.AppOptionRepository;
import com.bufete.backend.repository.appConfig.RoleAppOptionRepository;
import com.bufete.backend.repository.appConfig.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoleService {

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private RoleAppOptionRepository roleAppOptionRepository;

  @Autowired
  private AppOptionRepository appOptionRepository;

  public List<RoleResponse> getRolesList(String param) {
    if (param.equals("active"))
      return roleRepository.getRolesActive().stream()
          .map(response -> new RoleResponse(response.getId(), response.getName(), response.getStatus()))
          .collect(Collectors.toList());
    return roleRepository.findAll().stream()
        .map(response -> new RoleResponse(response.getId(), response.getName(), response.getStatus()))
        .collect(Collectors.toList());
  }

  public RoleRequest getRoleById(Long roleId) {
    Optional<Role> role = roleRepository.findById(roleId);
    if (!role.isPresent())
      throw new ResourceNotFoundException("Role", "id", roleId);
    Role response = role.get();
    List<Long> options = roleAppOptionRepository.getOptionPerRol(roleId);
    return new RoleRequest(response.getId(), response.getName(), response.getStatus(), options);
  }

  @Transactional
  public Role createRole(RoleRequest roleRequest) {
    Role role = new Role(roleRequest.getName(), roleRequest.getStatus());
    Role newRole = roleRepository.save(role);
    for (Long option : roleRequest.getOptions()) {
      RoleOptionKey roleOptionKey = new RoleOptionKey(newRole.getId(), option);
      AppOption appOption = appOptionRepository.findById(option)
          .orElseThrow(() -> new ResourceNotFoundException("AppOption", "id", option));
      roleAppOptionRepository.save(new RoleAppOption(roleOptionKey, newRole, appOption, StatusName.ACTIVO));
    }
    return newRole;
  }

  @Transactional
  public void deleteRole(Long roleId) {
    Role role = roleRepository.findById(roleId).orElseThrow(() -> new ResourceNotFoundException("Role", "id", roleId));
    role.setStatus(StatusName.DELETED);
    roleRepository.save(role);
    List<AppOption> options = roleAppOptionRepository.getAppOptionByRoleId(roleId);
    for (AppOption option : options) {
      RoleOptionKey roleOptionKey = new RoleOptionKey(role.getId(), option.getId());
      RoleAppOption roleAppOption = roleAppOptionRepository.findById(roleOptionKey)
          .orElseThrow(() -> new ResourceNotFoundException("RoleAppOption", "id", roleOptionKey));
      roleAppOption.setStatus(StatusName.DELETED);
      roleAppOptionRepository.save(roleAppOption);
    }
  }

  @Transactional
  public void updateRole(RoleRequest roleRequest) {
    Role role = new Role(roleRequest.getName(), roleRequest.getStatus());
    role.setId(roleRequest.getId());
    roleRepository.save(role);
    roleAppOptionRepository.deleteAllByRoleId(roleRequest.getId());
    for (Long option : roleRequest.getOptions()) {
      RoleOptionKey roleOptionKey = new RoleOptionKey(role.getId(), option);
      AppOption appOption = appOptionRepository.findById(option)
          .orElseThrow(() -> new ResourceNotFoundException("AppOption", "id", option));
      roleAppOptionRepository.save(new RoleAppOption(roleOptionKey, role, appOption, StatusName.ACTIVO));
    }
  }
}
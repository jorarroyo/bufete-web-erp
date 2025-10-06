package com.bufete.backend.service.appConfig;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.appConfig.AppOption;
import com.bufete.backend.model.appConfig.Company;
import com.bufete.backend.model.appConfig.Role;
import com.bufete.backend.model.appConfig.RoleAssign;
import com.bufete.backend.model.appConfig.User;
import com.bufete.backend.model.appConfig.UserRoleCompanyKey;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.security.AssignRequest;
import com.bufete.backend.payload.security.ResetPasswordRequest;
import com.bufete.backend.payload.appConfig.CompanyResponse;
import com.bufete.backend.payload.security.SignUpRequest;
import com.bufete.backend.payload.security.UserDetailResponse;
import com.bufete.backend.payload.appConfig.UserResponse;
import com.bufete.backend.payload.appConfig.RoleAssignResponse;
import com.bufete.backend.repository.appConfig.CompanyRepository;
import com.bufete.backend.repository.appConfig.RoleAppOptionRepository;
import com.bufete.backend.repository.appConfig.RoleAssignRepository;
import com.bufete.backend.repository.appConfig.RoleRepository;
import com.bufete.backend.repository.appConfig.UserRepository;
import com.bufete.backend.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CompanyRepository companyRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private RoleAssignRepository roleAssignRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  RoleAppOptionRepository roleAppOptionRepository;

  @Autowired
  CompanyService companyService;

  public boolean isAuthenticated(String username, String password, Long companyId) {
    Optional<User> user = roleAssignRepository.findUserByUsernameAndCompany(username, companyId);
    if (!user.isPresent())
      return false;
    User userDetail = user.get();
    return passwordEncoder.matches(password, userDetail.getPassword());
  }

  @Transactional
  public void registerUser(SignUpRequest signUpRequest) {
    User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
        signUpRequest.getPassword(), StatusName.ACTIVO, signUpRequest.getEmployeeId());

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    userRepository.save(user);
  }

  @Transactional
  public void assignRoles(AssignRequest assignRequest) {
    User userDetail = userRepository.findById(assignRequest.getUserId())
        .orElseThrow(() -> new ResourceNotFoundException("User", "id", assignRequest.getUserId()));

    Company company = companyRepository.findById(assignRequest.getCompanyId()).get();
    roleAssignRepository.deleteRoleAssignByUserId(userDetail.getId());
    
    for (Long item : assignRequest.getRolesId()) {
      Role role = roleRepository.findById(item).get();
      UserRoleCompanyKey id = new UserRoleCompanyKey(userDetail.getId(), role.getId(), company.getId());
      if (!roleAssignRepository.existsById(id)) {
        RoleAssign roleAssign = new RoleAssign(id, userDetail, role, company, StatusName.ACTIVO);
        roleAssignRepository.save(roleAssign);
      }
    }
  }

  public List<CompanyResponse> getCompaniesPerUser(Long userId) {
    List<Company> companyList = roleAssignRepository.getCompaniesPerUserId(userId);
    if (companyList.size() == 0) {
      throw new ResourceNotFoundException("company List", "user Id", userId);
    }

    List<CompanyResponse> responses = companyList.stream().map(company -> {
      return new CompanyResponse(company.getId(), company.getName(), company.getCreatedAt());
    }).collect(Collectors.toList());
    return responses;
  }

  public String[] appsPerUserAndCompany(Long userId, Long companyId) {
    List<Long> roles = roleAssignRepository.getRolesIdByUserIdAndCompanyId(userId, companyId);
    List<AppOption> options = roleAppOptionRepository.getAppOptionByRoleIds(roles);
    List<String> list = options.stream().map(AppOption::getName).collect(Collectors.toList());
    return list.stream().toArray(String[]::new);
  }

  public UserDetailResponse getUserDetail(UserPrincipal userPrincipal, String jwt) {
    Company company = companyService.getCompanyById(userPrincipal.getCompanyId());
    String[] roles = appsPerUserAndCompany(userPrincipal.getId(), userPrincipal.getCompanyId());
    if (roles.length == 0) return null;
    UserDetailResponse response = new UserDetailResponse(userPrincipal.getId(), userPrincipal.getUsername(),
        userPrincipal.getName(), userPrincipal.getEmail(), company.getId(), company.getName(), roles, jwt);
    return response;
  }

  public UserDetailResponse getUserDetail(Long userId, Long companyId, String jwt) {
    User userPrincipal = roleAssignRepository.findUserByIdAndCompany(userId, companyId).get();
    Company company = companyService.getCompanyById(companyId);
    String[] roles = appsPerUserAndCompany(userPrincipal.getId(), companyId);
    UserDetailResponse response = new UserDetailResponse(userPrincipal.getId(), userPrincipal.getUsername(),
        userPrincipal.getName(), userPrincipal.getEmail(), company.getId(), company.getName(), roles, jwt);
    return response;
  }

  public List<UserResponse> getUserList(String param) {
    if (param.equals("active"))
      return userRepository.getActiveUsers().stream().map(response -> new UserResponse(response.getId(),
          response.getName(), response.getUsername(), response.getEmail(), response.getStatus()))
          .collect(Collectors.toList());
    return userRepository.findAll().stream().map(response -> new UserResponse(response.getId(), response.getName(),
        response.getUsername(), response.getEmail(), response.getStatus())).collect(Collectors.toList());
  }

  public UserResponse getUserById(Long userId) {
    User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    return new UserResponse(user.getId(), user.getName(), user.getUsername(), user.getEmail(), user.getStatus());
  }

  public void deleteUser(Long userId) {
    User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    user.setStatus(StatusName.DELETED);
    userRepository.save(user);
  }

  public List<RoleAssignResponse> getRoleAssignByUserId(Long userId) {
    List<RoleAssign> roleAssign = roleAssignRepository.getRoleAssignedById(userId);
    return roleAssign.stream().map(assign -> {
      return new RoleAssignResponse(assign.getCompany().getId(), assign.getRole().getId());
    }).collect(Collectors.toList());
  }

  @Transactional
  public void resetPassword(ResetPasswordRequest resetPasswordRequest) {
    userRepository.resetPasswordByUserId(passwordEncoder.encode(resetPasswordRequest.getPassword()), resetPasswordRequest.getId());
  }
}
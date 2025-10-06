package com.bufete.backend.RepositoryTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import java.time.Instant;
import java.util.List;

import com.bufete.backend.model.appConfig.Company;
import com.bufete.backend.model.appConfig.Role;
import com.bufete.backend.model.appConfig.RoleAssign;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.model.appConfig.User;
import com.bufete.backend.model.appConfig.UserRoleCompanyKey;
import com.bufete.backend.repository.appConfig.CompanyRepository;
import com.bufete.backend.repository.appConfig.RoleAssignRepository;
import com.bufete.backend.repository.appConfig.RoleRepository;
import com.bufete.backend.repository.appConfig.UserRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RoleAssignRepositoryTest {

  @Autowired
  private RoleAssignRepository roleAssignRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CompanyRepository companyRepository;

  @Autowired
  private RoleRepository roleRepository;

  private User createUser() {
    User user = new User("Ada Solis", "asolis", "adaangelica.solis@gmail.com", "SiPues00$$.", StatusName.ACTIVO, 1l);
    user.setCreatedAt(Instant.now());
    user.setUpdatedAt(Instant.now());
    userRepository.save(user);
    return user;
  }

  private Company createCompany() {
    Company company = new Company("Company Test", StatusName.ACTIVO);
    company.setCreatedAt(Instant.now());
    company.setUpdatedAt(Instant.now());
    companyRepository.save(company);
    return company;
  }

  private Role createRole() {
    Role role = new Role("Parent Role", StatusName.ACTIVO);
    role.setCreatedAt(Instant.now());
    role.setUpdatedAt(Instant.now());
    roleRepository.save(role);
    return role;
  }

  private RoleAssign createRoleAssign() {
    User user = createUser();
    Role role = createRole();
    Company company = createCompany();

    UserRoleCompanyKey id = new UserRoleCompanyKey(user.getId(), role.getId(), company.getId());

    RoleAssign roleAssign = new RoleAssign(id, user, role, company, StatusName.ACTIVO);
    roleAssign.setCreatedAt(Instant.now());
    roleAssign.setUpdatedAt(Instant.now());
    roleAssignRepository.save(roleAssign);
    return roleAssign;
  }

  @Test
  public void testCreateRoleAssign() {
    RoleAssign roleAssign = createRoleAssign();
    assertNotNull(roleAssign);
  }

  @Test
  public void testObtainRolesCountByUserAndCompany() {
    RoleAssign roleAssign = createRoleAssign();
    long count = roleAssignRepository.countRolesByUserIdAndCompanyId(roleAssign.getUser().getId(),
        roleAssign.getCompany().getId());
    assertEquals(count, 1);
  }

  @Test
  public void testObtainRolesByUserAndCompany() {
    RoleAssign roleAssign = createRoleAssign();

    // Region: Create other role for the same user in the same company
    Role role = new Role("Test Role", StatusName.ACTIVO);
    role.setCreatedAt(Instant.now());
    role.setUpdatedAt(Instant.now());
    roleRepository.save(role);

    UserRoleCompanyKey id = new UserRoleCompanyKey(roleAssign.getUser().getId(), role.getId(),
        roleAssign.getCompany().getId());

    RoleAssign roleAssign2 = new RoleAssign(id, roleAssign.getUser(), role, roleAssign.getCompany(), StatusName.ACTIVO);
    roleAssign2.setCreatedAt(Instant.now());
    roleAssign2.setUpdatedAt(Instant.now());
    roleAssignRepository.save(roleAssign2);
    // EndRegion: Create other role for the same user in the same company

    List<Role> roles = roleAssignRepository.getRolesByUserIdAndCompanyId(roleAssign.getUser().getId(),
        roleAssign.getCompany().getId());
    assertNotNull(roles);
    assertEquals(roles.size(), 2);
  }
}
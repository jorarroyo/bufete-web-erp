package com.bufete.backend.RepositoryTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.time.Instant;
import java.util.List;

import com.bufete.backend.model.appConfig.AppOption;
import com.bufete.backend.model.appConfig.Role;
import com.bufete.backend.model.appConfig.RoleAppOption;
import com.bufete.backend.model.appConfig.RoleOptionKey;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.repository.appConfig.AppOptionRepository;
import com.bufete.backend.repository.appConfig.RoleAppOptionRepository;
import com.bufete.backend.repository.appConfig.RoleRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RoleAppOptionRepositoryTest {

  @Autowired
  private RoleAppOptionRepository roleAppOptionRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private AppOptionRepository appOptionRepository;

  private Role createRole(String roleName) {
    Role role = new Role(roleName, StatusName.ACTIVO);
    role.setCreatedAt(Instant.now());
    role.setUpdatedAt(Instant.now());
    roleRepository.save(role);
    return role;
  }

  private AppOption createAppOption(String optionName) {
    AppOption option = new AppOption(optionName);
    appOptionRepository.save(option);
    return option;
  }

  private RoleAppOption createRoleAppOption() {
    Role role = createRole("Test role");
    AppOption appOption = createAppOption("Test App");

    RoleOptionKey id = new RoleOptionKey(role.getId(), appOption.getId());

    RoleAppOption roleAppOption = new RoleAppOption(id, role, appOption, StatusName.ACTIVO);
    roleAppOption.setCreatedAt(Instant.now());
    roleAppOption.setUpdatedAt(Instant.now());
    roleAppOptionRepository.save(roleAppOption);
    return roleAppOption;
  }

  @Test
  public void testCreateRoleAppOption() {
    RoleAppOption roleAppOption = createRoleAppOption();
    assertNotNull(roleAppOption);
  }

  @Test
  public void testObtainRoleAppOptionByRole() {
    RoleAppOption roleAppOption = createRoleAppOption();
    assertNotNull(roleAppOption);

    // Region: Create other appOption for the same role

    AppOption option = createAppOption("Test App2");
    appOptionRepository.save(option);

    RoleOptionKey id = new RoleOptionKey(roleAppOption.getRole().getId(), option.getId());

    RoleAppOption roleAppOption2 = new RoleAppOption(id, roleAppOption.getRole(), option, StatusName.ACTIVO);
    roleAppOption2.setCreatedAt(Instant.now());
    roleAppOption2.setUpdatedAt(Instant.now());
    roleAppOptionRepository.save(roleAppOption2);
    // EndRegion

    List<AppOption> optionList = roleAppOptionRepository.getAppOptionByRoleId(roleAppOption.getRole().getId());
    assertNotNull(optionList);
    assertEquals(optionList.size(), 2);
  }
}
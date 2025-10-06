package com.bufete.backend.RepositoryTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.time.Instant;

import com.bufete.backend.model.appConfig.Role;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.repository.appConfig.RoleRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RoleRepositoryTest {

  @Autowired
  private RoleRepository roleRepository;

  private Role createRole() {
    Role role = new Role("Parent Role", StatusName.ACTIVO);
    role.setCreatedAt(Instant.now());
    role.setUpdatedAt(Instant.now());
    roleRepository.save(role);
    return role;
  }

  @Test
  public void testSaveRoles() {
    Role role = createRole();
    assertNotNull(role);
  }

  @Test
  public void testGetRole() {
    Role role = createRole();
    Role role2 = roleRepository.findByName("Parent Role").get();
    assertNotNull(role);
    assertEquals(role2.getName(), role.getName());
  }

  @Test
  public void testDeleteRole() {
    Role role = createRole();
    roleRepository.delete(role);
  }

  @Test
  public void findAllRoles() {
    createRole();
    assertNotNull(roleRepository.findAll());
  }

  @Test
  public void deleteByRoleIdTest() {
    Role rol = createRole();
    roleRepository.deleteById(rol.getId());
  }
}
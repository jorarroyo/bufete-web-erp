package com.bufete.backend.RepositoryTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.time.Instant;

import com.bufete.backend.model.appConfig.User;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.repository.appConfig.UserRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTest {

  @Autowired
  private UserRepository userRepository;

  private User createUser() {
    User user = new User("Ada Solis", "asolis", "adaangelica.solis@gmail.com", "SiPues00$$.", StatusName.ACTIVO, 1l);
    user.setCreatedAt(Instant.now());
    user.setUpdatedAt(Instant.now());
    userRepository.save(user);
    return user;
  }

  @Test
  public void testSaveUser() {
    User user = createUser();
    assertNotNull(user);
  }

  @Test
  public void testGetUser() {
    User user = createUser();
    assertNotNull(user);

    User user2 = userRepository.findByUsername(user.getUsername()).get();
    assertEquals(user.getName(), user2.getName());
  }

  @Test
  public void testDeleteRole() {
    User user = createUser();
    userRepository.delete(user);
  }

  @Test
  public void findAllUsers() {
    createUser();
    assertNotNull(userRepository.findAll());
  }

  @Test
  public void deleteByUserIdTest() {
    User user2 = createUser();
    userRepository.deleteById(user2.getId());
  }
}
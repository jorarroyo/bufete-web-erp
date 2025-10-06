package com.bufete.backend.RepositoryTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import com.bufete.backend.model.appConfig.AppOption;
import com.bufete.backend.repository.appConfig.AppOptionRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@TestPropertySource(locations="classpath:application-test.properties")
public class AppOptionRepositoryTest {

  @Autowired
  private AppOptionRepository appOptionRepository;

  private AppOption createAppOption() {
    AppOption option = new AppOption("users");
    appOptionRepository.save(option);
    return option;
  }

  @Test
  public void testCreateOption() {
    AppOption option = createAppOption();
    assertNotNull(option);
  }

  @Test
  public void testGetOption() {
    AppOption option = createAppOption();
    assertNotNull(option);

    AppOption option2 = appOptionRepository.findByName("users").get();
    assertNotNull(option2);
    assertEquals(option2.getName(), option.getName());
  }

  @Test
  public void testUpdateOption() {
    AppOption option = createAppOption();
    assertNotNull(option);
    option.setName("username");
    appOptionRepository.save(option);
    assertEquals(option.getName(), "username");
  }

  @Test
  public void testFindAllOption() {
    AppOption option = createAppOption();
    assertNotNull(option);

    assertNotNull(appOptionRepository.findAll());
  }
}
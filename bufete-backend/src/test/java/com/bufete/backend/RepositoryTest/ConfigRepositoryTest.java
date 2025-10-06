package com.bufete.backend.RepositoryTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.time.Instant;

import com.bufete.backend.model.appConfig.Company;
import com.bufete.backend.model.appConfig.Configuration;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.repository.appConfig.CompanyRepository;
import com.bufete.backend.repository.appConfig.ConfigRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ConfigRepositoryTest {

  @Autowired
  private ConfigRepository configRepository;

  @Autowired
  private CompanyRepository companyRepository;

  private Company createCompany() {
    Company company = new Company("Industria La Popular", StatusName.ACTIVO);
    company.setCreatedAt(Instant.now());
    company.setUpdatedAt(Instant.now());
    companyRepository.save(company);
    return company;
  }

  private Configuration createConfig() {
    Long userId = (long) 1;
    Company company = createCompany();
    Configuration config = new Configuration("sample config", "1", StatusName.ACTIVO, company);
    config.setCreatedAt(Instant.now());
    config.setUpdatedAt(Instant.now());
    config.setCreatedBy(userId);
    config.setUpdatedBy(userId);
    configRepository.save(config);
    return config;
  }

  @Test
  public void testCreateConfig() {
    Configuration config = createConfig();
    assertNotNull(config);
  }

  @Test
  public void testGetConfig() {
    Configuration config = createConfig();
    assertNotNull(config);

    Configuration config2 = configRepository.findByName("sample config").get();
    assertNotNull(config2);
    assertEquals(config2.getName(), config.getName());
  }

  @Test
  public void updateConfig() {
    Configuration config = createConfig();
    assertNotNull(config);

    config.setValue("2");
    config.setUpdatedAt(Instant.now());
    config.setUpdatedBy((long) 2);
    configRepository.save(config);
    assertEquals(config.getValue(), "2");
  }

  @Test
  public void changeStatusTest() {
    Configuration config = createConfig();
    assertNotNull(config);

    config.setStatus(StatusName.DELETED);
    config.setUpdatedAt(Instant.now());
    config.setUpdatedBy((long) 3);
    configRepository.save(config);
    assertEquals(config.getStatus(), StatusName.DELETED);
  }

  @Test
  public void testFindAllConfig() {
    Configuration config = createConfig();
    assertNotNull(config);

    assertNotNull(configRepository.findAll());
  }

}
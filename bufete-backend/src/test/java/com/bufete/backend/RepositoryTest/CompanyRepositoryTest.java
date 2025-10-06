package com.bufete.backend.RepositoryTest;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertEquals;

import java.time.Instant;

import com.bufete.backend.model.appConfig.Company;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.repository.appConfig.CompanyRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CompanyRepositoryTest {

  @Autowired
  private CompanyRepository companyRepository;

  private Company createCompany() {
    Company company = new Company("Company Test", StatusName.ACTIVO);
    company.setCreatedAt(Instant.now());
    company.setUpdatedAt(Instant.now());
    companyRepository.save(company);
    return company;
  }

  @Test
  public void testCreateCompany() {
    Company company = createCompany();
    assertNotNull(company);
  }

  @Test
  public void testGetCompany() {
    Company company = createCompany();
    assertNotNull(company);

    Company company2 = companyRepository.findByName("Company Test").get();
    assertNotNull(company2);
    assertEquals(company2.getName(), company.getName());
  }

  @Test
  public void testDeleteCompany() {
    Company company = createCompany();
    companyRepository.delete(company);
  }

  @Test
  public void testFindAllCompanies() {
    createCompany();
    assertNotNull(companyRepository.findAll());
  }

  @Test
  public void deleteByCompanyIdTest() {
    Company company = createCompany();
    companyRepository.deleteById(company.getId());
  }
}
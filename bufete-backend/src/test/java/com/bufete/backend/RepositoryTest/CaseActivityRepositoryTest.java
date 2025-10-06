package com.bufete.backend.RepositoryTest;

import static org.junit.Assert.assertNotNull;

import java.util.Date;
import java.util.List;

import com.bufete.backend.model.recordFiles.CaseActivity;
import com.bufete.backend.model.recordFiles.CaseActivityView;
import com.bufete.backend.model.shared.CaseActivityType;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.repository.recordFiles.CaseActivityRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CaseActivityRepositoryTest {

  @Autowired
  private CaseActivityRepository caseActivityRepository;

  private CaseActivity createCaseActivity() {
    Long id = Long.valueOf(1);
    Date today = new Date();
    CaseActivity caseAct = new CaseActivity(id, id, id, "comment", 0d, today, StatusName.ACTIVO, id, id, Double.parseDouble("2"), 1, "0", 0d, new Date(), new Date(), CaseActivityType.HONORARIOS, "");
    caseActivityRepository.save(caseAct);
    return caseAct;
  }

  @Test
  public void testCreateCaseActivity() {
    CaseActivity caseAct = createCaseActivity();
    assertNotNull(caseAct);
  }

  @Test
  public void testFindAllView() {
    CaseActivity caseAct = createCaseActivity();
    assertNotNull(caseAct);

    StatusName[] statusNames = {StatusName.ACTIVO, StatusName.FINALIZADO};

    List<CaseActivityView> casesView = caseActivityRepository.findAllByIdAndStatus(Long.valueOf(1), statusNames);
    assertNotNull(casesView);
  }
}
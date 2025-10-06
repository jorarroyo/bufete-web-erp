package com.bufete.backend.RepositoryTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.time.Instant;

import com.bufete.backend.model.recordFiles.Client;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.repository.recordFiles.ClientRepository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ClientRepositoryTest {

  @Autowired
  private ClientRepository clientRepository;

  private Client createClient() {
    Long userId = Long.valueOf(1);
    Client client = new Client("Cosme", "Fulanito", "806671-k", "", 2, StatusName.ACTIVO);
    client.setCreatedAt(Instant.now());
    client.setUpdatedAt(Instant.now());
    client.setCreatedBy(userId);
    client.setUpdatedBy(userId);
    clientRepository.save(client);
    return client;
  }

  @Test
  public void testCreateClient() {
    Client client = createClient();
    assertNotNull(client);
  }

  @Test
  public void testGetClient() {
    Client client = createClient();
    assertNotNull(client);

    Client client2 = clientRepository.findByName("Cosme").get();
    assertNotNull(client2);
    assertEquals(client2.getName(), client.getName());
  }

  @Test
  public void testDeleteClient() {
    Client client = createClient();
    clientRepository.delete(client);
  }

  @Test
  public void testFindAllClients() {
    createClient();
    assertNotNull(clientRepository.findAll());
  }

  @Test
  public void deleteClientById() {
    Client client = createClient();
    clientRepository.deleteById(client.getId());
  }

  @Test
  public void testUpdateClient() {
    Client client = createClient();

    client.setLastName("Fulanos");
    client.setStatus(StatusName.DELETED);
    clientRepository.save(client);

    Client client2 = clientRepository.findById(client.getId()).get();
    assertNotNull(client2);
    assertEquals(client2.getLastName(), client.getLastName());
    assertEquals(client2.getStatus(), client.getStatus());
  }
}
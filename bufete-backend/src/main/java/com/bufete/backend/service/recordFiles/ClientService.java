package com.bufete.backend.service.recordFiles;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.recordFiles.Client;
import com.bufete.backend.model.recordFiles.ClientsView;
import com.bufete.backend.model.shared.*;
import com.bufete.backend.payload.recordFiles.ChildClientRequest;
import com.bufete.backend.payload.recordFiles.ClientRequest;
import com.bufete.backend.payload.recordFiles.ClientsReponse;
import com.bufete.backend.payload.shared.*;
import com.bufete.backend.repository.recordFiles.ClientRepository;
import com.bufete.backend.repository.shared.AddressRepository;
import com.bufete.backend.repository.shared.ContactEntityRepository;
import com.bufete.backend.repository.shared.PersonalInfoRepository;
import com.bufete.backend.repository.shared.TelephoneRepository;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.util.AppId;
import com.bufete.backend.util.Validators;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {

  @Autowired
  private ClientRepository clientRepository;

  @Autowired
  private AddressRepository addressRepository;

  @Autowired
  private TelephoneRepository telephoneRepository;

  @Autowired
  private PersonalInfoRepository personalInfoRepository;

  @Autowired
  private ContactEntityRepository contactEntityRepository;

  private static final Logger logger = LoggerFactory.getLogger(ClientService.class);

  public PagedResponse<ClientsReponse> getAllClients(UserPrincipal currentUser, int page, int size, String searchText,
      String sort, String direction) {
    Validators.validatePageNumberAndSize(page, size);

    Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
        Validators.toCamelCase(sort));
    Page<ClientsView> clients = clientRepository.getPagedClientsView(searchText, pageable);

    if (clients.getNumberOfElements() == 0) {
      return new PagedResponse<>(Collections.emptyList(), clients.getNumber(), clients.getSize(),
          clients.getTotalElements(), clients.getTotalPages(), clients.isLast());
    }

    List<ClientsReponse> clientsResponse = clients.stream().map(client -> {
      return new ClientsReponse(client.getId(), client.getClientType(),
          client.getName().concat(" ").concat(client.getLastName()).trim(), client.getNit(), client.getAcronym(),
          client.getStatus(), client.getCreated(), client.getModified());
    }).collect(Collectors.toList());

    return new PagedResponse<>(clientsResponse, clients.getNumber(), clients.getSize(), clients.getTotalElements(),
        clients.getTotalPages(), clients.isLast());
  }

  public String getClientName(Long clientId) {
    Client client = clientRepository.findById(clientId)
        .orElseThrow(() -> new ResourceNotFoundException("Client", "id", clientId));
    return client.getName() + " " + client.getLastName();
  }

  public ClientRequest getClient(Long clientId) {
    Client client = clientRepository.findById(clientId)
        .orElseThrow(() -> new ResourceNotFoundException("Client", "id", clientId));

    List<Address> addressList = addressRepository.getAddressesByEntity(clientId, AppId.CLIENTES, StatusName.ACTIVO);
    List<AddressRequest> addressRequest = addressList.stream().map(address -> new AddressRequest(address.getId(), address.getAddressType(), address.getAddress(), address.getZone(),
        address.getMunicipalityId(), address.getStatus())).collect(Collectors.toList());

    List<Telephone> phoneList = telephoneRepository.getPhonesByEntity(clientId, AppId.CLIENTES, StatusName.ACTIVO);
    List<PhoneRequest> phoneRequest = phoneList.stream().map(phone -> new PhoneRequest(phone.getId(), phone.getPhoneNumber(), phone.getPhoneType(), phone.getStatus())).collect(Collectors.toList());

    List<ContactRequest> contact = contactEntityRepository.getContactByEntityList(clientId, AppId.CLIENTES).stream().map(contc -> new ContactRequest(contc.getId(), contc.getName(), contc.getAddress(), contc.getEmail(), contc.getPhone(), contc.getType(), contc.getStatus())).collect(Collectors.toList());
    PersonalInfoRequest personalInfo = personalInfoRepository.getPersonalInfoByEntity(clientId, AppId.CLIENTES)
        .orElse(new PersonalInfoRequest());

    ClientRequest clientRequest = new ClientRequest(client.getName(), client.getLastName(), client.getClientType(),
        client.getNit(), client.getAcronym());
    clientRequest.setId(clientId);
    clientRequest.setAddresses(addressRequest);
    clientRequest.setPhones(phoneRequest);
    clientRequest.setContacts(contact);
    clientRequest.setPersonalInfoRequest(personalInfo);
    List<ChildClientRequest> childClients = clientRepository.findClientsByParentId(clientId);
    if (childClients.size() > 0) {
      clientRequest.setChildClientRequests(
              childClients.stream()
                      .filter(cli -> cli.getStatus() == StatusName.ACTIVO)
                      .map(
                      cli -> new ChildClientRequest(cli.getId(),  cli.getName(),
                               cli.getNit(), cli.getClientType(), cli.getStatus())).collect(Collectors.toList()));
    }

    return clientRequest;
  }

  @Transactional
  public ClientRequest createClient(ClientRequest clientRequest) {
    Client client = new Client(clientRequest.getName(), clientRequest.getLastName() == null ? "" : clientRequest.getLastName(), clientRequest.getNit(),
        clientRequest.getAcronym(), clientRequest.getClientType(), StatusName.ACTIVO);

    if (clientRequest.getId() != null) {
      client.setId(clientRequest.getId());
    }

    clientRepository.save(client);

    if (clientRequest.getChildClientRequests().size() > 0) {
      clientRequest.getChildClientRequests().stream().forEach(child -> {
        var childClient = clientRepository.findById(child.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Client", "id", child.getId()));
        if (child.getStatus() == StatusName.ACTIVO) {
          childClient.setParentClient(client);
        } else {
          childClient.setParentClient(null);
        }
      });
    }

    if (clientRequest.getAddresses().size() > 0) {
      List<Address> addresses = clientRequest.getAddresses().stream().map(address -> {
        Address addressEntity = new Address(client.getId(), AppId.CLIENTES, address.getType(), address.getAddress(),
            address.getZone(), address.getDepartment(), StatusName.ACTIVO);
        if (address.getId() != null) {
          addressEntity.setId(address.getId());
          addressEntity.setStatus(address.getStatus());
        }

        return addressEntity;
      }).collect(Collectors.toList());

      addressRepository.saveAll(addresses);
    }

    if (clientRequest.getPhones().size() > 0) {
      List<Telephone> phones = clientRequest.getPhones().stream().map(phone -> {
        Telephone phoneEntity = new Telephone(client.getId(), AppId.CLIENTES, phone.getPhoneType(), phone.getPhoneNumber(),
            StatusName.ACTIVO);
        if (phone.getId() != null) {
          phoneEntity.setId(phone.getId());
          phoneEntity.setStatus(phone.getStatus());
        }
        return phoneEntity;
      }).collect(Collectors.toList());

      telephoneRepository.saveAll(phones);
    }

    if (clientRequest.getContacts().size() > 0) {
      List<ContactEntity> contacts = clientRequest.getContacts().stream().map(contc -> {
        ContactEntity contact = new ContactEntity(client.getId(), AppId.CLIENTES, contc.getContactName(),
            contc.getContactAddress(), contc.getContactEmail(),
            contc.getContactPhone(), contc.getContactType(), contc.getStatus());
    
        if (contc.getId() != null && contc.getId() > 0) {
          contact.setId(contc.getId());
        }
        return contact;
      }).collect(Collectors.toList());
      contactEntityRepository.saveAll(contacts);
    }


    PersonalInfo info = new PersonalInfo(client.getId(), AppId.CLIENTES, clientRequest.getPersonalInfoRequest().getSexType(),
        clientRequest.getPersonalInfoRequest().getbDay(), clientRequest.getPersonalInfoRequest().getDocType(),
        clientRequest.getPersonalInfoRequest().getDocNum(), clientRequest.getPersonalInfoRequest().getDocEmmit(),
        clientRequest.getPersonalInfoRequest().getLawyer(), clientRequest.getPersonalInfoRequest().getObservation(), 
        clientRequest.getPersonalInfoRequest().getLawyerAssistant(), clientRequest.getPersonalInfoRequest().getLawyerJr());

    if (clientRequest.getPersonalInfoRequest().getId() != null && clientRequest.getPersonalInfoRequest().getId() > 0) {
      info.setId(clientRequest.getPersonalInfoRequest().getId());
    }

    personalInfoRepository.save(info);

    return getClient(client.getId());
  }

  @Transactional
  public void deleteClient(Long clientList) {
    Client client = clientRepository.findById(clientList)
        .orElseThrow(() -> new ResourceNotFoundException("Client", "id", clientList));
    client.setStatus(StatusName.DELETED);
    clientRepository.save(client);
  }

  public List<ShareCatResponse> getClientByStatus(StatusName status) {
    return clientRepository.findClientsByStatus(status).stream().map(cli -> new ShareCatResponse(cli.getId(), String.join(" ", cli.getName(), (cli.getLastName() == null ? "" : cli.getLastName()).trim())))
    .collect(Collectors.toList());
  }

  public PersonalInfoRequest getPersonalInfo(Long clientId) {
    return personalInfoRepository.getPersonalInfoByEntity(clientId, AppId.CLIENTES).orElse(new PersonalInfoRequest());
  }

  public List<ShareCatResponse> searchClients(String search) {
    if (search == null) {
      return clientRepository.findAllView().stream().limit(10)
              .map(client -> new ShareCatResponse(client.getId(),
                      String.join(" ", client.getNit(), client.getName(), (client.getLastName() == null ? "" : client.getLastName()).trim())))
              .collect(Collectors.toList());
    }
    return clientRepository.searchClient(search).stream()
            .map(client -> new ShareCatResponse(client.getId(),
                    String.join(" ", client.getNit(), client.getName(), (client.getLastName() == null ? "" : client.getLastName()).trim())))
            .collect(Collectors.toList());
  }

  public List<ChildClientRequest> searchClientsChild(String search) {
    if (search == null) {
      return clientRepository.findChildClients(3).stream().limit(10)
              .collect(Collectors.toList());
    }
    return clientRepository.searchChildClients(3, search).stream()
            .collect(Collectors.toList());
  }

  public List<ChildClientRequest> searchChildByParentId(Long parentId) {
    return clientRepository.findClientsByParentId(parentId)
            .stream()
            .filter(f -> f.getStatus() == StatusName.ACTIVO)
            .collect(Collectors.toList());
  }
}
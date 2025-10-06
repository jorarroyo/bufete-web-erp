package com.bufete.backend.service.recordFiles;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.recordFiles.Employee;
import com.bufete.backend.model.recordFiles.EmployeeView;
import com.bufete.backend.model.shared.ContactEntity;
import com.bufete.backend.model.shared.PersonalInfo;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.recordFiles.EmployeeRequest;
import com.bufete.backend.payload.recordFiles.EmployeesResponse;
import com.bufete.backend.payload.shared.ContactRequest;
import com.bufete.backend.payload.shared.PersonalInfoRequest;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.repository.recordFiles.EmployeeRepository;
import com.bufete.backend.repository.shared.ContactEntityRepository;
import com.bufete.backend.repository.shared.PersonalInfoRepository;
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

@Service
public class EmployeeService {

  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  private PersonalInfoRepository personalInfoRepository;

  @Autowired
  private ContactEntityRepository contactEntityRepository;

  private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);

  public PagedResponse<EmployeesResponse> getAllEmployees(UserPrincipal currentUser, int page, int size,
      String searchText, String sort, String direction) {
    Validators.validatePageNumberAndSize(page, size);

    Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
        Validators.toCamelCase(sort));
    Page<EmployeeView> employees = employeeRepository.getPagedEmployeeView(searchText, pageable);

    if (employees.getNumberOfElements() == 0) {
      return new PagedResponse<>(Collections.emptyList(), employees.getNumber(), employees.getSize(),
          employees.getTotalElements(), employees.getTotalPages(), employees.isLast());
    }

    List<EmployeesResponse> employeesResponse = employees.stream().map(employee -> {
      return new EmployeesResponse(employee.getId(), employee.getName(), employee.getNit(), employee.getIgss(),
          employee.getStatus(), employee.getCreated(), employee.getModified());
    }).collect(Collectors.toList());

    return new PagedResponse<>(employeesResponse, employees.getNumber(), employees.getSize(),
        employees.getTotalElements(), employees.getTotalPages(), employees.isLast());
  }

  public List<ShareCatResponse> getActiveEmployees() {
    return employeeRepository.getActiveEmployees(StatusName.ACTIVO).stream().map(emp -> {
      return new ShareCatResponse(emp.getId(), String.join(" ", emp.getName(), emp.getLastName()));
    }).collect(Collectors.toList());
  }

  public List<ShareCatResponse> getEmployeesByPosition(Long[] position) {
    return employeeRepository.findEmployeesByPositionId(position, StatusName.ACTIVO).stream().map(emp -> {
      return new ShareCatResponse(emp.getId(), String.join(" ", emp.getName(), emp.getLastName()));
    }).collect(Collectors.toList());
  }

  public Double getAmountByEmployee(Long employeeId) {
    return employeeRepository.findAmountByEmployee(employeeId);
  }

  public EmployeeRequest getEmployee(Long employeeId) {
    Employee employee = employeeRepository.findById(employeeId)
        .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", employeeId));

    PersonalInfoRequest personalInfo = personalInfoRepository.getPersonalInfoByEntity(employeeId, AppId.EMPLEADOS)
        .orElse(new PersonalInfoRequest());

    ContactRequest contact = new ContactRequest();
    ContactEntity contactEntity = contactEntityRepository.getContactByEntity(employeeId, AppId.EMPLEADOS)
        .orElse(new ContactEntity());
    if (contactEntity.getId() != null) {
      contact = new ContactRequest(contactEntity.getId(), contactEntity.getName(), contactEntity.getAddress(), contactEntity.getEmail(), contactEntity.getPhone(), 
        contactEntity.getType(), contactEntity.getStatus());
    }

    EmployeeRequest employeeRequest = new EmployeeRequest(employee.getName(), employee.getLastName(),
        employee.getNit(), employee.getIgss(), employee.getAddress(), employee.getHomePhone(), employee.getCelPhone(),
        employee.getCivilStatus(), employee.getChildNo(), employee.getAcademicLevel(), employee.getTitle(),
        employee.getVillage(), employee.getLanguages(), employee.getPosition(), employee.getAmountPerHour(),
        employee.getAdmissionDate());
    employeeRequest.setId(employeeId);
    employeeRequest.setPersonalInfoRequest(personalInfo);
    employeeRequest.setContactRequest(contact);

    return employeeRequest;
  }

  @Transactional
  public EmployeeRequest createEmployee(EmployeeRequest employeeRequest) {
    Employee employee = new Employee(employeeRequest.getName(), employeeRequest.getLastName(),
        employeeRequest.getNit(), employeeRequest.getIgss(), employeeRequest.getAddress(),
        employeeRequest.getHomePhone(), employeeRequest.getCelPhone(), employeeRequest.getCivilStatus(),
        employeeRequest.getChildNo(), employeeRequest.getAcademicLevel(), employeeRequest.getTitle(),
        employeeRequest.getVillage(), employeeRequest.getLanguages(), StatusName.ACTIVO, employeeRequest.getPosition(),
        employeeRequest.getAmountPerHour(), employeeRequest.getAdmissionDate());

    if (employeeRequest.getId() != null) {
      employee.setId(employeeRequest.getId());
    }

    employeeRepository.save(employee);

    ContactEntity contact = new ContactEntity(employee.getId(), AppId.EMPLEADOS,
        employeeRequest.getContactRequest().getContactName(), employeeRequest.getContactRequest().getContactAddress(),
        employeeRequest.getContactRequest().getContactEmail(), employeeRequest.getContactRequest().getContactPhone(), 1, StatusName.ACTIVO);

    if (employeeRequest.getContactRequest().getId() != null && employeeRequest.getContactRequest().getId() > 0) {
      contact.setId(employeeRequest.getContactRequest().getId());
    }

    contactEntityRepository.save(contact);

    PersonalInfo info = new PersonalInfo(employee.getId(), AppId.EMPLEADOS,
        employeeRequest.getPersonalInfoRequest().getSexType(), employeeRequest.getPersonalInfoRequest().getbDay(),
        employeeRequest.getPersonalInfoRequest().getDocType(), employeeRequest.getPersonalInfoRequest().getDocNum(),
        employeeRequest.getPersonalInfoRequest().getDocEmmit(), employeeRequest.getPersonalInfoRequest().getLawyer(),
        employeeRequest.getPersonalInfoRequest().getObservation(),
        employeeRequest.getPersonalInfoRequest().getLawyerAssistant(), employeeRequest.getPersonalInfoRequest().getLawyerJr());

    if (employeeRequest.getPersonalInfoRequest().getId() != null
        && employeeRequest.getPersonalInfoRequest().getId() > 0) {
      info.setId(employeeRequest.getPersonalInfoRequest().getId());
    }

    personalInfoRepository.save(info);

    return getEmployee(employee.getId());
  }

  @Transactional
  public boolean deleteEmployee(List<Long> employeeList) {
    for (Long id : employeeList) {
      Employee employee = employeeRepository.findById(id)
          .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));
      employee.setStatus(StatusName.DELETED);
      employeeRepository.save(employee);
    }
    return true;
  }
}
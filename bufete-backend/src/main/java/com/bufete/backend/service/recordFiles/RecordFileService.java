package com.bufete.backend.service.recordFiles;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.appConfig.AppConfiguration;
import com.bufete.backend.model.recordFiles.*;
import com.bufete.backend.model.shared.StatusHistory;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.recordFiles.RecordFileRequest;
import com.bufete.backend.payload.recordFiles.RecordFileResponse;
import com.bufete.backend.payload.recordFiles.RecordFileSearchResponse;
import com.bufete.backend.payload.shared.PagedResponse;
import com.bufete.backend.payload.shared.ShareCatResponse;
import com.bufete.backend.payload.shared.StatusHistoryRequest;
import com.bufete.backend.repository.appConfig.AppConfigRepository;
import com.bufete.backend.repository.inventory.StampInvRepository;
import com.bufete.backend.repository.recordFiles.RecordFileDetailRepository;
import com.bufete.backend.repository.recordFiles.RecordFileMergeHistRepository;
import com.bufete.backend.repository.recordFiles.RecordFileRepository;
import com.bufete.backend.security.RoleChecker;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.fileManager.FileManagerService;
import com.bufete.backend.service.inventory.StampInventoryService;
import com.bufete.backend.service.shared.StatusService;
import com.bufete.backend.util.AppConstants;
import com.bufete.backend.util.AppId;
import com.bufete.backend.util.Validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RecordFileService {

  @Autowired
  private RecordFileRepository recordFileRepository;

  @Autowired
  private RecordFileDetailRepository recordFileDetailRepository;

  @Autowired
  private StatusService statusService;

  @Autowired
  private AppConfigRepository appConfigRepository;

  @Autowired
  private RoleChecker roleChecker;

  @Autowired
  private CaseActivityService caseActivityService;

  @Autowired
  private FileManagerService fileManagerService;

  @Autowired
  private StampInventoryService stampInventoryService;

  @Autowired
  private RecordFileMergeHistRepository recordFileMergeHistRepository;

  public PagedResponse<RecordFileResponse> getAllRecordFile(UserPrincipal currentUser, int page, int size,
      String searchText, String sort, String direction) {
    Validators.validatePageNumberAndSize(page, size);

    Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
        Validators.toCamelCase(sort));
    Page<RecordFileView> recordFile = recordFileRepository.getPagedRecordFileView(searchText, pageable);

    if (recordFile.getNumberOfElements() == 0) {
      return new PagedResponse<>(Collections.emptyList(), recordFile.getNumber(), recordFile.getSize(),
          recordFile.getTotalElements(), recordFile.getTotalPages(), recordFile.isLast());
    }

    List<RecordFileResponse> recordFileResponse = recordFile.stream().map(record -> {
      return new RecordFileResponse(record.getId(), record.getType(), record.getFileNum(), record.getStatus(),
          record.getOpeningDate(), record.getCreated(), record.getModified(), record.getClientName(), record.getSubject());
    }).collect(Collectors.toList());

    return new PagedResponse<>(recordFileResponse, recordFile.getNumber(), recordFile.getSize(),
        recordFile.getTotalElements(), recordFile.getTotalPages(), recordFile.isLast());
  }

  public List<ShareCatResponse> getRecordFileByStatus(StatusName status) {
    List<ShareCatResponse> list = recordFileRepository.getRecordFileViewByStatus(status).stream().map(rfile -> {
      return new ShareCatResponse(rfile.getId(), rfile.getFileNum());
    }).collect(Collectors.toList());
    return list;
  }

  public RecordFileRequest getRecordFile(Long recordId) {
    RecordFile recordFile = recordFileRepository.findById(recordId)
        .orElseThrow(() -> new ResourceNotFoundException("RecordFile", "id", recordId));

    Long[] clientList = recordFileDetailRepository.findDetailByEntityTypeAndRecordFileId(AppConstants.CLIENT, recordId);
    Long[] lawyerList = recordFileDetailRepository.findDetailByEntityTypeAndRecordFileId(AppConstants.LAWYER, recordId);
    Long[] admonList = recordFileDetailRepository.findDetailByEntityTypeAndRecordFileId(AppConstants.ADMON, recordId);

    RecordFileRequest recordFileRequest = new RecordFileRequest(recordFile.getType(), recordFile.getSubType(),
        recordFile.getSubject(), recordFile.getObservations(), recordFile.getOpeningDate(), recordFile.getClosingDate(),
        recordFile.getLocation(), recordFile.getFileNum(), clientList, lawyerList, admonList,
        recordFile.getConfidential(), recordFile.getPriority(), recordFile.getJudgementNo(), recordFile.getStatus(),
        validateExpire(recordFile.getOpeningDate()));

    recordFileRequest.setId(recordId);
    return recordFileRequest;
  }

  @Transactional
  public RecordFileRequest createRecordFile(RecordFileRequest recordFileRequest) {
    RecordFile newRecordFile = new RecordFile(recordFileRequest.getType(), recordFileRequest.getSubType(),
        recordFileRequest.getSubject(), StatusName.ELABORADO, recordFileRequest.getObservations(),
        recordFileRequest.getOpeningDate(), recordFileRequest.getClosingDate(), recordFileRequest.getLocation(),
        recordFileRequest.getFileNum(), recordFileRequest.getConfidential(), recordFileRequest.getPriority(),
        recordFileRequest.getJudgementNo());

    if (recordFileRequest.getId() != null) {
      newRecordFile.setId(recordFileRequest.getId());
      String prevFileNum = recordFileRepository.getFileNumById(recordFileRequest.getId());
      newRecordFile.setFileNum(prevFileNum);
      recordFileDetailRepository.deleteRecordFileDetails(newRecordFile.getId());
    } else {
      newRecordFile.setFileNum(getNextFileNum());
    }
    recordFileRepository.save(newRecordFile);

    for (Long client : recordFileRequest.getClientId()) {
      RecordFileDetail clientDetail = new RecordFileDetail(AppConstants.CLIENT, client, newRecordFile.getId());
      recordFileDetailRepository.save(clientDetail);
    }
    for (Long lawyer : recordFileRequest.getLawyerId()) {
      RecordFileDetail lawyerDetail = new RecordFileDetail(AppConstants.LAWYER, lawyer, newRecordFile.getId());
      recordFileDetailRepository.save(lawyerDetail);
    }
    for (Long admon : recordFileRequest.getAdmonId()) {
      RecordFileDetail admonDetail = new RecordFileDetail(AppConstants.ADMON, admon, newRecordFile.getId());
      recordFileDetailRepository.save(admonDetail);
    }

    return getRecordFile(newRecordFile.getId());
  }

  @Transactional
  public void changeStatus(StatusHistoryRequest request) throws Exception {
    String[] privilege = { "ROLE_USUARIO_ADMIN", "ROLE_" +
        statusService.getStatusFlowPrivilege(AppId.EXPEDIENTES, request.getStatus()) };
    if (!roleChecker.hasRole(privilege)) {
      throw new Exception("No posee accesos para realizar esta acción");
    }

    RecordFile recordFile = recordFileRepository.findById(request.getId())
        .orElseThrow(() -> new ResourceNotFoundException("RecordFile", "id", request.getId()));

    StatusHistory history = new StatusHistory(request.getId(), AppId.EXPEDIENTES, request.getComment(),
        recordFile.getStatus(), request.getStatus());
    recordFile.setStatus(request.getStatus());
    if (request.getStatus().equals(StatusName.TERMINADO)) {
      recordFile.setClosingDate(new Date());
    }
    recordFileRepository.save(recordFile);
    statusService.changeStatus(history);
  }

  public PagedResponse<RecordFileResponse> getAllRecordFileSearch(UserPrincipal currentUser, int page, int size,
      String searchText, String sort, String direction, boolean all) {
    Validators.validatePageNumberAndSize(page, size);

    StatusName[] authStatusList = { StatusName.AUTORIZADO };

    if (all) {
      authStatusList = new StatusName[] { StatusName.ELABORADO, StatusName.PENDIENTE, StatusName.AUTORIZADO };
    }

    Pageable pageable = PageRequest.of(page, size, direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC,
        Validators.toCamelCase(sort));
    Page<RecordFileView> recordFile = recordFileRepository.getPagedRecordFileSearch(searchText, authStatusList,
        pageable);

    if (recordFile.getNumberOfElements() == 0) {
      return new PagedResponse<>(Collections.emptyList(), recordFile.getNumber(), recordFile.getSize(),
          recordFile.getTotalElements(), recordFile.getTotalPages(), recordFile.isLast());
    }

    List<RecordFileResponse> recordFileResponse = recordFile.stream().map(record -> new RecordFileResponse(record.getId(), record.getType(), record.getFileNum(), record.getStatus(),
        record.getOpeningDate(), record.getCreated(), record.getModified(), record.getClientName(), record.getSubject())).collect(Collectors.toList());

    return new PagedResponse<>(recordFileResponse, recordFile.getNumber(), recordFile.getSize(),
        recordFile.getTotalElements(), recordFile.getTotalPages(), recordFile.isLast());
  }

  public String getRecordFileClientNameById(Long id) {
    return recordFileRepository.getClientNamesById(id);
  }

  public List<RecordFileSearchResponse> getRecordFileListByOption(Long optionId) {
    return recordFileRepository.findAllSearchView(StatusName.AUTORIZADO)
            .stream()
            .map(s -> new RecordFileSearchResponse(s.getId(), s.getFileNum(), s.getClientName()))
            .collect(Collectors.toList());
  }

  @Transactional
  public void mergeRecordFiles(long recordId, long recordMergeId) {
    caseActivityService.updateCaseActRecordFileReference(recordId, recordMergeId);
    stampInventoryService.updateRecordFileReference(recordId, recordMergeId);
    fileManagerService.updateEntityReference(recordId, recordMergeId);
    recordFileRepository.updateRecordFileStatus(recordMergeId, StatusName.ELIMINADO);
    recordFileMergeHistRepository.save(new MergeRecordFileHistory(recordId, recordMergeId));
  }

  private String getNextFileNum() {
    Date date = new Date();
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);
    String currentMonth = String.format("%02d", (calendar.get(Calendar.MONTH) + 1));
    String currentYear = Integer.toString(calendar.get(Calendar.YEAR));
    Optional<RecordFile> recordFile = recordFileRepository.findTopById();
    if (!recordFile.isPresent()) {
      String seq = currentYear + currentMonth + String.format("%03d", 1);
      return seq;
    } else {
      RecordFile newRecord = recordFile.get();
      String sequence = newRecord.getFileNum();
      String anio = sequence.substring(0, 4);
      String mes = sequence.substring(4, 6);
      String nextVal = sequence.substring(6, sequence.length());
      if (anio.equals(currentYear) && mes.equals(currentMonth)) {
        int newSeq = Integer.parseInt(nextVal) + 1;
        return anio + mes + String.format("%03d", newSeq);
      } else {
        anio = currentYear;
        mes = currentMonth;
        nextVal = String.format("%03d", 1);
        return anio + mes + nextVal;
      }
    }
  }

  private String validateExpire(Date createDate) {
    AppConfiguration appConfig = appConfigRepository.findById(5l)
        .orElseThrow(() -> new ResourceNotFoundException("AppConfig", "id", 1));
    int expireDays = Integer.parseInt(appConfig.getConfigValue());
    Instant currentDate = Instant.now();
    if (ChronoUnit.DAYS.between(createDate.toInstant(), currentDate) > expireDays) {
      return "El expediente tiene más de " + expireDays + " dias desde su creación";
    }

    return "";
  }
}
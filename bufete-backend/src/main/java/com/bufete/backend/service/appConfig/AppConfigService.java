package com.bufete.backend.service.appConfig;

import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.appConfig.AppConfiguration;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.appConfig.AppConfigRequest;
import com.bufete.backend.repository.appConfig.AppConfigRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppConfigService {

  @Autowired
  private AppConfigRepository appConfigRepository;

  public List<AppConfigRequest> getAppConfigList(String param, Long companyId) {
    List<AppConfiguration> appConfigList = null;
    if (param.equals("ACTIVO"))
      appConfigList = appConfigRepository.getAppConfigByStatusAndCompanyId(StatusName.ACTIVO, companyId);
    appConfigList = appConfigRepository.getAppConfigByCompanyId(companyId);
    return appConfigList.stream().map(conf -> {
      return new AppConfigRequest(conf.getId(), conf.getConfigName(), conf.getConfigValue(), conf.getCompanyId(), conf.getStatus());
    }).collect(Collectors.toList());
  }
  
  public AppConfiguration createAppConfig(AppConfigRequest appConfigRequest) {
    AppConfiguration configuration = new AppConfiguration(appConfigRequest.getConfigName(), appConfigRequest.getConfigValue(), appConfigRequest.getCompanyId(), StatusName.ACTIVO);
    return appConfigRepository.save(configuration);
  }

  public AppConfigRequest getAppConfigById(Long appConfigId) {
    AppConfiguration config = appConfigRepository.findById(appConfigId)
        .orElseThrow(() -> new ResourceNotFoundException("AppConfig", "id", appConfigId));
    return new AppConfigRequest(config.getId(), config.getConfigName(), config.getConfigValue(), config.getCompanyId(), config.getStatus());
  }

  public void updateAppConfig(AppConfigRequest appConfigRequest) {
    AppConfiguration config = appConfigRepository.findById(appConfigRequest.getId())
        .orElseThrow(() -> new ResourceNotFoundException("AppConfig", "id", appConfigRequest.getId()));
    config.setConfigName(appConfigRequest.getConfigName());
    config.setConfigValue(appConfigRequest.getConfigValue());
    appConfigRepository.save(config);
  }

  public void deleteAppConfig(Long appConfigId) {
    AppConfiguration config = appConfigRepository.findById(appConfigId)
        .orElseThrow(() -> new ResourceNotFoundException("AppConfig", "id", appConfigId));
    config.setStatus(StatusName.DELETED);
    appConfigRepository.save(config);
  }

  public AppConfiguration getAppConfigByName(String appConfigName) {
    AppConfiguration config = appConfigRepository.getAppConfigByName(appConfigName)
            .orElseThrow(() -> new ResourceNotFoundException("AppConfig", "name", appConfigName));
    return config;
  }
}
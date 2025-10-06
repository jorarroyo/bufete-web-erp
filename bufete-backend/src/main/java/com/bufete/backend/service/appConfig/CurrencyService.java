package com.bufete.backend.service.appConfig;

import java.util.List;
import java.util.stream.Collectors;

import com.bufete.backend.exception.ResourceNotFoundException;
import com.bufete.backend.model.appConfig.Company;
import com.bufete.backend.model.appConfig.Currency;
import com.bufete.backend.model.shared.StatusName;
import com.bufete.backend.payload.appConfig.CurrencyRequest;
import com.bufete.backend.payload.appConfig.CurrencyResponse;
import com.bufete.backend.repository.appConfig.CurrencyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CurrencyService {

  @Autowired
  private CurrencyRepository currencyRepository;

  @Autowired
  private CompanyService companyService;

  public List<CurrencyResponse> getCurrencyList(String param) {
    if (param.equals("active"))
      return currencyRepository.getCurrencyActive().stream()
          .map(response -> new CurrencyResponse(response.getId(), 
          response.getName(), response.getShortName(), response.getExchangeValue(), 
          response.getStatus(), response.getCompany().getName()))
          .collect(Collectors.toList());
    return currencyRepository.findAll().stream()
        .map(response -> new CurrencyResponse(response.getId(), 
        response.getName(), response.getShortName(), response.getExchangeValue(), 
        response.getStatus(), response.getCompany().getName()))
        .collect(Collectors.toList());
  }

  public CurrencyResponse getCurrencyById(Long currencyId) {
    Currency currency = currencyRepository.findById(currencyId)
      .orElseThrow(() -> new ResourceNotFoundException("Currency", "id", currencyId));
    return new CurrencyResponse(currency.getId(), currency.getName(), currency.getShortName(), 
      currency.getExchangeValue(), currency.getStatus(), currency.getCompany().getName());
  }
  
  @Transactional
  public Currency creatCurrency(CurrencyRequest currencyRequest) {
    Company company = companyService.getCompanyById(currencyRequest.getCompanyId());
    Currency currency = new Currency(currencyRequest.getName(), 
      currencyRequest.getShortName(), currencyRequest.getExchangeValue(), 
      currencyRequest.getStatus(), company);
    Currency newCurrency = currencyRepository.save(currency);
    return newCurrency;
  }

  @Transactional
  public void deleteCurrency(Long currencyId) {
    Currency currency = currencyRepository.findById(currencyId)
      .orElseThrow(() -> new ResourceNotFoundException("Currency", "id", currencyId));
    currency.setStatus(StatusName.DELETED);
    currencyRepository.save(currency);
  }

  @Transactional
  public void updateCurrency(CurrencyRequest currencyRequest) {
    Company company = companyService.getCompanyById(currencyRequest.getCompanyId());
    Currency currency = new Currency(currencyRequest.getName(), 
      currencyRequest.getShortName(), currencyRequest.getExchangeValue(), 
      currencyRequest.getStatus(), company);
    currency.setId(currencyRequest.getId());
    currencyRepository.save(currency);
  }
}
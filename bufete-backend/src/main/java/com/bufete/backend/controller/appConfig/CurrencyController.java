package com.bufete.backend.controller.appConfig;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.service.appConfig.CurrencyService;
import com.bufete.backend.util.RoleConstants;
import com.bufete.backend.model.appConfig.Currency;
import com.bufete.backend.payload.appConfig.CurrencyResponse;
import com.bufete.backend.payload.appConfig.CurrencyRequest;
import com.bufete.backend.payload.shared.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/currency")
public class CurrencyController {

  @Autowired
  private CurrencyService currencyService;

  @GetMapping("/list/{params}")
  @Secured({ RoleConstants.MONEDA_LECTURA, RoleConstants.USUARIO_ADMIN })
  public List<CurrencyResponse> getAllCurrencies(@PathVariable String params) {
    return currencyService.getCurrencyList(params);
  }

  @PostMapping
  @Secured({ RoleConstants.MONEDA_CREA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> createCurrency(@Valid @RequestBody CurrencyRequest currencyRequest) {
    Currency currency = currencyService.creatCurrency(currencyRequest);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{currencyId}")
        .buildAndExpand(currency.getId()).toUri();

    return ResponseEntity.created(location).body(new ApiResponse(true, "Moneda creada con éxito!!!"));
  }

  @GetMapping("/{currencyId}")
  @Secured({ RoleConstants.MONEDA_LECTURA, RoleConstants.USUARIO_ADMIN })
  public CurrencyResponse getCurrencyById(@PathVariable Long currencyId) {
    return currencyService.getCurrencyById(currencyId);
  }

  @PutMapping
  @Secured({ RoleConstants.MONEDA_MODIFICA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> updateCurrency(@Valid @RequestBody CurrencyRequest currencyRequest) {
    currencyService.updateCurrency(currencyRequest);
    return ResponseEntity.ok(new ApiResponse(true, "Moneda actualizada con éxito!!!"));
  }

  @DeleteMapping("/{currencyId}")
  @Secured({ RoleConstants.MONEDA_ELIMINA, RoleConstants.USUARIO_ADMIN })
  public ResponseEntity<?> deleteCurrency(@PathVariable Long currencyId) {
    currencyService.deleteCurrency(currencyId);
    return ResponseEntity.ok(new ApiResponse(true, "Moneda eliminada con éxito!!!"));
  }
}
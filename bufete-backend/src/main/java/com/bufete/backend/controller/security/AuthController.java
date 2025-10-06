package com.bufete.backend.controller.security;

import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.model.appConfig.Company;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.payload.appConfig.CompanyResponse;
import com.bufete.backend.payload.security.LoginRequest;
import com.bufete.backend.payload.security.UserDetailResponse;
import com.bufete.backend.security.CustomAuthenticationToken;
import com.bufete.backend.security.JwtTokenProvider;
import com.bufete.backend.security.TokenInfo;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.appConfig.CompanyService;
import com.bufete.backend.service.appConfig.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserService userService;

  @Autowired
  private JwtTokenProvider tokenProvider;

  @Autowired
  private CompanyService companyService;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(new CustomAuthenticationToken(
        loginRequest.getUsernameOrEmail(), loginRequest.getPassword(), loginRequest.getCompanyId()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = tokenProvider.generateToken(authentication);
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    UserDetailResponse response = userService.getUserDetail(userPrincipal, jwt);
    if (response == null) return new ResponseEntity(new ApiResponse(false, "Usuario no autorizado!"), HttpStatus.UNAUTHORIZED);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/access-token")
  public ResponseEntity<?> validateToken(@Valid @RequestBody String access_token) {
    String authToken = access_token; // .getAccessToken();
    if (tokenProvider.validateToken(authToken)) {
      TokenInfo tokenInfo = tokenProvider.getTokenInfoFromJWT(authToken);
      UserDetailResponse response = userService.getUserDetail(tokenInfo.getUserId(), tokenInfo.getCompanyId(),
          authToken);
      return ResponseEntity.ok(response);
    }
    return new ResponseEntity(new ApiResponse(false, "El token es invalido!"), HttpStatus.UNAUTHORIZED);
  }

  @GetMapping("/companies/{userId}")
  public List<CompanyResponse> getCompaniesByUserId(@PathVariable Long userId) {
    return userService.getCompaniesPerUser(userId);
  }

  @GetMapping("/companies")
  public List<Company> getCompanies() {
    return companyService.getCompanyList("active");
  }
}

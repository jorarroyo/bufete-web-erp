package com.bufete.backend.controller.appConfig;

import java.util.List;

import javax.validation.Valid;

import com.bufete.backend.model.appConfig.Company;
import com.bufete.backend.payload.shared.ApiResponse;
import com.bufete.backend.payload.security.AssignRequest;
import com.bufete.backend.payload.security.ResetPasswordRequest;
import com.bufete.backend.payload.security.SignUpRequest;
import com.bufete.backend.payload.security.UserIdentityAvailability;
import com.bufete.backend.payload.appConfig.UserResponse;
import com.bufete.backend.payload.security.UserSummary;
import com.bufete.backend.payload.appConfig.RoleAssignResponse;
import com.bufete.backend.repository.appConfig.UserRepository;
import com.bufete.backend.security.CurrentUser;
import com.bufete.backend.security.UserPrincipal;
import com.bufete.backend.service.appConfig.CompanyService;
import com.bufete.backend.service.appConfig.UserService;
import com.bufete.backend.util.RoleConstants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*" )
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private CompanyService companyService;

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@GetMapping("/me")
	@Secured({ RoleConstants.USUARIO_LECTURA, RoleConstants.USUARIO_ADMIN })
	public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
		Company company = companyService.getCompanyById(currentUser.getCompanyId());
		String[] roles = userService.appsPerUserAndCompany(currentUser.getId(), currentUser.getCompanyId());
		UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(),
				company.getName(), roles);
		return userSummary;
	}

	@GetMapping("/checkUsernameAvailability")
	public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
		Boolean isAvailable = !userRepository.existsByUsername(username);
		return new UserIdentityAvailability(isAvailable);
	}

	@GetMapping("/checkEmailAvailability")
	public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
		Boolean isAvailable = !userRepository.existsByEmail(email);
		return new UserIdentityAvailability(isAvailable);
	}

	@Secured({ RoleConstants.USUARIO_ASIGNA_ROL, RoleConstants.USUARIO_ADMIN })
	@PostMapping("/assign")
	public ResponseEntity<?> assignRoles(@Valid @RequestBody AssignRequest assignRequest) {
		userService.assignRoles(assignRequest);
		return ResponseEntity.ok(new ApiResponse(true, "Roles assignados al Usuario exitosamente!"));
	}

	@Secured({ RoleConstants.USUARIO_LECTURA, RoleConstants.USUARIO_ADMIN })
	@GetMapping("/list/{params}")
	public List<UserResponse> getAllUsers(@PathVariable String params) {
		return userService.getUserList(params);
	}

	@Secured({ RoleConstants.USUARIO_CREA, RoleConstants.USUARIO_ADMIN })
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "El nombre de usuario ya ha sido registrado!"),
					HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "La dirección de correo ya ha sido registrada!"),
					HttpStatus.BAD_REQUEST);
		}

		userService.registerUser(signUpRequest);
		return ResponseEntity.ok(new ApiResponse(true, "Usuario registrado correctamente"));
	}

	@Secured({ RoleConstants.USUARIO_LECTURA, RoleConstants.USUARIO_ADMIN })
	@GetMapping("/{userId}")
	public UserResponse getUserById(@PathVariable Long userId) {
		return userService.getUserById(userId);
	}

	@DeleteMapping("/{userId}")
	@Secured({ RoleConstants.USUARIO_ELIMINA, RoleConstants.USUARIO_ADMIN })
	public ResponseEntity<?> deteleUser(@PathVariable Long userId) {
		userService.deleteUser(userId);
		return ResponseEntity.ok(new ApiResponse(true, "Usuario eliminado con éxito!!!"));
	}

	@Secured({ RoleConstants.USUARIO_ASIGNA, RoleConstants.USUARIO_ADMIN })
	@GetMapping("/assign/{userId}")
	public List<RoleAssignResponse> getRoleAssignByUserId(@PathVariable Long userId) {
		return userService.getRoleAssignByUserId(userId);
	}

	@Secured({ RoleConstants.USUARIO_RESETEA, RoleConstants.USUARIO_ADMIN })
	@PostMapping("/reset_pass")
	public void resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
		userService.resetPassword(resetPasswordRequest);
	}
}

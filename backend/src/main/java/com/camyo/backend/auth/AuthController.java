package com.camyo.backend.auth;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.camyo.backend.auth.payload.request.LoginRequest;
import com.camyo.backend.auth.payload.request.SignupRequestCamionero;
import com.camyo.backend.auth.payload.request.SignupRequestEmpresa;
import com.camyo.backend.auth.payload.response.JwtResponse;
import com.camyo.backend.auth.payload.response.MessageResponse;
import com.camyo.backend.camionero.CamioneroService;
import com.camyo.backend.configuration.jwt.JwtUtils;
import com.camyo.backend.configuration.services.UserDetailsImpl;
import com.camyo.backend.empresa.EmpresaService;
import com.camyo.backend.usuario.UsuarioService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticación", description = "API de autenticación")
public class AuthController {
    private final AuthenticationManager authenticationManager;
	private final UsuarioService usuarioService;
	private final JwtUtils jwtUtils;
	private final AuthService authService;
	private final CamioneroService camioneroService;
	private final EmpresaService empresaService;

	@Autowired
	public AuthController(AuthenticationManager authenticationManager, UsuarioService usuarioService, JwtUtils jwtUtils,
			AuthService authService, EmpresaService empresaService, CamioneroService camioneroService) {
		this.usuarioService = usuarioService;
		this.jwtUtils = jwtUtils;
		this.authenticationManager = authenticationManager;
		this.authService = authService;
		this.empresaService = empresaService;
		this.camioneroService = camioneroService;
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		try {
			Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
	
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtUtils.generateJwtToken(authentication);
	
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
	
			return ResponseEntity.ok().body(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
		} catch (BadCredentialsException exception) {
			return ResponseEntity.badRequest().body("Bad Credentials!");
		}
	}

	@GetMapping("/validate")
	public ResponseEntity<Boolean> validateToken(@RequestParam String token) {
		Boolean isValid = jwtUtils.validateJwtToken(token);
		return ResponseEntity.ok(isValid);
	}
	
	
	@PostMapping("/signup/camionero")	
	public ResponseEntity<MessageResponse> registerCamionero(@Valid @RequestBody SignupRequestCamionero signUpRequest) throws DataAccessException, IOException {
		if (usuarioService.existeUsuarioPorUsername(signUpRequest.getUsername()).equals(true)) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: El usuario ya existe!"));
		}
        if (usuarioService.existeUsuarioPorEmail(signUpRequest.getEmail()).equals(true)) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: El email ya existe!"));
		}
		if (camioneroService.obtenerCamioneroPorDNI(signUpRequest.getDni()).isPresent()) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: El DNI ya existe!"));
		}
		authService.createCamionero(signUpRequest);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/signup/empresa")	
	public ResponseEntity<MessageResponse> registerEmpresa(@Valid @RequestBody SignupRequestEmpresa signUpRequest) throws DataAccessException, IOException {
		if (usuarioService.existeUsuarioPorUsername(signUpRequest.getUsername()).equals(true)) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: El usuario ya existe!"));
		}
        if (usuarioService.existeUsuarioPorEmail(signUpRequest.getEmail()).equals(true)) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: El email ya existe!"));
		}
		if (empresaService.obtenerEmpresaPorNif(signUpRequest.getNif()).isPresent()) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: El NIF ya existe!"));
		}
		authService.createEmpresa(signUpRequest);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
    
}

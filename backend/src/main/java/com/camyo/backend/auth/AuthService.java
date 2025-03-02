package com.camyo.backend.auth;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.camyo.backend.auth.payload.request.SignupRequest;
import com.camyo.backend.empresa.Empresa;
import com.camyo.backend.usuario.Authorities;
import com.camyo.backend.usuario.AuthoritiesService;
import com.camyo.backend.usuario.Usuario;
import com.camyo.backend.usuario.UsuarioService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
public class AuthService {

    private final PasswordEncoder encoder;
	private final AuthoritiesService authoritiesService;
	private final UsuarioService usuarioService;

	@Autowired
	public AuthService(PasswordEncoder encoder, AuthoritiesService authoritiesService, UsuarioService usuarioService) {
		this.encoder = encoder;
		this.authoritiesService = authoritiesService;
		this.usuarioService = usuarioService;
	}

	@Transactional
	public void createUser(@Valid SignupRequest request) throws DataAccessException, IOException {
		Usuario usuario = new Usuario();
		usuario.setUsername(request.getUsername());
		usuario.setPassword(request.getPassword());
		usuario.setEmail(request.getEmail());
		String strRoles = request.getAuthority();
		Authorities role;

		switch (strRoles.toLowerCase()) {
		case "empresa":
			role = authoritiesService.findByAuthority("EMPRESA");
			usuario.setAuthority(role);
			usuarioService.guardarUsuario(usuario);
            Empresa empresa = new Empresa();
			break;
		default:
			role = authoritiesService.findByAuthority("CAMIONERO");
			usuario.setAuthority(role);
			usuarioService.guardarUsuario(usuario);
		}
	}
    
}

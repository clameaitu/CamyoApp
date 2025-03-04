package com.camyo.backend.auth.payload.request;

import java.time.LocalDate;
import java.util.Set;

import com.camyo.backend.camionero.Disponibilidad;
import com.camyo.backend.camionero.Licencia;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestCamionero {
	
	@NotBlank
	private String username;
	
	@NotBlank
	private String authority;

	@NotBlank
	private String password;

	@NotBlank
	private String email;
	
	@NotBlank
	private String nombre;
	
	@NotBlank
	private String telefono;
	
	@NotBlank
	private String localizacion;

	@NotBlank
	private byte[] foto;

	private String descripcion;

	@NotBlank
	private String dni;

	@NotBlank
    private Set<Licencia> licencias;

    @NotNull
    private Disponibilidad disponibilidad;

	@NotBlank
	private Boolean tieneCAP;

	private LocalDate expiracionCAP;

}

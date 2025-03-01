package com.camyo.backend.auth.payload.request;

import org.hibernate.validator.constraints.URL;

import jakarta.validation.constraints.NotBlank;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
	
	@NotBlank
	private String username;
	
	@NotBlank
	private String authority;

	@NotBlank
	private String password;

	@NotBlank
	private String email;
	
	private String nombre;
	
	private String telefono;
	
	private String localizacion;

	private String descripcion;

	private String web;

	private String nif;

}

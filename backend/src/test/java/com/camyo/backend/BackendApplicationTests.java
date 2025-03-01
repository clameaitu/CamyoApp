package com.camyo.backend;

import java.time.Year;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.camyo.backend.camionero.Camionero;
import com.camyo.backend.empresa.Empresa;
import com.camyo.backend.empresa.EmpresaService;
import com.camyo.backend.usuario.Usuario;
import com.camyo.backend.usuario.UsuarioService;

import jakarta.transaction.Transactional;

@SpringBootTest
class BackendApplicationTests {

	@Autowired
	private EmpresaService empresaService;
	private UsuarioService uservice;

	@Test
	void  contextLoads() {
		Usuario u1 = new Usuario();
		u1.setNombre("Paquito");
		
		Empresa e = new Empresa();
		e.setNif("Q12345678");
		e.setWeb("https://tumama.com");
		e.setUsuario(u1);
		this.empresaService.guardarEmpresa(e);
		
		// Camionero c1 = new Camionero();
		// Usuario user = new Usuario();
		// ;
		// this.uservice.guardarUsuario(user);
	}

}

package com.camyo.backend.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.camyo.backend.auth.payload.response.MessageResponse;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthoritiesService authService;

    @Autowired
	public UsuarioController(UsuarioService usuarioService, AuthoritiesService authService) {
		this.usuarioService = usuarioService;
		this.authService = authService;
	}

    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerUsuarios() {
        List<Usuario> usuarios = usuarioService.obtenerUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/authorities")
	public ResponseEntity<List<Authorities>> obtenerAuthorities() {
		List<Authorities> res = (List<Authorities>) authService.findAll();
		return new ResponseEntity<>(res, HttpStatus.OK);
	}


    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Integer id) {
        Usuario usuario = usuarioService.obtenerUsuarioPorId(id);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @GetMapping("/email")
	public ResponseEntity<Usuario> obtenerUsuarioPorEmail(@RequestParam("email") String email) {
		return new ResponseEntity<>(usuarioService.obtenerUsuarioPorEmail(email), HttpStatus.OK);
	}

    @GetMapping("/username")
	public ResponseEntity<Usuario> obtenerUsuarioPorUsername(@RequestParam("username") String username) {
		return new ResponseEntity<>(usuarioService.obtenerUsuarioPorUsername(username), HttpStatus.OK);
	}

    @PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Usuario> create(@RequestBody @Valid Usuario user) {
		Usuario usuarioGuardado = usuarioService.guardarUsuario(user);
		return new ResponseEntity<>(usuarioGuardado, HttpStatus.CREATED);
	}

    @PutMapping(value = "/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Usuario> update(@PathVariable("id") Integer id, @RequestBody @Valid Usuario user) {
		Usuario usuario = usuarioService.obtenerUsuarioPorId(id);
        if (usuario != null) {
            return new ResponseEntity<>(this.usuarioService.updateUser(user, id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
	}

	@DeleteMapping(value = "/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<MessageResponse> delete(@PathVariable("id") int id) {
        Usuario usuario = usuarioService.obtenerUsuarioPorId(id);
        if (usuario != null) {
            usuarioService.eliminarUsuario(id);
            return new ResponseEntity<>(new MessageResponse("User deleted!"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new MessageResponse("User not found!"), HttpStatus.NOT_FOUND);
        }
    }

}

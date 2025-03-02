package com.camyo.backend.empresa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.camyo.backend.auth.payload.response.MessageResponse;
import com.camyo.backend.exceptions.ResourceNotFoundException;
import com.camyo.backend.usuario.Usuario;
import com.camyo.backend.usuario.UsuarioService;

@RestController
@RequestMapping("/empresas")
@CrossOrigin(origins = "http://localhost:3000") // Para permitir peticiones desde React
public class EmpresaController {
    
    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Empresa> obtenerTodasEmpresas() {
        return empresaService.obtenerTodasEmpresas();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Empresa> obtenerEmpresaPorId(@PathVariable Integer id) {
        try {
            Empresa empresa = empresaService.obtenerEmpresaPorId(id);
            return new ResponseEntity<>(empresa, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/por_usuario/{id}")
    public ResponseEntity<Empresa> obtenerEmpresaPorUsuario(@PathVariable Integer id) {
        Optional<Empresa> empresa = empresaService.obtenerEmpresaPorUsuario(id);
        return empresa.isPresent() ? new ResponseEntity<>(empresa.get(), HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Object> guardarEmpresa(@RequestBody Empresa empresa) {
        // La empresa se creará con el usuario que ha iniciado sesión.
        // Si no hay un usuario autenticado, no se permitirá guardar una empresa.
        try {
            Usuario usuario = usuarioService.obtenerUsuarioActual();
            empresa.setUsuario(usuario);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new MessageResponse("Debe iniciar sesión para crear una empresa."), HttpStatus.FORBIDDEN);
        }
        
        // El usuario solo puede tener una empresa.
        Optional<Empresa> empresaUsuario = empresaService.obtenerEmpresaPorUsuario(empresa.getUsuario().getId());
        if (empresaUsuario.isPresent()) {
            return new ResponseEntity<>(new MessageResponse("El usuario ya tiene una empresa."), HttpStatus.BAD_REQUEST);
        }

        try {
            Empresa empresaGuardada = empresaService.guardarEmpresa(empresa);
            return new ResponseEntity<>(empresaGuardada, HttpStatus.CREATED);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> actualizarEmpresa(@RequestBody Empresa empresa, @PathVariable Integer id) {
        try {
            Usuario usuario = usuarioService.obtenerUsuarioActual();
            Empresa empresaParaActualizar = empresaService.obtenerEmpresaPorId(id);
            if (!empresaParaActualizar.getUsuario().equals(usuario)) {
                return new ResponseEntity<>(new MessageResponse("No puede actualizar una empresa que no es suya."), HttpStatus.FORBIDDEN);
            }     
            empresa.setUsuario(usuario);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new MessageResponse("Debe iniciar sesión para actualizar una empresa."), HttpStatus.FORBIDDEN);
        }

        try {
            Empresa empresaActualizada = empresaService.actualizarEmpresa(empresa, id);
            return new ResponseEntity<>(empresaActualizada, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminarEmpresa(@PathVariable Integer id) {
        try {
            Usuario usuario = usuarioService.obtenerUsuarioActual();
            Empresa empresaParaEliminar = empresaService.obtenerEmpresaPorId(id);
            if (!empresaParaEliminar.getUsuario().equals(usuario)) {
                return new ResponseEntity<>(new MessageResponse("No puede eliminar una empresa que no es suya."), HttpStatus.FORBIDDEN);
            }     
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new MessageResponse("Debe iniciar sesión para eliminar una empresa."), HttpStatus.FORBIDDEN);
        }

        try {
            empresaService.eliminarEmpresa(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

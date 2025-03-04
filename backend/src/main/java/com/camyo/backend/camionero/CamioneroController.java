package com.camyo.backend.camionero;

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

import jakarta.validation.Valid;

@RestController
@RequestMapping("/camioneros")
public class CamioneroController {

    private final CamioneroService camioneroService;
    private final UsuarioService usuarioService;

    @Autowired
    public CamioneroController(CamioneroService camioneroService, UsuarioService usuarioService) {
        this.camioneroService = camioneroService;
        this.usuarioService = usuarioService;
    }

    // Obtener todos los camioneros
    @GetMapping
    public ResponseEntity<List<Camionero>> obtenerTodosCamioneros() {
        List<Camionero> camioneros = camioneroService.obtenerTodosCamioneros();
        return new ResponseEntity<>(camioneros, HttpStatus.OK);
    }

    // Obtener un camionero por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Camionero> obtenerCamioneroPorId(@PathVariable Integer id) {
        Camionero camionero = camioneroService.obtenerCamioneroPorId(id);
        return new ResponseEntity<>(camionero, HttpStatus.OK);
    }

    // Obtener el camionero asociado al usuario autenticado
    @GetMapping("/mi_camionero")
    public ResponseEntity<Object> obtenerCamioneroDelUsuarioActual() {
        try {
            Usuario usuarioActual = usuarioService.obtenerUsuarioActual();
            Camionero camionero = camioneroService.obtenerCamioneroPorUsuario(usuarioActual.getId());
            return new ResponseEntity<>(camionero, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new MessageResponse("No existe camionero para este usuario o debe iniciar sesión."), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Object> guardarCamionero(@RequestBody @Valid Camionero camionero) {
        // Se asocia el camionero con el usuario que ha iniciado sesión.
        try {
            Usuario usuario = usuarioService.obtenerUsuarioActual();
            camionero.setUsuario(usuario);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new MessageResponse("Debe iniciar sesión para crear un camionero."), HttpStatus.FORBIDDEN);
        }
        
        // Verificar que el usuario no tenga ya un camionero registrado.
        try {
            Camionero camioneroExistente = camioneroService.obtenerCamioneroPorUsuario(camionero.getUsuario().getId());
            return new ResponseEntity<>(new MessageResponse("El usuario ya tiene un camionero registrado."), HttpStatus.BAD_REQUEST);
        } catch (ResourceNotFoundException ex) {
            // No se encontró un camionero para este usuario, se puede continuar.
        }
        
        // Guardar el nuevo camionero.
        try {
            Camionero camioneroGuardado = camioneroService.guardarCamionero(camionero);
            return new ResponseEntity<>(camioneroGuardado, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    // Actualizar un camionero (solo si pertenece al usuario autenticado)
    @PutMapping("/{id}")
    public ResponseEntity<Object> actualizarCamionero(@PathVariable Integer id, @RequestBody @Valid Camionero camionero) {
        try {
            Usuario usuarioActual = usuarioService.obtenerUsuarioActual();
            Camionero camioneroExistente = camioneroService.obtenerCamioneroPorId(id);

            if (!camioneroExistente.getUsuario().equals(usuarioActual)) {
                return new ResponseEntity<>(new MessageResponse("No puede actualizar un camionero que no es suyo."), HttpStatus.FORBIDDEN);
            }

            // Se mantiene la asociación con el usuario autenticado
            Camionero camioneroActualizado = camioneroService.actualizCamionero(id, camionero);
            return new ResponseEntity<>(camioneroActualizado, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new MessageResponse("Camionero no encontrado o usuario no autenticado."), HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un camionero (solo si pertenece al usuario autenticado)
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminarCamionero(@PathVariable Integer id) {
        try {
            Usuario usuarioActual = usuarioService.obtenerUsuarioActual();
            Camionero camioneroExistente = camioneroService.obtenerCamioneroPorId(id);

            if (!camioneroExistente.getUsuario().equals(usuarioActual)) {
                return new ResponseEntity<>(new MessageResponse("No puede eliminar un camionero que no es suyo."), HttpStatus.FORBIDDEN);
            }
            
            camioneroService.eliminarCamionero(id);
            return new ResponseEntity<>(new MessageResponse("Camionero eliminado correctamente."), HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new MessageResponse("Camionero no encontrado o usuario no autenticado."), HttpStatus.NOT_FOUND);
        }
    }

    // Obtener la valoración media del camionero (calculada a través del usuario asociado)
    @GetMapping("/{id}/valoracion")
    public ResponseEntity<Float> obtenerValoracionMedia(@PathVariable Integer id) {
        Float valoracion = camioneroService.obtenerValoracionMedia(id);
        return new ResponseEntity<>(valoracion, HttpStatus.OK);
    }
}

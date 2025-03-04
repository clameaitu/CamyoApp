package com.camyo.backend.camionero;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.camyo.backend.auth.payload.response.MessageResponse;
import com.camyo.backend.exceptions.ResourceNotFoundException;
import com.camyo.backend.usuario.Usuario;
import com.camyo.backend.usuario.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/camioneros")
@Tag(name = "Camioneros", description = "API para gestión de camioneros")
public class CamioneroController {

    @Autowired
    private CamioneroService camioneroService;

    @Autowired
    private UsuarioService usuarioService;

    @Operation(summary = "Obtener todos los camioneros", description = "Obtiene los detalles de todos los camioneros registrados en la BD.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Camioneros encontrados y devueltos")
    })
    @GetMapping
    public List<Camionero> obtenerTodosCamioneros() {
        return camioneroService.obtenerTodosCamioneros();
    }

    @Operation(summary = "Obtener camionero por ID", description = "Obtiene los detalles de un camionero por su ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Camionero encontrado y devuelto"),
        @ApiResponse(responseCode = "404", description = "No se encontró un camionero con ese ID")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Camionero> obtenerCamioneroPorId(@PathVariable Integer id) {
        try {
            Camionero camionero = camioneroService.obtenerCamioneroPorId(id);
            return new ResponseEntity<>(camionero, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Obtener camionero por usuario", description = "Obtiene los detalles de un camionero a partir del ID del usuario que lo posee.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Camionero encontrado y devuelto"),
        @ApiResponse(responseCode = "404", description = "No se encontró un camionero para ese usuario")
    })
    @GetMapping("/por_usuario/{id}")
    public ResponseEntity<Camionero> obtenerCamioneroPorUsuario(@PathVariable Integer id) {
        try {
            Camionero camionero = camioneroService.obtenerCamioneroPorUsuario(id);
            return new ResponseEntity<>(camionero, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Guardar camionero", description = "Almacena un camionero en la BD. Se crea con el usuario que ha iniciado sesión.")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Camionero creado con éxito"),
        @ApiResponse(responseCode = "403", description = "El usuario debe iniciar sesión"),
        @ApiResponse(responseCode = "400", description = "El usuario ya tiene un camionero registrado"),
        @ApiResponse(responseCode = "500", description = "Error interno al guardar el camionero")
    })
    @PostMapping
    public ResponseEntity<Object> guardarCamionero(@RequestBody @Valid Camionero camionero) {
        // Asignar el usuario autenticado al camionero.
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
        } catch (DataAccessException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Actualizar camionero", description = "Actualiza la información de un camionero existente, siempre que pertenezca al usuario autenticado.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Camionero actualizado con éxito"),
        @ApiResponse(responseCode = "403", description = "El usuario debe iniciar sesión o no puede actualizar un camionero que no es suyo"),
        @ApiResponse(responseCode = "404", description = "No se encontró un camionero con ese ID")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Object> actualizarCamionero(@RequestBody @Valid Camionero camionero, @PathVariable Integer id) {
        try {
            Usuario usuario = usuarioService.obtenerUsuarioActual();
            Camionero camioneroExistente = camioneroService.obtenerCamioneroPorId(id);
            if (!camioneroExistente.getUsuario().equals(usuario)) {
                return new ResponseEntity<>(new MessageResponse("No puede actualizar un camionero que no es suyo."), HttpStatus.FORBIDDEN);
            }
            // Mantener la asociación con el usuario autenticado.
            camionero.setUsuario(usuario);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new MessageResponse("Debe iniciar sesión para actualizar un camionero."), HttpStatus.FORBIDDEN);
        }
        
        try {
            Camionero camioneroActualizado = camioneroService.actualizCamionero(id, camionero);
            return new ResponseEntity<>(camioneroActualizado, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Eliminar camionero", description = "Elimina un camionero existente, siempre que pertenezca al usuario autenticado.")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Camionero eliminado con éxito"),
        @ApiResponse(responseCode = "403", description = "El usuario debe iniciar sesión o no puede eliminar un camionero que no es suyo"),
        @ApiResponse(responseCode = "404", description = "No se encontró un camionero con ese ID")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminarCamionero(@PathVariable Integer id) {
        try {
            Usuario usuario = usuarioService.obtenerUsuarioActual();
            Camionero camioneroExistente = camioneroService.obtenerCamioneroPorId(id);
            if (!camioneroExistente.getUsuario().equals(usuario)) {
                return new ResponseEntity<>(new MessageResponse("No puede eliminar un camionero que no es suyo."), HttpStatus.FORBIDDEN);
            }
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(new MessageResponse("Debe iniciar sesión para eliminar un camionero."), HttpStatus.FORBIDDEN);
        }
        
        try {
            camioneroService.eliminarCamionero(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

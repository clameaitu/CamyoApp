package com.camyo.backend.empresa;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.camyo.backend.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/empresas")
@CrossOrigin(origins = "http://localhost:3000") // Para permitir peticiones desde React
public class EmpresaController {
    
    @Autowired
    private EmpresaService empresaService;

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
    public ResponseEntity<Empresa> guardarEmpresa(@RequestBody Empresa empresa) {
        try {
            Empresa empresaGuardada = empresaService.guardarEmpresa(empresa);
            return new ResponseEntity<>(empresaGuardada, HttpStatus.CREATED);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empresa> actualizarEmpresa(@RequestBody Empresa empresa, @PathVariable Integer id) {
        try {
            Empresa empresaActualizada = empresaService.actualizarEmpresa(empresa, id);
            return new ResponseEntity<>(empresaActualizada, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEmpresa(@PathVariable Integer id) {
        try {
            empresaService.eliminarEmpresa(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

package com.camyo.backend.oferta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.camyo.backend.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/api/ofertas")
@CrossOrigin(origins = "http://localhost:3000")
public class OfertaController {

    @Autowired
    private OfertaService ofertaService;


    @GetMapping
    public List<Oferta> obtenerOfertas() {
        return ofertaService.obtenerOfertas();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Oferta> obtenerOfertaPorId(@PathVariable Integer id) {
        try {
            Oferta oferta = ofertaService.obtenerOfertaPorId(id); 
            return ResponseEntity.ok(oferta);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();  
        }
    }


    @GetMapping("/generales")
    public List<Oferta> obtenerOfertasGenerales() {
        return ofertaService.obtenerOfertasPorTipo();
    }


    @GetMapping("/cargas")
    public List<Oferta> obtenerOfertasCarga() {
        return ofertaService.obtenerOfertasCarga();
    }


    @PostMapping
    public ResponseEntity<Oferta> crearOferta(@RequestBody Oferta oferta) {
        Oferta nuevaOferta = ofertaService.guardarOferta(oferta);
        return ResponseEntity.ok(nuevaOferta);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Oferta> actualizarOferta(@PathVariable Integer id,
                                                   @RequestBody Oferta ofertaDetalles) {
        try {
            Oferta ofertaActualizada = ofertaService.modificarOferta(ofertaDetalles, id);
            return ResponseEntity.ok(ofertaActualizada);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarOferta(@PathVariable Integer id) {
        try {
            ofertaService.obtenerOfertaPorId(id);
            ofertaService.eliminarOferta(id);
            return ResponseEntity.noContent().build(); 
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/con-carga")
    public ResponseEntity<Oferta> crearOfertaConCarga(@RequestBody OfertaConCargaDTO dto) {
    Oferta nuevaOferta = ofertaService.crearOfertaConCarga(dto);
    return ResponseEntity.ok(nuevaOferta);
    }

    @PostMapping("/con-trabajo")
    public ResponseEntity<Oferta> crearOfertaConTrabajo(@RequestBody OfertaConTrabajoDTO dto) {
    Oferta nuevaOferta = ofertaService.crearOfertaConTrabajo(dto);
    return ResponseEntity.ok(nuevaOferta);
    }


}

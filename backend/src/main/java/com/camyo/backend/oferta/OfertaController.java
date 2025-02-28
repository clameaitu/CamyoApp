package com.camyo.backend.oferta;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        Optional<Oferta> ofertaOpt = ofertaService.obtenerOfertaPorId(id);
        if (ofertaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ofertaOpt.get());
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
    public ResponseEntity<Oferta> actualizarOferta(
            @PathVariable Integer id,
            @RequestBody Oferta ofertaDetalles) {

        Optional<Oferta> ofertaOpt = ofertaService.obtenerOfertaPorId(id);
        if (ofertaOpt.isEmpty()) {
            return ResponseEntity.notFound().build(); 
        }

        Oferta ofertaExistente = ofertaOpt.get();
        ofertaExistente.setTitulo(ofertaDetalles.getTitulo());
        ofertaExistente.setExperiencia(ofertaDetalles.getExperiencia());
        ofertaExistente.setLicencia(ofertaDetalles.getLicencia());
        ofertaExistente.setNotas(ofertaDetalles.getNotas());
        ofertaExistente.setEstado(ofertaDetalles.getEstado());
        ofertaExistente.setSueldo(ofertaDetalles.getSueldo());
        ofertaExistente.setFechaPublicacion(ofertaDetalles.getFechaPublicacion());

        Oferta ofertaActualizada = ofertaService.guardarOferta(ofertaExistente);
        return ResponseEntity.ok(ofertaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarOferta(@PathVariable Integer id) {
        Optional<Oferta> ofertaOpt = ofertaService.obtenerOfertaPorId(id);
        if (ofertaOpt.isEmpty()) {
            return ResponseEntity.notFound().build(); 
        }
        ofertaService.eliminarOferta(id);
        return ResponseEntity.noContent().build(); 
    }
}

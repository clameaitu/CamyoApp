package com.camyo.backend.camionero;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/camioneros")
public class CamioneroController {

    private final CamioneroService camioneroService;

    public CamioneroController(CamioneroService camioneroService) {
        this.camioneroService = camioneroService;
    }


    @GetMapping
    public ResponseEntity<List<Camionero>> getAllCamioneros() {
        List<Camionero> camioneros = camioneroService.findAll();
        return ResponseEntity.ok(camioneros);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Camionero> getCamioneroById(@PathVariable Long id) {
        Camionero camionero = camioneroService.findById(id);
        return ResponseEntity.ok(camionero);
    }

    @PostMapping
    public ResponseEntity<Camionero> createCamionero(@RequestBody Camionero camionero) {
        Camionero nuevoCamionero = camioneroService.create(camionero);
        return new ResponseEntity<>(nuevoCamionero, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Camionero> updateCamionero(
            @PathVariable Long id,
            @RequestBody Camionero camioneroDetails) {

        Camionero updatedCamionero = camioneroService.update(id, camioneroDetails);
        return ResponseEntity.ok(updatedCamionero);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCamionero(@PathVariable Long id) {
        camioneroService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package com.camyo.backend.camionero;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CamioneroService {

    private final CamioneroRepository camioneroRepository;

    public CamioneroService(CamioneroRepository camioneroRepository) {
        this.camioneroRepository = camioneroRepository;
    }

    public List<Camionero> findAll() {
        return camioneroRepository.findAll();
    }

    public Camionero findById(Long id) {
        Optional<Camionero> optionalCamionero = camioneroRepository.findById(id);
        return optionalCamionero.orElseThrow(
                () -> new RuntimeException("Camionero no encontrado con ID: " + id));
    }


    public Camionero create(Camionero camionero) {
        return camioneroRepository.save(camionero);
    }


    public Camionero update(Long id, Camionero camioneroDetails) {
        Camionero existingCamionero = findById(id);

        // Ejemplo de actualización de campos. Ajustar según tu lógica:
        existingCamionero.setDni(camioneroDetails.getDni());
        existingCamionero.setExperiencia(camioneroDetails.getExperiencia());
        existingCamionero.setLicencias(camioneroDetails.getLicencias());
        existingCamionero.setDisponibilidad(camioneroDetails.getDisponibilidad());
        existingCamionero.setTieneCAP(camioneroDetails.getTieneCAP());
        existingCamionero.setExpiracionCAP(camioneroDetails.getExpiracionCAP());
        
        // Como Camionero extiende Usuario, podrías actualizar
        // atributos heredados de Usuario (nombre, email, etc.) si procede:
        existingCamionero.setNombre(camioneroDetails.getNombre());
        existingCamionero.setEmail(camioneroDetails.getEmail());


        return camioneroRepository.save(existingCamionero);
    }

    public void delete(Long id) {
        Camionero camionero = findById(id);
        camioneroRepository.delete(camionero);
    }
}

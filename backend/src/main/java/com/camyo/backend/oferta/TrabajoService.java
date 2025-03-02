package com.camyo.backend.oferta;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.camyo.backend.exceptions.ResourceNotFoundException;

import jakarta.validation.Valid;

@Service
public class TrabajoService {
    
    @Autowired
    private TrabajoRepository trabajoRepository;

    @Transactional(readOnly = true)
    public List<Trabajo> obtenerTrabajos() {
        return trabajoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Trabajo obtenerTrabajoPorId(Integer id) {
        return trabajoRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Trabajo", "id", id));
    }

    @Transactional
    public Trabajo guardarTrabajo(Trabajo trabajo) {
        return trabajoRepository.save(trabajo);
    }

    @Transactional
    public void eliminarTrabajo(Integer id) {
        trabajoRepository.deleteById(id);
    }

    @Transactional
	public Trabajo modificarTrabajo(@Valid Trabajo trabajo, Integer idToUpdate) {
		Trabajo toUpdate = obtenerTrabajoPorId(idToUpdate);
		BeanUtils.copyProperties(trabajo, toUpdate, "id");
		trabajoRepository.save(toUpdate);
		return toUpdate;
	}
}

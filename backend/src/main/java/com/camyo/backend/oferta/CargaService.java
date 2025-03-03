package com.camyo.backend.oferta;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.camyo.backend.exceptions.ResourceNotFoundException;

import jakarta.validation.Valid;

@Service
public class CargaService {
    
    @Autowired
    private CargaRepository cargaRepository;

    @Transactional(readOnly = true)
    public List<Carga> obtenerCargas() {
        return cargaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Carga obtenerCargaPorId(Integer id) {
        return cargaRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Carga", "id", id));
    }

    @Transactional
    public Carga guardarCarga(Carga carga) {
        return cargaRepository.save(carga);
    }

    @Transactional
    public void eliminarCarga(Integer id) {
        cargaRepository.deleteById(id);
    }

    @Transactional
	public Carga modificarCarga(@Valid Carga carga, Integer idToUpdate) {
		Carga toUpdate = obtenerCargaPorId(idToUpdate);
		BeanUtils.copyProperties(carga, toUpdate, "id");
		cargaRepository.save(toUpdate);
		return toUpdate;
	}
}

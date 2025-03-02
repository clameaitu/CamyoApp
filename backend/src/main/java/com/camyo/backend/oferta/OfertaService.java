package com.camyo.backend.oferta;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.camyo.backend.exceptions.ResourceNotFoundException;

import jakarta.validation.Valid;

@Service
public class OfertaService {
    
    @Autowired
    private OfertaRepository ofertaRepository;

    @Transactional(readOnly = true)
    public List<Oferta> obtenerOfertas() {
        return ofertaRepository.findAll();
    }

    @Transactional(readOnly=true)
    public List<Oferta> obtenerOfertasPorTipo() {
        return ofertaRepository.encontrarGenerales();
    }

    @Transactional(readOnly = true)
    public List<Oferta> obtenerOfertasCarga() {
        return ofertaRepository.encontrarCargas();
    }

    @Transactional(readOnly = true)
    public Carga obtenerCarga(Integer oferta_id) {
        return ofertaRepository.encontrarCargaPorOferta(oferta_id);
    }

    @Transactional(readOnly = true)
    public Trabajo obtenerTrabajo(Integer oferta_id) {
        return ofertaRepository.encontrarTrabajoPorOferta(oferta_id);
    }
    @Transactional(readOnly = true)
    public Oferta obtenerOfertaPorId(Integer id) {
        return ofertaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Oferta", "id", id));
    }

    @Transactional
    public Oferta guardarOferta(Oferta oferta) {
        return ofertaRepository.save(oferta);
    }

    @Transactional
    public void eliminarOferta(Integer id) {
        ofertaRepository.deleteById(id);
    }

        @Transactional
	public Oferta modificarOferta(@Valid Oferta oferta, Integer idToUpdate) {
		Oferta toUpdate = obtenerOfertaPorId(idToUpdate);
		BeanUtils.copyProperties(oferta, toUpdate, "id");
		ofertaRepository.save(toUpdate);
		return toUpdate;
	}
}

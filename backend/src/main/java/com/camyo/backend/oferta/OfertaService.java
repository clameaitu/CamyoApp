package com.camyo.backend.oferta;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camyo.backend.usuario.Usuario;
import com.camyo.backend.usuario.UsuarioRepository;

@Service
public class OfertaService {
    
    @Autowired
    private OfertaRepository ofertaRepository;

    public List<Oferta> obtenerOfertas() {
        return ofertaRepository.findAll();
    }

    public Optional<Oferta> obtenerOfertaPorId(Integer id) {
        return ofertaRepository.findById(id);
    }

    public Oferta guardarOferta(Oferta oferta) {
        return ofertaRepository.save(oferta);
    }

    public void eliminarUsuario(Integer id) {
        ofertaRepository.deleteById(id);
    }
}

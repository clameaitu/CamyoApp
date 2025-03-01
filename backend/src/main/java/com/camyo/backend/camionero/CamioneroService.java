package com.camyo.backend.camionero;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.camyo.backend.exceptions.ResourceNotFoundException;
import com.camyo.backend.usuario.Usuario;
import com.camyo.backend.usuario.UsuarioService;

@Service
public class CamioneroService {

    private final CamioneroRepository camioneroRepository;
    private final UsuarioService usuarioService;

    @Autowired
    public CamioneroService(CamioneroRepository camioneroRepository, UsuarioService usuarioService) {
        this.camioneroRepository = camioneroRepository;
        this.usuarioService = usuarioService;
    }

    @Transactional(readOnly = true)
    public List<Camionero> findAll() {
        return camioneroRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Camionero findById(Integer id) {
        Optional<Camionero> optionalCamionero = camioneroRepository.findById(id);
        return optionalCamionero.orElseThrow(
                () -> new ResourceNotFoundException("Camionero", "ID", id));
    }

    @Transactional(readOnly = true)
    public Camionero findByUserId(Integer id) {
        Optional<Camionero> optionalCamionero = camioneroRepository.findByUserId(id);
        return optionalCamionero.orElseThrow(
                () -> new ResourceNotFoundException("Camionero", "ID", id));
    }


    @Transactional()
    public Camionero create(Camionero camionero) {
        return camioneroRepository.save(camionero);
    }


    @Transactional()
    public Camionero update(Integer id, Camionero camioneroUpdated) {
        Camionero existingCamionero = findById(id);
        BeanUtils.copyProperties(camioneroUpdated, existingCamionero, "id, usuario");

    return create(camioneroUpdated);

    }

    @Transactional()
    public void delete(Integer id) {
        Camionero camionero = findById(id);
        camioneroRepository.delete(camionero);
    }

    @Transactional(readOnly = true)
    public Float getValoracionMedia(Integer id){
        Usuario user = findById(id).getUsuario();        
        return usuarioService.getValoracionMedia(user.getId());
    }
}
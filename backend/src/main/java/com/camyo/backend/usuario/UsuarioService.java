package com.camyo.backend.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.camyo.backend.exceptions.ResourceNotFoundException;


import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository=usuarioRepository;
    }

    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Transactional
    public Float getValoracionMedia(Long id){
        List<Reseña> list = usuarioRepository.obtenerReseñas(id);
        Integer media = 0;
        for (Reseña reseña : list) {
            media =+ reseña.getValoracion();
        }
        return (float)media/list.size();     
    }

    @Transactional(readOnly = true)
    public Usuario getUsuarioByCamioneroId(Integer id){
        Optional<Usuario> opt = usuarioRepository.obtenerUsuarioPorCamioneroId(id);
        return opt.orElseThrow(() -> new ResourceNotFoundException("Usuario", "camioneroId", id)); 
    }
    
    @Transactional(readOnly = true)
    public Usuario getUsuarioByEmpresaId(Integer id){
        Optional<Usuario> opt = usuarioRepository.obtenerUsuarioPorEmpresaId(id);
        return opt.orElseThrow(() -> new ResourceNotFoundException("Usuario", "empresaId", id)); 
    }

}

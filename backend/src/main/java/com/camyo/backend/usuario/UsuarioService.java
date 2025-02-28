package com.camyo.backend.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public List<Usuario> obtenerUsuarios() {
        Iterable<Usuario> usuariosIterable = usuarioRepository.findAll();
        return StreamSupport.stream(usuariosIterable.spliterator(), false)
                            .collect(Collectors.toList());
    }

    public Optional<Usuario> obtenerUsuarioPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    public Usuario guardarUsuario(Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Integer id) throws DataAccessException{
        Optional<Usuario> usuarioToDelete = usuarioRepository.findById(id);
        if (usuarioToDelete.isPresent()) {
            usuarioRepository.delete(usuarioToDelete.get());
        } else {
            throw new DataAccessException("Usuario no encontrado con id: " + id) {};
        }
    }

    public boolean autenticarUsuario(String email, String rawPassword) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            return passwordEncoder.matches(rawPassword, usuario.getPassword());
        }
        return false;
    }
    
    public Usuario actualizarUsuario(Integer id, Usuario usuarioActualizado) throws DataAccessException {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isPresent()) {
            Usuario usuarioExistente = usuarioOpt.get();
            usuarioExistente.setNombre(usuarioActualizado.getNombre());
            usuarioExistente.setTelefono(usuarioActualizado.getTelefono());
            usuarioExistente.setEmail(usuarioActualizado.getEmail());
            usuarioExistente.setLocalizacion(usuarioActualizado.getLocalizacion());
            usuarioExistente.setDescripcion(usuarioActualizado.getDescripcion());
            usuarioExistente.setFoto(usuarioActualizado.getFoto());
            if (usuarioActualizado.getPassword() != null && !usuarioActualizado.getPassword().isEmpty()) {
                usuarioExistente.setPassword(passwordEncoder.encode(usuarioActualizado.getPassword()));
            }
            return usuarioRepository.save(usuarioExistente);
        } else {
            throw new DataAccessException("Usuario no encontrado con id: " + id) {};
        }
    }
}

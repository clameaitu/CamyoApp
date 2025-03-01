package com.camyo.backend.usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT u.reseñas FROM Usuario u WHERE u.id = :userId")
    public List<Reseña> obtenerReseñas(Long userId);

    @Query("SELECT c.usuario.id FROM Camionero c WHERE c.id = :id")
    public Optional<Usuario> obtenerUsuarioPorCamioneroId(Integer id);

    @Query("SELECT e.usuario.id FROM Empresa e WHERE e.id = :id")
    public Optional<Usuario> obtenerUsuarioPorEmpresaId(Integer id);
}

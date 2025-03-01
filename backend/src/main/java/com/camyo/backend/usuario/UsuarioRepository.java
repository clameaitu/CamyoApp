package com.camyo.backend.usuario;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT u.reseñas FROM Usuario u WHERE u.id = :userId")
    public List<Reseña> obtenerReseñas(Long userId);

}

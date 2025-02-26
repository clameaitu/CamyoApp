package com.camyo.backend.empresa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    @Query("SELECT DISTINCT empresa FROM Empresa empresa WHERE empresa.usuario.id = :usuarioId")
	public Optional<Empresa> obtenerPorUsuario(Long usuarioId);

}
package com.camyo.backend.oferta;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CargaRepository extends JpaRepository<Carga,Integer>{
    Optional<Carga> findById(Integer id);
}

package com.camyo.backend.oferta;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrabajoRepository extends JpaRepository<Trabajo,Integer>{
    Optional<Trabajo> findById(Integer id);
}

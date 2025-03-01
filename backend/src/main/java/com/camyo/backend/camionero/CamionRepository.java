package com.camyo.backend.camionero;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.camyo.backend.camion.Camion;

@Repository
public interface CamionRepository extends JpaRepository<Camion, Integer> {
    @Query("SELECT c.camiones FROM Camionero c WHERE c.id = :id")
    public List<Camion> obtenerCamionPorCamionero(Integer id);
}
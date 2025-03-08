package com.camyo.backend.oferta;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.camyo.backend.camionero.Camionero;

@Repository
public interface OfertaRepository extends JpaRepository<Oferta,Integer>{

    List<Oferta> findAll();

    Optional<Oferta> findById(Integer id);

    @Query("Select c FROM Carga c WHERE c.oferta.id= :id")
    Carga encontrarCargaPorOferta(Integer id);

    @Query("Select t FROM Trabajo t WHERE t.oferta.id= :id")
    Trabajo encontrarTrabajoPorOferta(Integer id);

    @Query("Select o FROM Oferta o INNER JOIN Trabajo t ON t.oferta.id= o.id")
    List<Oferta> encontrarGenerales();

    @Query("Select o FROM Oferta o INNER JOIN Carga c ON c.oferta.id= o.id")
    List<Oferta> encontrarCargas();

    @Query("Select o FROM Oferta o JOIN o.aplicados c WHERE c.id= :camId")
    List<Oferta> encontrarAplicadas(Integer camId);

    @Query("Select c.asignadas FROM Camionero c WHERE c.id= :camId")
    List<Oferta> encontrarAsignadas(Integer camId);

}

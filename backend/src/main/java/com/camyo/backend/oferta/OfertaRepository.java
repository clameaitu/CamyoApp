package com.camyo.backend.oferta;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface OfertaRepository extends CrudRepository<Oferta,Integer>{

    List<Oferta> findAll();

    Optional<Oferta> findById(Integer id);

    @Query("Select o FROM ofertas o WHERE o.tipo= 'GENERAL'")
    List<Oferta> encontrarGenerales();

    @Query("Select o FROM ofertas o WHERE o.tipo= 'CARGA'")
    List<Oferta> encontrarCargas();

//TODO: Add more queries when the rest of the models are implemented
}

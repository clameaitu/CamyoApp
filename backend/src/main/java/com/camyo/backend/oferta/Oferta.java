package com.camyo.backend.oferta;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name= "ofertas")
public class Oferta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    String titulo;

    @Enumerated(EnumType.STRING)
    OfertaTipo tipo;

    Integer experiencia;

    @Enumerated(EnumType.STRING)
    Licencia licencia;

    String notas;

    @Enumerated(EnumType.STRING)
    OfertaEstado estado;

    Double sueldo;


}

package com.camyo.backend.oferta;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Carga{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    String mercancia;
    Semirremolque semirremolque;
    Double peso;
    String Origen;
    String Destino;
    LocalDate inicio;
    LocalDateTime finMinimo;
    LocalDateTime finMaximo;
    Integer distancia;
}

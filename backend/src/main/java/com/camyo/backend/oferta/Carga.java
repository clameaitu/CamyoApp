package com.camyo.backend.oferta;

import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

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

    Integer distancia;

    @DateTimeFormat(pattern = "yyyy/MM/dd HH/mm")
    LocalDateTime inicio;

    @DateTimeFormat(pattern = "yyyy/MM/dd HH/mm")
    LocalDateTime finMinimo;

    @DateTimeFormat(pattern = "yyyy/MM/dd HH/mm")
    LocalDateTime finMaximo;


    @OneToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST })
	@JoinColumn(name = "oferta_id", referencedColumnName = "id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Oferta oferta;
}

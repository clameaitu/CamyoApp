package com.camyo.backend.oferta;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.camyo.backend.camionero.Licencia;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OfertaConTrabajoDTO {
    private String titulo;
    private Integer experiencia;
    private Licencia licencia;
    private String notas;
    private OfertaEstado estado;
    private LocalDateTime fechaPublicacion;
    private Double sueldo;


    private LocalDate fechaIncorporacion;
    private Jornada jornada;
}

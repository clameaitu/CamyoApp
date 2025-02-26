package com.camyo.backend.camionero;

import java.util.Date;
import java.util.List;

import com.camyo.backend.usuario.Usuario;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Camionero extends Usuario{

    private Date experiencia;
    private String dni;
    private List<Licencia> licencias;
    private Disponibilidad disponibilidad;
    private Boolean tieneCAP;
    private Date expiracionCAP;

}

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public OfertaTipo getTipo() {
        return tipo;
    }

    public void setTipo(OfertaTipo tipo) {
        this.tipo = tipo;
    }

    public Integer getExperiencia() {
        return experiencia;
    }

    public void setExperiencia(Integer experiencia) {
        this.experiencia = experiencia;
    }

    public Licencia getLicencia() {
        return licencia;
    }

    public void setLicencia(Licencia licencia) {
        this.licencia = licencia;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }

    public OfertaEstado getEstado() {
        return estado;
    }

    public void setEstado(OfertaEstado estado) {
        this.estado = estado;
    }

    public Double getSueldo() {
        return sueldo;
    }

    public void setSueldo(Double sueldo) {
        this.sueldo = sueldo;
    }

}

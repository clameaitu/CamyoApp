package com.camyo.backend.usuario;

import java.util.Set;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String email;

    @OneToMany(mappedBy = "usuario", cascade = { CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST, CascadeType.REMOVE }, orphanRemoval = true)
    private Set<Reseña> reseñas;

    public Usuario() {}

    public Usuario(String nombre, String email) {
        this.nombre = nombre;
        this.email = email;
    }

    
}

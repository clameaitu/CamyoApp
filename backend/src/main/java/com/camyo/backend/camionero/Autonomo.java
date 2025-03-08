package com.camyo.backend.camionero;


import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Autonomo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //Ya que el NIF del autónomo corresponde a su DNI, se borra el campo y se usa el DNI de Camionero
    // @NotBlank
    // @Pattern(regexp = "^[A-Z]\\d{8}$")
    // private String nif;

    @ElementCollection
    private List<Tarjetas> tarjetas;
    
    @OneToOne
    @JoinColumn(name = "camionero_id", referencedColumnName = "id")
    private Camionero camionero;

    
}

package com.camyo.backend.camionero;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Year;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.camyo.backend.empresa.Empresa;
import com.camyo.backend.usuario.Usuario;
import com.fasterxml.jackson.datatype.jsr310.deser.YearDeserializer;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "empresas")
@Getter
@Setter
public class Camionero{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private Year experiencia;

    @Column(name = "dni", unique = true)
    @NotBlank
    @Pattern(regexp = "^\\d{8}[A-Z]$")
    private String dni;

    private List<Licencia> licencias;

    private Disponibilidad disponibilidad;

    @NotNull
    private Boolean tieneCAP;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate expiracionCAP;

    @OneToOne(cascade = { CascadeType.DETACH, CascadeType.REFRESH, CascadeType.PERSIST })
	@JoinColumn(name = "usuario_id", referencedColumnName = "id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Usuario usuario;

    @OneToOne(mappedBy = "camionero", cascade = CascadeType.REMOVE)
    private Autonomo autonomo;
    

    @OneToMany(mappedBy = "camionero", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Camion> camiones;

    @ManyToMany()
    @JoinTable(
        name = "camioneros_empresas",
        joinColumns = {@JoinColumn(name = "camionero_id")},
        inverseJoinColumns = {@JoinColumn(name = "empresa_id")}
    )
    private List<Empresa> empresas;
}

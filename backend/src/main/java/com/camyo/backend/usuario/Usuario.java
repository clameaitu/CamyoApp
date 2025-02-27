package com.camyo.backend.usuario;
import com.camyo.backend.empresa.Empresa;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Entity
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres")
    private String nombre;

    @Pattern(regexp = "\\d{9}", message = "El número de teléfono debe tener 9 dígitos")
    private String telefono;
    
    @Column(unique = true)
    private String email;

    @Size(max = 200, message = "La localización no puede tener más de 200 caracteres")
    private String localizacion;

    @Column(length = 500)
    private String descripcion;

    @Lob
    private byte[] foto;
    
    private String password;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "empresa_id", referencedColumnName = "id")
    private Empresa empresa;

}
package com.camyo.backend.configuration;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
public class DataInitializer {

    @Autowired
    private DataSource dataSource;

    @PostConstruct
    public void init() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            Statement statement = connection.createStatement();
            statement.addBatch("INSERT IGNORE INTO authorities (id, authority) VALUES "
            + "(1, 'CAMIONERO'),"
            + "(2, 'EMPRESA')");
            // Insert Users
            statement.addBatch(
                    "INSERT IGNORE INTO Usuario (id, nombre, telefono, username, email, localizacion, descripcion, foto, password, authority) VALUES "
                            + "(1, 'Francisco Pérez', '123456789', 'user1', 'user1@example.com', 'Sevilla, España', 'Trabajador Autonomo', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y',1),"
                            + "(2, 'Ramón Corchuelo', '987654321', 'user2', 'user2@example.com', 'Barcelona, España', 'Camionero', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y',1),"
                            + "(3, 'Jose María Chico', '555666777', 'user3', 'user3@example.com', 'Valencia, España', 'USDonalds', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y',2),"
                            + "(4, 'Maria José Benavides', '111222333', 'user4', 'user4@example.com', 'Sevilla, España', 'S-A.M.', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y9',2)");

            // Insert Empresas
            statement.addBatch("INSERT IGNORE INTO empresas (id, web, nif, usuario_id) VALUES "
                    + "(1, 'https://www.example2.com', 'A12345678', 3),"
                    + "(2, 'https://www.example4.com', 'B87654321', 4)");

            // Insert Camioneros
            statement.addBatch(
                    "INSERT IGNORE INTO camioneros (id, experiencia, dni, disponibilidad, tieneCAP, expiracionCAP, usuario_id) VALUES "
                            + "(1, 5, '12345678Z', 'NACIONAL', true, '2025-12-31', 1),"
                            + "(2, 10, '23456789A', 'NACIONAL', false, '2025-12-31', 2)");

            // Insert Camionero Licencias
            statement.addBatch("INSERT IGNORE INTO camionero_licencias (camionero_id, licencias) VALUES "
                    + "(1, 'A'),"
                    + "(1, 'C1_E'),"
                    + "(2, 'C')");

            // Insert Reseñas
            statement.addBatch("INSERT IGNORE INTO Reseñas (id, comentarios, valoracion, user_id) VALUES "
                    + "(1,'Execelente trabajo', 5,1),"
                    + "(2,'Muy bueno, aunque la carga sufrió problemas', 4,1),"
                    + "(3,'No volvería a contratar', 1,2),"
                    + "(4,'Horrible, no cumplió los plazos establecidos en ninguna de nuestras ofertas que le asignamos', 1,2)");

            // Insert Ofertas
            statement.addBatch(
                    "INSERT IGNORE INTO ofertas (id, titulo, experiencia, licencia, notas, estado, fecha_publicacion, sueldo, camionero_id, empresa_id) VALUES "
                            + "(1, 'Conductor de Carga Pesada', 5, 'D1E', 'Se requiere experiencia', 'PENDIENTE', '2024-03-05 08:00', 2500.00, NULL, 1),"
                            + "(2, 'Transportista Nacional', 8, 'D1E', 'Viajes a nivel nacional', 'PENDIENTE', '2024-03-03 10:45', 3200.00, NULL, 2),"
                            + "(3, 'Carga de Sevilla a Madrid', 2, 'B', 'Descripción', 'ACEPTADA', '2024-03-02 09:30', 2500.00, 1, 1),"
                            + "(4, 'Carga de Sevilla a Murcia', 2, 'A1', 'Descripción', 'PENDIENTE', '2024-03-02 09:30', 2500.00, NULL, 2)");

            // Insert Trabajos
            statement.addBatch("INSERT IGNORE INTO Trabajos (id, fecha_incorporacion, jornada, oferta_id) VALUES "
                    + "(1,'2024-03-10', 'COMPLETA', 1),"
                    + "(2,'2024-03-10', 'NOCTURNA', 2)");

            // Insert Cargas
            statement.addBatch(
                    "INSERT IGNORE INTO Cargas (id, mercancia, peso, origen, destino, distancia, inicio, fin_minimo, fin_maximo, oferta_id) VALUES "
                            + "(1, 'Electrodomésticos', 1200.50, 'Sevilla', 'Madrid', 530, '2024-03-10 09:30', '2024-03-11 08:00', '2024-03-12 09:30', 3),"
                            + "(2, 'Ropa', 500.00, 'Sevilla', 'Murcia', 520, '2024-03-10 09:30', '2024-03-11 09:30', '2024-03-12 09:30', 4)");

            // Execute batch
            statement.executeBatch();
            System.out.println("Batch execution completed successfully.");

        }
    }
}
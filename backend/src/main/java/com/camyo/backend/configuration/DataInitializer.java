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
                            + "(1, 'cam_piloto1', '123456789', 'user1', 'user1@example.com', 'Sevilla, España', 'Trabajador Autonomo', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y',1),"
                            + "(2, 'cam_piloto2', '987654321', 'user2', 'user2@example.com', 'Barcelona, España', 'Camionero', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y',1),"
                            + "(3, 'cam_piloto3', '123454321', 'user3', 'user3@example.com', 'Vigo, España', 'Trabajador Autonomo', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y',1),"
                            + "(4, 'cam_piloto4', '987656789', 'user4', 'user4@example.com', 'Madrid, España', 'Camionero', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y',1),"
                            + "(5, 'cam_piloto5', '555666777', 'user5', 'user5@example.com', 'Valencia, España', 'EMPRESAPILOTO1', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y',2),"
                            + "(6, 'cam_piloto6', '111222333', 'user6', 'user6@example.com', 'Sevilla, España', 'EMPRESAPILOTO2', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y9',2),"
                            + "(7, 'cam_piloto7', '777666555', 'user7', 'user7@example.com', 'Alicante, España', 'EMPRESAPILOTO3', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y',2),"
                            + "(8, 'cam_piloto8', '333222111', 'user8', 'user8@example.com', 'Almería, España', 'EMPRESAPILOTO4', NULL, '$2a$10$UuMGQU9YECEKvuUMjiFXGuDHC.zzMfOhcAbcQj6Ql9ieOKUczQE9y9',2)");

            // Insert Empresas
            statement.addBatch("INSERT IGNORE INTO empresas (id, web, nif, usuario_id) VALUES "
                    + "(1, 'https://www.example1.com', 'A12345678', 5),"
                    + "(2, 'https://www.example2.com', 'B87654321', 6),"
                    + "(3, 'https://www.example3.com', 'A87654321', 7),"
                    + "(4, 'https://www.example4.com', 'B12345678', 8)");

            // Insert Camioneros
            statement.addBatch(
                    "INSERT IGNORE INTO camioneros (id, experiencia, dni, disponibilidad, tieneCAP, expiracionCAP, usuario_id) VALUES "
                            + "(1, 5, '12345678Z', 'NACIONAL', true, '2025-12-31', 1),"
                            + "(2, 10, '23456789A', 'NACIONAL', false, '2025-12-31', 2),"
                            + "(3, 5, '87654321Z', 'NACIONAL', true, '2026-12-31', 3),"
                            + "(4, 10, '98765432A', 'NACIONAL', false, '2025-05-31', 4)");

            // Insert Autónomos
            statement.addBatch("INSERT IGNORE INTO autonomo (id, camionero_id) VALUES "
                    + "(1, 1),"
                    + "(2, 3)");

            // Insert Autonomo tarjetas
            statement.addBatch("INSERT IGNORE INTO autonomo_tarjetas (autonomo_id, tarjetas) VALUES "
                    + "(1, 'VTC'),"
                    + "(2, 'VTC'),"
                    + "(2, 'VC'),"
                    + "(3, 'VTC'),"
                    + "(3, 'VC'),"
                    + "(3, 'MSL'),"
                    + "(4, 'VTC'),"
                    + "(4, 'VC'),"
                    + "(4, 'MSL'),"
                    + "(4, 'MDO')");

            // Insert Camionero Licencias
            statement.addBatch("INSERT IGNORE INTO camionero_licencias (camionero_id, licencias) VALUES "
                    + "(1, 'A'),"
                    + "(1, 'C1_E'),"
                    + "(2, 'C'),"
                    + "(3, 'D'),"
                    + "(4, 'D1_E')");

            // Insert Reseñas
            statement.addBatch("INSERT IGNORE INTO Reseñas (id, comentarios, valoracion, user_id) VALUES "
                    + "(1,'Execelente trabajo', 5,1),"
                    + "(2,'Muy bueno, aunque la carga sufrió problemas', 4,1),"
                    + "(3,'No volvería a contratar', 1,2),"
                    + "(4,'Horrible, no cumplió los plazos establecidos en ninguna de nuestras ofertas que le asignamos', 1,2),"
                    + "(5,'Mal', 2,3),"
                    + "(6,'Bien', 4,4)");

            // Insert Ofertas
            statement.addBatch(
                    "INSERT IGNORE INTO ofertas (id, titulo, experiencia, licencia, notas, estado, fecha_publicacion, sueldo, camionero_id, empresa_id) VALUES "
                            + "(1, 'Conductor de Carga Pesada', 5, 'D1_E', 'Se requiere experiencia en cargas pesadas', 'PENDIENTE', '2025-03-05 08:00', 2500.00, NULL, 1),"
                            + "(2, 'Transportista Nacional', 8, 'D1_E', 'Viajes a nivel nacional', 'PENDIENTE', '2025-03-03 10:45', 3200.00, NULL, 2),"
                            + "(3, 'Carga de Sevilla a Madrid', 2, 'B', 'Transportar 1200 kg de electrodomesticos de Sevilla a Madrid', 'ACEPTADA', '2025-03-02 20:30', 2500.00, 2, 1),"
                            + "(4, 'Carga de Sevilla a Murcia', 0, 'A1', 'Transportar 500 kg de ropa de Sevilla a Murcia', 'PENDIENTE', '2025-03-02 09:30', 2500.00, NULL, 2),"
                            + "(5, 'Conductor Nocturna', 10, 'D1_E', 'Buscamos trabajador para mover cargas en horario nocturno', 'PENDIENTE', '2025-01-05 08:00', 2500.00, NULL, 1),"
                            + "(6, 'Transportista en Valencia', 8, 'D1_E', 'Viajes limitados a la comunidad valenciana', 'PENDIENTE', '2025-03-03 10:45', 3200.00, NULL, 2),"
                            + "(7, 'Carga de Barcelona a Sevilla', 20, 'B', 'Transportar 10 t de alimentos de Barcelona a Sevilla', 'ACEPTADA', '2025-07-02 09:30', 5000.00, 1, 1),"
                            + "(8, 'Carga de Barcelona a Madrid', 2, 'A1', 'Transportar 500 kg de ropa de Sevilla a Murcia', 'RECHAZADA', '2025-01-02 09:30', 2500.00, NULL, 2),"
                            + "(9, 'Conductor de Multiples cargas', 5, 'D1_E', 'Se requiere experiencia, tanto para cargas pesadas como frágiles', 'ACEPTADA', '2025-02-10 08:00', 2500.00, 2, 1),"
                            + "(10, 'Transportista en Andalucía', 8, 'D1_E', 'Viajes limitados a la comunidad andaluza', 'PENDIENTE', '2025-03-03 10:45', 3200.00, NULL, 2),"
                            + "(11, 'Carga de Valencia a Vigo', 2, 'B', 'Transportar 3.5 t de pescado de Valencia a Vigo', 'ACEPTADA', '2025-03-02 09:30', 2500.00, 3, 1),"
                            + "(12, 'Carga de Sevilla a Alicante', 2, 'C', 'Transportar 300 kg de paquetes de Sevilla a Murcia', 'PENDIENTE', '2025-03-02 18:00', 2500.00, NULL, 2)");

            // Insert Trabajos
            statement.addBatch("INSERT IGNORE INTO Trabajos (id, fecha_incorporacion, jornada, oferta_id) VALUES "
                    + "(1,'2025-03-10', 'REGULAR', 1),"
                    + "(2,'2025-03-10', 'FLEXIBLE', 2),"
                    + "(3,'2025-02-15', 'COMPLETA', 5),"
                    + "(4,'2025-03-10', 'NOCTURNA', 6),"
                    + "(5,'2025-03-12', 'MIXTA', 9),"
                    + "(6,'2025-03-10', 'RELEVOS', 10)");

            // Insert Cargas
            statement.addBatch(
                    "INSERT IGNORE INTO Cargas (id, mercancia, peso, origen, destino, distancia, inicio, fin_minimo, fin_maximo, oferta_id) VALUES "
                            + "(1, 'Electrodomésticos', 1200.50, 'Sevilla', 'Madrid', 530, '2025-03-10 09:30', '2025-03-11 08:00', '2025-03-12 09:30', 3),"
                            + "(2, 'Ropa', 500.00, 'Sevilla', 'Murcia', 520, '2025-03-10 09:30', '2025-03-11 09:30', '2025-03-12 09:30', 4),"
                            + "(3, 'Alimentos', 10000.00 , 'Barcelona', 'Sevilla', 830, '2025-07-10 09:30', '2025-07-13 08:00', '2025-07-17 09:30', 7),"
                            + "(4, 'Muebles', 2000.00, 'Barcelona', 'Madrid', 620, '2025-03-10 09:30', '2025-03-11 09:30', '2025-03-12 09:30', 8),"
                            + "(5, 'Pescado', 3500.50, 'Valencia', 'Vigo', 955, '2025-03-10 09:30', '2025-03-13 08:00', '2025-05-17 09:30', 11),"
                            + "(6, 'Conjunto de paquete pequeños', 300.00, 'Sevilla', 'Alicante', 595, '2025-03-10 09:30', '2025-03-11 09:30', '2025-03-12 09:30', 12)");

            // Execute batch
            statement.executeBatch();
            System.out.println("Batch execution completed successfully.");

        }
    }
}
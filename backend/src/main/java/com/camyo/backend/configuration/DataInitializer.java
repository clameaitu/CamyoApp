package com.camyo.backend.configuration;

import java.sql.Connection;
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
                                + "(201, 'CAMIONERO'),"
                                + "(202, 'EMPRESA')");
                        // Insert Users
                        statement.addBatch("INSERT IGNORE INTO usuario (id, nombre, telefono, username, email, localizacion, descripcion, foto, password, authority) VALUES "
                                + "(201, 'cam_piloto1', '123456789', 'camionero1', 'camionero1@ejemplo.com', 'Sevilla, España', 'Camionero por contrato', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',201),"
                                + "(202, 'cam_piloto2', '987654321', 'camionero2', 'camionero2@ejemplo.com', 'Barcelona, España', 'Camionero por contrato', NULL, '$2a$10$MdDb.2lyMB4hG7u.5AFU2.eDVHXpZcnfzuTDNf/OzkOkFGRScQlSu',201),"
                                + "(203, 'cam_piloto3', '123454321', 'camionero3', 'camionero3@ejemplo.com', 'Vigo, España', 'Camionero por contrato', NULL, '$2a$10$5vxm1b6TSa.x4TMs1Fhu3e1FAyIMRL4cm5WM35ZAMKN67aR3fTplW',201),"
                                + "(204, 'cam_piloto4', '987656789', 'camionero4', 'camionero4@ejemplo.com', 'Madrid, España', 'Camionero por contrato', NULL, '$2a$10$9ieupLSjo2Bs.LQUuCHs6uEb2Dv991yiFY00TjqSqhC8Gui3PzQ4q',201),"
                                + "(205, 'cam_piloto5', '123456789', 'camionero5', 'camionero5@ejemplo.com', 'Sevilla, España', 'Camionero por contrato', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',201),"
                                + "(206, 'cam_piloto6', '987654321', 'camionero6', 'camionero6@ejemplo.com', 'Barcelona, España', 'Camionero por contrato', NULL, '$2a$10$MdDb.2lyMB4hG7u.5AFU2.eDVHXpZcnfzuTDNf/OzkOkFGRScQlSu',201),"
                                + "(207, 'cam_piloto7', '123454321', 'camionero7', 'camionero7@ejemplo.com', 'Vigo, España', 'Camionero por contrato', NULL, '$2a$10$5vxm1b6TSa.x4TMs1Fhu3e1FAyIMRL4cm5WM35ZAMKN67aR3fTplW',201),"
                                + "(208, 'cam_piloto8', '987656789', 'camionero8', 'camionero8@ejemplo.com', 'Madrid, España', 'Camionero autónomo', NULL, '$2a$10$9ieupLSjo2Bs.LQUuCHs6uEb2Dv991yiFY00TjqSqhC8Gui3PzQ4q',201),"
                                + "(209, 'cam_piloto9', '123456789', 'camionero9', 'camionero9@ejemplo.com', 'Sevilla, España', 'Camionero autónomo', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',201),"
                                + "(210, 'cam_piloto10', '987654321', 'camionero10', 'camionero10@ejemplo.com', 'Barcelona, España', 'Camionero autónomo', NULL, '$2a$10$MdDb.2lyMB4hG7u.5AFU2.eDVHXpZcnfzuTDNf/OzkOkFGRScQlSu',201),"
                                + "(211, 'cam_piloto11', '123454321', 'camionero11', 'camionero11@ejemplo.com', 'Vigo, España', 'Camionero por contrato', NULL, '$2a$10$5vxm1b6TSa.x4TMs1Fhu3e1FAyIMRL4cm5WM35ZAMKN67aR3fTplW',201),"
                                + "(212, 'cam_piloto12', '987656789', 'camionero12', 'camionero12@ejemplo.com', 'Madrid, España', 'Camionero por contrato', NULL, '$2a$10$9ieupLSjo2Bs.LQUuCHs6uEb2Dv991yiFY00TjqSqhC8Gui3PzQ4q',201),"
                                + "(213, 'cam_piloto13', '123456789', 'camionero13', 'camionero13@ejemplo.com', 'Sevilla, España', 'Camionero autónomo', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',201),"
                                + "(214, 'cam_piloto14', '987654321', 'camionero14', 'camionero14@ejemplo.com', 'Barcelona, España', 'Camionero autónomo', NULL, '$2a$10$MdDb.2lyMB4hG7u.5AFU2.eDVHXpZcnfzuTDNf/OzkOkFGRScQlSu',201),"
                                + "(215, 'cam_piloto15', '123454321', 'camionero15', 'camionero15@ejemplo.com', 'Vigo, España', 'Camionero por contrato', NULL, '$2a$10$5vxm1b6TSa.x4TMs1Fhu3e1FAyIMRL4cm5WM35ZAMKN67aR3fTplW',201),"
                                + "(216, 'cam_piloto16', '987656789', 'camionero16', 'camionero16@ejemplo.com', 'Madrid, España', 'Camionero por contrato', NULL, '$2a$10$9ieupLSjo2Bs.LQUuCHs6uEb2Dv991yiFY00TjqSqhC8Gui3PzQ4q',201),"
                                + "(217, 'cam_piloto17', '123456789', 'camionero17', 'camionero17@ejemplo.com', 'Sevilla, España', 'Camionero por contrato', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',201),"
                                + "(218, 'cam_piloto18', '987654321', 'camionero18', 'camionero18@ejemplo.com', 'Barcelona, España', 'Camionero por contrato', NULL, '$2a$10$MdDb.2lyMB4hG7u.5AFU2.eDVHXpZcnfzuTDNf/OzkOkFGRScQlSu',201),"
                                + "(219, 'cam_piloto19', '123454321', 'camionero19', 'camionero19@ejemplo.com', 'Vigo, España', 'Camionero autónomo', NULL, '$2a$10$5vxm1b6TSa.x4TMs1Fhu3e1FAyIMRL4cm5WM35ZAMKN67aR3fTplW',201),"
                                + "(220, 'cam_piloto20', '987656789', 'camionero20', 'camionero20@ejemplo.com', 'Madrid, España', 'Camionero autónomo', NULL, '$2a$10$9ieupLSjo2Bs.LQUuCHs6uEb2Dv991yiFY00TjqSqhC8Gui3PzQ4q',201),"
                                + "(221, 'cam_piloto21', '123456789', 'camionero21', 'camionero21@ejemplo.com', 'Sevilla, España', 'Camionero autónomo', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',201),"
                                

                                + "(222, 'emp_piloto1', '555666777', 'empresa1', 'empresa1@ejemplo.com', 'Valencia, España', 'Empresa piloto numero 1', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',202),"
                                + "(223, 'emp_piloto2', '111222333', 'empresa2', 'empresa2@ejemplo.com', 'Sevilla, España', 'Empresa piloto numero 2', NULL, '$2a$10$MdDb.2lyMB4hG7u.5AFU2.eDVHXpZcnfzuTDNf/OzkOkFGRScQlSu',202),"
                                + "(224, 'emp_piloto3', '777666555', 'empresa3', 'empresa3@ejemplo.com', 'Alicante, España', 'Empresa piloto numero 3', NULL, '$2a$10$5vxm1b6TSa.x4TMs1Fhu3e1FAyIMRL4cm5WM35ZAMKN67aR3fTplW',202),"
                                + "(225, 'emp_piloto4', '333222111', 'empresa4', 'empresa4@ejemplo.com', 'Almería, España', 'Empresa piloto numero 4', NULL, '$2a$10$9ieupLSjo2Bs.LQUuCHs6uEb2Dv991yiFY00TjqSqhC8Gui3PzQ4q',202),"
                                + "(226, 'emp_piloto5', '555666777', 'empresa5', 'empresa5@ejemplo.com', 'Valencia, España', 'Empresa piloto numero 5', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',202),"
                                + "(227, 'emp_piloto6', '111222333', 'empresa6', 'empresa6@ejemplo.com', 'Sevilla, España', 'Empresa piloto numero 6', NULL, '$2a$10$MdDb.2lyMB4hG7u.5AFU2.eDVHXpZcnfzuTDNf/OzkOkFGRScQlSu',202),"
                                + "(228, 'emp_piloto7', '777666555', 'empresa7', 'empresa7@ejemplo.com', 'Alicante, España', 'Empresa piloto numero 7', NULL, '$2a$10$5vxm1b6TSa.x4TMs1Fhu3e1FAyIMRL4cm5WM35ZAMKN67aR3fTplW',202),"
                                + "(229, 'emp_piloto8', '333222111', 'empresa8', 'empresa8@ejemplo.com', 'Almería, España', 'Empresa piloto numero 8', NULL, '$2a$10$9ieupLSjo2Bs.LQUuCHs6uEb2Dv991yiFY00TjqSqhC8Gui3PzQ4q',202),"
                                + "(230, 'emp_piloto9', '111222333', 'empresa9', 'empresa9@ejemplo.com', 'Sevilla, España', 'Empresa piloto numero 9', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',202),"
                                + "(231, 'emp_piloto10', '777666555', 'empresa10', 'empresa10@ejemplo.com', 'Alicante, España', 'Empresa piloto numero 10', NULL, '$2a$10$MdDb.2lyMB4hG7u.5AFU2.eDVHXpZcnfzuTDNf/OzkOkFGRScQlSu',202),"
                                + "(232, 'emp_piloto11', '333222111', 'empresa11', 'empresa11@ejemplo.com', 'Almería, España', 'Empresa piloto numero 11', NULL, '$2a$10$5vxm1b6TSa.x4TMs1Fhu3e1FAyIMRL4cm5WM35ZAMKN67aR3fTplW',202),"
                                + "(233, 'emp_piloto12', '555666777', 'empresa12', 'empresa12@ejemplo.com', 'Valencia, España', 'Empresa piloto numero 12', NULL, '$2a$10$9ieupLSjo2Bs.LQUuCHs6uEb2Dv991yiFY00TjqSqhC8Gui3PzQ4q',202),"
                                + "(234, 'emp_piloto13', '111222333', 'empresa13', 'empresa13@ejemplo.com', 'Sevilla, España', 'Empresa piloto numero 13', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',202),"
                                + "(235, 'emp_piloto14', '777666555', 'empresa14', 'empresa14@ejemplo.com', 'Alicante, España', 'Empresa piloto numero 14', NULL, '$2a$10$MdDb.2lyMB4hG7u.5AFU2.eDVHXpZcnfzuTDNf/OzkOkFGRScQlSu',202),"
                                + "(236, 'emp_piloto15', '333222111', 'empresa15', 'empresa15@ejemplo.com', 'Almería, España', 'Empresa piloto numero 15', NULL, '$2a$10$5vxm1b6TSa.x4TMs1Fhu3e1FAyIMRL4cm5WM35ZAMKN67aR3fTplW',202),"
                                + "(237, 'emp_piloto16', '777666555', 'empresa16', 'empresa16@ejemplo.com', 'Alicante, España', 'Empresa piloto numero 16', NULL, '$2a$10$9ieupLSjo2Bs.LQUuCHs6uEb2Dv991yiFY00TjqSqhC8Gui3PzQ4q',202),"
                                + "(238, 'emp_piloto17', '333222111', 'empresa17', 'empresa17@ejemplo.com', 'Almería, España', 'Empresa piloto numero 17', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',202),"
                                
                                
                                + "(239, 'Isabel', '777666555', 'isabel', 'isabel@ejemplo.com', 'Badajoz, España', 'camionera autonoma', NULL, '$2a$10$Kgkh3hHPPmPeu4TxhzC1DeYbZq.spo9FqHNDcPHiKxXgprBSZznF2',201),"
                                + "(240, 'mopa', '777666555', 'mopa', 'mopa@ejemplo.com', 'Badajoz, España', 'Empresa extremeña', NULL, '$2a$10$Kgkh3hHPPmPeu4TxhzC1DeYbZq.spo9FqHNDcPHiKxXgprBSZznF2',202),"
                                // contraseñas: 12
                                + "(241, 'Manuel', '333222111', 'manuel', 'manuel@gmail.com', 'Almería, España', 'Camionero buscando trabajo', NULL, '$2a$10$Kgkh3hHPPmPeu4TxhzC1DeYbZq.spo9FqHNDcPHiKxXgprBSZznF2',201),"
                                + "(242, 'José Luis', '777666555', 'joseluis', 'josel@gmail.com', 'Badajoz, España', 'Camionero autonomo', NULL, '$2a$10$Kgkh3hHPPmPeu4TxhzC1DeYbZq.spo9FqHNDcPHiKxXgprBSZznF2',201),"
                                //contraseñas: pass
                                + "(243, 'emp_test', '555666777', 'empresa_test', 'emp_test@ejemplo.com', 'Valencia, España', 'TESTPILOTO', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',202),"
                                + "(244, 'cam_test', '123456789', 'camionero_test', 'cam_test@ejemplo.com', 'Sevilla, España', 'TESTPILOTO', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',201),"
                                + "(245, 'Transportes SA', '666555666', 'transportessa', 'transportes_sa@ejemplo.com', 'Cáceres, España', 'Empresa española de gran importancia', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',202),"
                                + "(246, 'CamyoTrans', '656656556', 'camyotrans', 'camyotrans@ejemplo.com', 'Sevilla, España', 'Transportistas sevillanos por todo el mundo', NULL, '$2a$10$rR8QzJaetgIk0m1ry6tWae.t6zb8uJ6WsSZyNO16FN.K6ILD4SIBq',202)");
                                
                        // Insert Empresas
                        statement.addBatch("INSERT IGNORE INTO empresas (id, web, nif, usuario_id) VALUES "
                                + "(201, 'https://www.ejemplo1.com', 'A12345678', 222),"
                                + "(202, 'https://www.ejemplo2.com', 'B87654321', 223),"
                                + "(203, 'https://www.ejemplo3.com', 'D87654321', 224),"
                                + "(204, 'https://www.ejemplo4.com', 'E12345678', 225),"
                                + "(205, 'https://www.ejemplo5.com', 'F12345678', 226),"
                                + "(206, 'https://www.ejemplo6.com', 'G87654321', 227),"
                                + "(207, 'https://www.ejemplo7.com', 'I87654321', 228),"
                                + "(208, 'https://www.ejemplo8.com', 'H12345678', 229),"
                                + "(209, 'https://www.ejemplo9.com', 'J12345678', 230),"
                                + "(210, 'https://www.ejemplo10.com', 'K87654321', 231),"
                                + "(211, 'https://www.ejemplo11.com', 'L87654321', 232),"
                                + "(212, 'https://www.ejemplo12.com', 'M12345678', 233),"
                                + "(213, 'https://www.ejemplo13.com', 'N12345678', 234),"
                                + "(214, 'https://www.ejemplo14.com', 'O87654321', 235),"
                                + "(215, 'https://www.ejemplo15.com', 'P87654321', 236),"
                                + "(216, 'https://www.ejemplo16.com', 'Q12345678', 237),"
                                + "(217, 'https://www.ejemplo17.com', 'R12345678', 238),"
                                + "(218, 'https://www.ejemplo18.com', 'C12345678', 240),"
                                + "(219, 'https://www.ejemplo19.com', 'D13545678', 243),"
                                + "(220, 'https://www.transportessa.com', 'E13545678', 245),"
                                + "(221, 'https://www.camyotrans.com', 'F13545678', 246)");

                        // Insert Camioneros
                        statement.addBatch("INSERT IGNORE INTO camioneros (id, experiencia, dni, disponibilidad, tieneCAP, expiracionCAP, usuario_id) VALUES "
                                + "(201, 5, '12345678Z', 'NACIONAL', true, '2025-12-31', 201),"
                                + "(202, 10, '23456789A', 'NACIONAL', false, '2025-12-31', 202),"
                                + "(203, 5, '87654321Z', 'NACIONAL', true, '2026-12-31', 203),"
                                + "(204, 22, '98765432A', 'NACIONAL', false, '2025-05-31', 204),"
                                + "(205, 7, '77777777A', 'NACIONAL', false, '2025-05-31', 205),"
                                + "(206, 5, '12345678B', 'NACIONAL', true, '2025-12-31', 206),"
                                + "(207, 10, '23456789C', 'NACIONAL', false, '2025-12-31', 207),"
                                + "(208, 5, '87654321D', 'NACIONAL', true, '2026-12-31', 208),"
                                + "(209, 22, '98765432E', 'NACIONAL', false, '2025-05-31', 209),"
                                + "(210, 5, '12345678F', 'NACIONAL', true, '2025-12-31', 210),"
                                + "(211, 10, '23456789G', 'NACIONAL', false, '2025-12-31', 211),"
                                + "(212, 5, '87654321H', 'NACIONAL', true, '2026-12-31', 212),"
                                + "(213, 22, '98765432I', 'NACIONAL', false, '2025-05-31', 213),"
                                + "(214, 5, '12345678J', 'NACIONAL', true, '2025-12-31', 214),"
                                + "(215, 10, '23456789K', 'NACIONAL', false, '2025-12-31', 215),"
                                + "(216, 5, '87654321L', 'NACIONAL', true, '2026-12-31', 216),"
                                + "(217, 22, '98765432M', 'NACIONAL', false, '2025-05-31', 217),"
                                + "(218, 10, '23456789N', 'NACIONAL', false, '2025-12-31', 218),"
                                + "(219, 5, '87654321O', 'NACIONAL', true, '2026-12-31', 219),"
                                + "(220, 22, '98765432P', 'NACIONAL', false, '2025-05-31', 220),"
                                + "(221, 22, '98765432Q', 'NACIONAL', false, '2025-05-31', 221)," 
                                + "(222, 7, '77777777R', 'NACIONAL', false, '2025-05-31', 239),"
                                + "(223, 22, '98765432S', 'NACIONAL', true, '2025-05-31', 241),"
                                + "(224, 20, '98765432T', 'NACIONAL', true, '2025-05-31', 242),"
                                + "(225, 20, '98765432T', 'NACIONAL', true, '2025-05-31', 244)");

                        // Insert Camiones
                        statement.addBatch("INSERT IGNORE INTO camion (id, matricula, modelo, foto, notas, camionero_id) VALUES "
                                + "(201, '1234ABC', 'Ford Transit', NULL, 'Camión en excelente estado', 201),"
                                + "(202, '5678DEF', 'Mercedes Benz Sprinter', NULL, NULL, 202),"
                                + "(203, '8765GHI', 'Mercedes Benz Actros', NULL, NULL, 203),"
                                + "(204, '4321JKL', 'Volksvagen Crafter', NULL, 'Recientemente ha pasado la revision', 204), "
                                + "(205, '1235ABC', 'Ford Transit', NULL, 'Camión en excelente estado', 205),"
                                + "(206, '5679DEF', 'Mercedes Benz Sprinter', NULL, NULL, 206),"
                                + "(207, '8766GHI', 'Mercedes Benz Actros', NULL, NULL, 207),"
                                + "(208, '4322JKL', 'Volksvagen Crafter', NULL, 'Recientemente ha pasado la revision', 208), "
                                + "(209, '1236ABC', 'Ford Transit', NULL, 'Camión en excelente estado', 209),"
                                + "(210, '5680DEF', 'Mercedes Benz Sprinter', NULL, NULL, 210),"
                                + "(211, '8767GHI', 'Mercedes Benz Actros', NULL, NULL, 211),"
                                + "(212, '4323JKL', 'Volksvagen Crafter', NULL, 'Recientemente ha pasado la revision', 212), "
                                + "(213, '1237ABC', 'Ford Transit', NULL, 'Camión en excelente estado', 213),"
                                + "(214, '5681DEF', 'Mercedes Benz Sprinter', NULL, NULL, 214),"
                                + "(215, '8768GHI', 'Mercedes Benz Actros', NULL, NULL, 215),"
                                + "(216, '4325JKL', 'Volksvagen Crafter', NULL, 'Recientemente ha pasado la revision', 216), "
                                + "(217, '1238ABC', 'Ford Transit', NULL, 'Camión en excelente estado', 217),"
                                + "(218, '5682DEF', 'Mercedes Benz Sprinter', NULL, NULL, 218),"
                                + "(219, '8769GHI', 'Mercedes Benz Actros', NULL, NULL, 219),"
                                + "(220, '1239ABC', 'Ford Transit', NULL, 'Camión en excelente estado', 220),"
                                + "(221, '5683DEF', 'Mercedes Benz Sprinter', NULL, NULL, 221),"
                                + "(222, '4326JKL', 'Volksvagen Crafter', NULL, 'Recientemente ha pasado la revision', 222)");

                        // Insert Autónomos
                        statement.addBatch("INSERT IGNORE INTO autonomo (id, camionero_id) VALUES "
                                + "(201, 208),"
                                + "(202, 209),"
                                + "(203, 210),"
                                + "(204, 213),"
                                + "(205, 214),"
                                + "(206, 219),"
                                + "(207, 220),"
                                + "(208, 221),"
                                + "(209, 224)");

                        // Insert Autonomo tarjetas
                        statement.addBatch("INSERT IGNORE INTO autonomo_tarjetas (autonomo_id, tarjetas) VALUES "
                                + "(201, 1),"
                                + "(202, 2),"
                                + "(203, 3),"
                                + "(204, 4),"
                                + "(205, 1),"
                                + "(206, 2),"
                                + "(207, 3),"
                                + "(208, 4),"
                                + "(209, 1)");


                        // La base de datos toma la posición del enum en vez del valor:
                                // AM: 0
                                // A1: 1
                                // A2: 2
                                // A: 3
                                // B: 4
                                // C1: 5
                                // C: 6
                                // C1_E: 7
                                // C_E: 8
                                // D1: 9
                                // D_E: 10
                                // D1_E: 11
                                // D: 12
                        statement.addBatch("INSERT IGNORE INTO camionero_licencias (camionero_id, licencias) VALUES "
                                + "(201, 6),"
                                + "(202, 6),"
                                + "(203, 6),"
                                + "(204, 6),"
                                + "(205, 6),"
                                + "(206, 6),"
                                + "(207, 6),"
                                + "(208, 6),"
                                + "(209, 6),"
                                + "(210, 6),"
                                + "(211, 6),"
                                + "(212, 6),"
                                + "(213, 6),"
                                + "(214, 6),"
                                + "(215, 6),"
                                + "(216, 6),"
                                + "(217, 6),"
                                + "(218, 6),"
                                + "(219, 6),"
                                + "(220, 6),"
                                + "(221, 6),"
                                + "(222, 6),"
                                + "(223, 6),"
                                + "(224, 6),"
                                + "(225, 6),"
                                + "(201, 8),"
                                + "(202, 8),"
                                + "(203, 8),"
                                + "(204, 8),"
                                + "(205, 8),"
                                + "(206, 8),"
                                + "(207, 8),"
                                + "(208, 8),"
                                + "(209, 8),"
                                + "(210, 8),"
                                + "(211, 8),"
                                + "(212, 8),"
                                + "(213, 8),"
                                + "(214, 8),"
                                + "(215, 8),"
                                + "(216, 8),"
                                + "(217, 8),"
                                + "(218, 8),"
                                + "(219, 8),"
                                + "(220, 8),"
                                + "(221, 8),"
                                + "(222, 8),"
                                + "(223, 8),"
                                + "(224, 8),"
                                + "(225, 8)");

                        // Insert Reseñas
                        statement.addBatch("INSERT IGNORE INTO reseñas (id, comentarios, valoracion, user_id) VALUES "
                                + "(201,'Excelente trabajo', 5,222),"
                                + "(202,'Muy bueno, aunque la carga sufrió problemas', 4,223),"
                                + "(203,'No volvería a contratar', 1,224),"
                                + "(204,'Horrible, no cumplió los plazos establecidos en ninguna de nuestras ofertas que le asignamos', 1,225),"
                                + "(205,'Mal', 2,225),"
                                + "(206,'Bien', 4,226)");

                        // Insert Ofertas
                        statement.addBatch(
                        "INSERT IGNORE INTO ofertas (id, titulo, experiencia, licencia, notas, estado, fecha_publicacion, sueldo, camionero_id, empresa_id, localizacion, prioridad) VALUES "
                                + "(201, 'Conductor de Carga Pesada', 5, 'C', 'Se requiere experiencia en cargas pesadas', 'PENDIENTE', '2025-03-05 08:00', 2500.00, NULL, 201, 'Sevilla', 'URGENTE'),"
                                + "(202, 'Transportista Nacional', 3, 'C', 'Viajes a nivel nacional', 'PENDIENTE', '2025-03-03 10:45', 3200.00, NULL, 202, 'Barcelona', 'FUTURO'),"
                                + "(203, 'Carga de Sevilla a Madrid', 2, 'C', 'Transportar 1200 kg de electrodomesticos de Sevilla a Madrid', 'PENDIENTE', '2025-03-02 20:30', 2500.00, NULL, 203, 'Sevilla', 'PRONTO'),"
                                + "(204, 'Carga de Sevilla a Murcia', 0, 'C', 'Transportar 500 kg de ropa de Sevilla a Murcia', 'PENDIENTE', '2025-03-02 09:30', 2500.00, NULL, 204, 'Sevilla', 'FUTURO'),"
                                + "(205, 'Conductor Nocturna', 4, 'C', 'Buscamos trabajador para mover cargas en horario nocturno', 'PENDIENTE', '2025-01-05 08:00', 2500.00, NULL, 205, 'Valencia', 'URGENTE'),"
                                + "(206, 'Transportista en Valencia', 3, 'C', 'Viajes limitados a la comunidad valenciana', 'PENDIENTE', '2025-03-03 10:45', 3200.00, NULL, 206, 'Valencia', 'PRONTO'),"
                                + "(207, 'Carga de Barcelona a Sevilla', 2, 'C', 'Transportar 10 t de alimentos de Barcelona a Sevilla', 'PENDIENTE', '2025-07-02 09:30', 5000.00, NULL, 207, 'Barcelona', 'URGENTE'),"
                                + "(208, 'Carga de Barcelona a Madrid', 2, 'C', 'Transportar 500 kg de ropa de Sevilla a Murcia', 'PENDIENTE', '2025-01-02 09:30', 2500.00, NULL, 208, 'Barcelona', 'FUTURO'),"
                                + "(209, 'Conductor de Multiples cargas', 5, 'C', 'Se requiere experiencia, tanto para cargas pesadas como frágiles', 'PENDIENTE', '2025-02-10 08:00', 2500.00, NULL, 209, 'Sevilla', 'URGENTE'),"
                                + "(210, 'Transportista en Andalucía', 3, 'C', 'Viajes limitados a la comunidad andaluza', 'PENDIENTE', '2025-03-03 10:45', 3200.00, NULL, 210, 'Sevilla', 'PRONTO'),"
                                + "(211, 'Carga de Valencia a Vigo', 2, 'C', 'Transportar 3.5 t de pescado de Valencia a Vigo', 'PENDIENTE', '2025-03-02 09:30', 2500.00, NULL, 211, 'Valencia', 'URGENTE'),"
                                + "(212, 'Carga de Sevilla a Alicante', 2, 'C', 'Transportar 300 kg de paquetes de Sevilla a Murcia', 'PENDIENTE', '2025-03-02 18:00', 2500.00, NULL, 212, 'Sevilla', 'FUTURO'),"
                                + "(213, 'Transportista Nacional', 1, 'C', 'Viajes a nivel nacional', 'PENDIENTE', '2025-03-03 10:45', 3200.00, NULL, 213, 'Barcelona', 'FUTURO'),"
                                + "(214, 'Carga de Sevilla a Madrid', 2, 'C', 'Transportar 1200 kg de electrodomesticos de Sevilla a Madrid', 'PENDIENTE', '2025-03-02 20:30', 2500.00, NULL, 214, 'Sevilla', 'PRONTO'),"
                                + "(215, 'Carga de Sevilla a Murcia', 0, 'C', 'Transportar 500 kg de ropa de Sevilla a Murcia', 'PENDIENTE', '2025-03-02 09:30', 2500.00, NULL, 215, 'Sevilla', 'FUTURO'),"
                                + "(216, 'Conductor Nocturna', 4, 'C', 'Buscamos trabajador para mover cargas en horario nocturno', 'PENDIENTE', '2025-01-05 08:00', 2500.00, NULL, 216, 'Valencia', 'URGENTE'),"
                                + "(217, 'Transportista en Valencia', 3, 'C', 'Viajes limitados a la comunidad valenciana', 'PENDIENTE', '2025-03-03 10:45', 3200.00, NULL, 217, 'Valencia', 'PRONTO'),"
                                + "(218, 'Transportista en Huelva', 3, 'C', 'Viajes limitados a la comunidad andaluza', 'PENDIENTE', '2025-03-03 10:45', 3200.00, NULL, 218, 'Huelva', 'PRONTO'),"
                                + "(219, 'Carga de Cáceres a Sevilla', 2, 'C', 'Transportar 300 kg de paquetes de Cáceres a Sevilla', 'PENDIENTE', '2025-03-02 18:00', 2500.00, NULL, 219, 'Cáceres', 'FUTURO'),"
                                + "(220, 'Transportista en Cáceres', 3, 'C_E', 'Viajes limitados a la comunidad extremeña', 'PENDIENTE', '2025-03-03 10:45', 3200.00, NULL, 220, 'Cáceres', 'PRONTO'),"
                                + "(221, 'Transportista en Cataluña', 3, 'C_E', 'Viajes limitados a la comunidad catalana', 'PENDIENTE', '2025-03-03 10:45', 3200.00, NULL, 221, 'Barcelona', 'PRONTO')");

                        // Insert Trabajos
                        statement.addBatch("INSERT IGNORE INTO trabajos (id, fecha_incorporacion, jornada, oferta_id) VALUES "
                                + "(201,'2025-03-10', 'REGULAR', 201),"
                                + "(202,'2025-03-10', 'FLEXIBLE', 202),"
                                + "(203,'2025-02-15', 'COMPLETA', 205),"
                                + "(204,'2025-03-10', 'NOCTURNA', 206),"
                                + "(205,'2025-03-12', 'MIXTA', 209),"
                                + "(206,'2025-03-10', 'REGULAR', 213),"
                                + "(207,'2025-03-10', 'RELEVOS', 210),"
                                + "(208,'2025-03-10', 'FLEXIBLE', 216),"
                                + "(209,'2025-02-15', 'COMPLETA', 217),"
                                + "(210,'2025-03-15', 'FLEXIBLE', 218),"
                                + "(211,'2025-03-15', 'MIXTA', 220),"
                                + "(212,'2025-03-15', 'FLEXIBLE', 221)");

                        // Insert Cargas
                        statement.addBatch("INSERT IGNORE INTO cargas (id, mercancia, peso, origen, destino, distancia, inicio, fin_minimo, fin_maximo, oferta_id) VALUES "
                                + "(201, 'Electrodomésticos', 1200.50, 'Sevilla', 'Madrid', 530, '2025-03-10 09:30', '2025-03-11 08:00', '2025-03-12 09:30', 203),"
                                + "(202, 'Ropa', 500.00, 'Sevilla', 'Murcia', 520, '2025-03-10 09:30', '2025-03-11 09:30', '2025-03-12 09:30', 204),"
                                + "(203, 'Alimentos', 10000.00 , 'Barcelona', 'Sevilla', 830, '2025-07-10 09:30', '2025-07-13 08:00', '2025-07-17 09:30', 207),"
                                + "(204, 'Muebles', 2000.00, 'Barcelona', 'Madrid', 620, '2025-03-10 09:30', '2025-03-11 09:30', '2025-03-12 09:30', 208),"
                                + "(205, 'Pescado', 3500.50, 'Valencia', 'Vigo', 955, '2025-03-10 09:30', '2025-03-13 08:00', '2025-05-17 09:30', 211),"
                                + "(206, 'Conjunto de paquete pequeños', 300.00, 'Sevilla', 'Alicante', 595, '2025-03-10 09:30', '2025-03-11 09:30', '2025-03-12 09:30', 212),"
                                + "(207, 'Electrodomésticos', 1200.50, 'Sevilla', 'Madrid', 530, '2025-03-10 09:30', '2025-03-11 08:00', '2025-03-12 09:30', 214),"
                                + "(208, 'Ropa', 500.00, 'Sevilla', 'Murcia', 520, '2025-03-10 09:30', '2025-03-11 09:30', '2025-03-12 09:30', 215),"
                                + "(209, 'Conjunto de paquete pequeños', 300.00, 'Cáceres', 'Sevilla', 595, '2025-03-10 09:30', '2025-03-11 09:30', '2025-03-12 09:30', 219)");

                        // Insert aplicados
                        statement.addBatch("INSERT IGNORE INTO aplicados (oferta_id, camionero_id) VALUES "
                                + "(201, 223),"
                                + "(201, 224),"
                                + "(202, 223),"
                                + "(202, 224),"
                                + "(203, 223),"
                                + "(203, 224),"
                                + "(204, 223),"
                                + "(204, 224),"
                                + "(205, 223),"
                                + "(205, 224),"
                                + "(206, 223),"
                                + "(206, 224),"
                                + "(207, 223),"
                                + "(207, 224),"
                                + "(208, 223),"
                                + "(208, 224),"
                                + "(209, 223),"
                                + "(209, 224),"
                                + "(210, 223),"
                                + "(210, 224),"
                                + "(211, 223),"
                                + "(211, 224),"
                                + "(212, 223),"
                                + "(212, 224),"
                                + "(213, 223),"
                                + "(213, 224),"
                                + "(214, 223),"
                                + "(214, 224),"
                                + "(215, 223),"
                                + "(215, 224),"
                                + "(216, 223),"
                                + "(216, 224),"
                                + "(217, 223),"
                                + "(217, 224),"
                                + "(218, 223),"
                                + "(218, 224),"
                                + "(219, 223),"
                                + "(219, 224),"
                                + "(220, 223),"
                                + "(220, 224),"
                                + "(221, 223),"
                                + "(221, 224)");

                        // Execute batch
                        statement.executeBatch();
                        System.out.println("Batch execution completed successfully.");

                }
        }
}
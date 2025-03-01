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
            statement.executeUpdate("INSERT IGNORE INTO authorities (id, authority) VALUES (1, 'CAMIONERO')");
            statement.executeUpdate("INSERT IGNORE INTO authorities (id, authority) VALUES (2, 'EMPRESA')");
        }
    }
}
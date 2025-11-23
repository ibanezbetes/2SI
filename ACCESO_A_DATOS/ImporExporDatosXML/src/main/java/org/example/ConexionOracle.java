package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class ConexionOracle {
    private static final String URL = "jdbc:oracle:thin:@localhost:1521";
    private static final String USER = "DIBANEZB";
    private static final String PASSWORD = "LUCASLUCAS";

    public static Connection getConnection() {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (SQLException e) {
            System.err.println("Error al conectar con la base de datos Oracle: " + e.getMessage());
        }
        return connection;
    }
}
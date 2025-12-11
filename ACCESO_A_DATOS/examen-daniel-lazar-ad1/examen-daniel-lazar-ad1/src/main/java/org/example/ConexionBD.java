package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionBD {

    private static final String URL = "jdbc:oracle:thin:@localhost:1521:XE";
    private static final String USER = "DANI";
    private static final String PASS = "DANI";

    public static Connection obtenerConexion() {
        Connection con = null;
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");

            con = DriverManager.getConnection(URL, USER, PASS);
        } catch (ClassNotFoundException e) {
            System.err.println("Error: No se encontró el Driver de Oracle.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("Error al conectar con la BD: " + e.getMessage());
            e.printStackTrace();
        }
        return con;
    }
}
package org.example;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class VentaDAO {

    public void visualizarTodas() {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConexionOracle.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery("SELECT * FROM VENTAS");

            System.out.println("LISTA DE VENTAS");
            while (rs.next()) {
                System.out.println("Venta: " + rs.getString(1) + " | Fecha: " + rs.getString(2));
            }
            System.out.println(" ");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try { if (conn != null) conn.close(); } catch (Exception e) {}
        }
    }
}
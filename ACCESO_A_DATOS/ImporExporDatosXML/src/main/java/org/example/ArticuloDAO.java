package org.example;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class ArticuloDAO {

    public void visualizarTodos() {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            conn = ConexionOracle.getConnection();
            stmt = conn.createStatement();

            String sql = "SELECT * FROM ARTICULOS";
            rs = stmt.executeQuery(sql);

            System.out.println("LISTA DE ARTÍCULOS");

            while (rs.next()) {
                int id = rs.getInt(1);
                String nombre = rs.getString(2);
                double precio = rs.getDouble(3);

                System.out.println("ID: " + id + " | Nombre: " + nombre + " | Precio: " + precio);
            }
            System.out.println(" ");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try { if (rs != null) rs.close(); } catch (Exception e) {}
            try { if (stmt != null) stmt.close(); } catch (Exception e) {}
            try { if (conn != null) conn.close(); } catch (Exception e) {}
        }
    }
}
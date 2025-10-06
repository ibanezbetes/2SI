package org.example;

import java.sql.*;

public class TestOracle {
    public static void main(String[] args) {
        try {
            Class.forName("oracle.jdbc.OracleDriver");
            try (Connection cn = DriverManager.getConnection(
                    "jdbc:oracle:thin:@localhost:1521/XEPDB1", // o /XE si 11g
                    "LOLO", "LOLO");
                 Statement st = cn.createStatement();
                 ResultSet rs = st.executeQuery("SELECT 1 FROM DUAL")) {
                System.out.println("¡Conexión OK!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

package org.example;

import org.example.db.OracleConnectionFactory;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class TestOracle {
    public static void main(String[] args) {
        try (Connection cn = OracleConnectionFactory.getConnection();
             Statement st = cn.createStatement();
             ResultSet rs = st.executeQuery("SELECT 1 FROM DUAL")) {
            System.out.println("¡Conexión OK!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

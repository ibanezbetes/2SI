package org.example.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public final class OracleConnectionFactory {
    // Lee variables/props si existen; si no, por defecto usa 11g XE (SID=XE)
    private static final String URL_PROP = System.getProperty("ORACLE_URL",
            System.getenv().getOrDefault("ORACLE_URL", "jdbc:oracle:thin:@localhost:1521:XE"));
    private static final String USER = System.getProperty("ORACLE_USER",
            System.getenv().getOrDefault("ORACLE_USER", "LOLO"));
    private static final String PASS = System.getProperty("ORACLE_PASS",
            System.getenv().getOrDefault("ORACLE_PASS", "LOLO"));

    static {
        try {
            Class.forName("oracle.jdbc.OracleDriver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("No se pudo cargar el driver de Oracle (ojdbc). Añádelo al classpath.", e);
        }
    }

    private OracleConnectionFactory() {}

    public static Connection getConnection() throws SQLException {
        // 1) Intenta con la URL indicada (o por defecto :XE)
        try {
            return DriverManager.getConnection(URL_PROP, USER, PASS);
        } catch (SQLException ex) {
            // 2) Si falla por servicio no registrado o adaptador, intenta el otro formato (PDB)
            final String msg = ex.getMessage();
            boolean esFalloDeServicio = msg != null && (
                    msg.contains("ORA-12514") || msg.contains("ORA-12505") || msg.contains("service")
            );

            if (esFalloDeServicio) {
                // si la actual es :XE, prueba /XEPDB1; si era /XEPDB1, prueba :XE
                String altUrl = URL_PROP.contains(":XE")
                        ? "jdbc:oracle:thin:@//localhost:1521/XEPDB1"
                        : "jdbc:oracle:thin:@localhost:1521:XE";
                return DriverManager.getConnection(altUrl, USER, PASS);
            }
            throw ex;
        }
    }
}

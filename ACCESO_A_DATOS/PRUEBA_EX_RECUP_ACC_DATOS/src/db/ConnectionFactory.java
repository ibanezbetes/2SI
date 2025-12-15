package db;
import java.sql.*;

public class ConnectionFactory {
    static {
        try { 
            // Cargar Driver Oracle
            Class.forName("oracle.jdbc.OracleDriver"); 
        } catch (ClassNotFoundException e) { 
            e.printStackTrace(); 
        }
    }
    
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DbConfig.URL, DbConfig.USER, DbConfig.PASS);
    }
}

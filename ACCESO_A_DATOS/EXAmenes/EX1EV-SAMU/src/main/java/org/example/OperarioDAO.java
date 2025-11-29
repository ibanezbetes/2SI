package org.example;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class OperarioDAO {

    // Configuración Oracle
    private static final String URL = "jdbc:oracle:thin:@localhost:1521:XE";
    private static final String USER = "LOLO";
    private static final String PASS = "LOLO";

    private Connection conectar() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASS);
    }

    // 1. LISTAR TODOS
    public List<Operario> obtenerTodos() {
        List<Operario> lista = new ArrayList<>();
        String sql = "SELECT id, dni, nombre, especialidad FROM operario";

        try (Connection con = conectar();
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                lista.add(new Operario(
                        rs.getString("id"),
                        rs.getString("dni"),
                        rs.getString("nombre"),
                        rs.getString("especialidad")
                ));
            }
        } catch (SQLException e) {
            System.err.println("Error de BD: " + e.getMessage());
            e.printStackTrace();
        }
        return lista;
    }

    // 2. REGISTRAR TRAZABILIDAD
    public void registrarPaso(String idEnvio, String idOp, String fase) {
        String sql = "INSERT INTO trazabilidad (id, id_envio, id_operario, fase, fecha_hora) VALUES (?, ?, ?, ?, SYSDATE)";

        try (Connection con = conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {

            // CORRECCIÓN: Cambiado de 8 a 5 para cumplir con CHAR(5)
            ps.setString(1, UUID.randomUUID().toString().substring(0, 5));
            ps.setString(2, idEnvio);
            ps.setString(3, idOp);
            ps.setString(4, fase);

            ps.executeUpdate();
            System.out.println(">> Trazabilidad guardada: " + fase);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 3. GEOLOCALIZAR
    public void actualizarGPS(String idEnvio, double lat, double lon) {
        String sqlUpdate = "UPDATE envio SET latitud = ?, longitud = ? WHERE id = ?";
        String sqlHist = "INSERT INTO historial_ubicacion (id, id_envio, latitud, longitud) VALUES (?, ?, ?, ?)";

        try (Connection con = conectar()) {
            con.setAutoCommit(false);

            try (PreparedStatement psUp = con.prepareStatement(sqlUpdate);
                 PreparedStatement psHist = con.prepareStatement(sqlHist)) {

                // Update Envio
                psUp.setDouble(1, lat);
                psUp.setDouble(2, lon);
                psUp.setString(3, idEnvio);
                psUp.executeUpdate();

                // Insert Historial
                // CORRECCIÓN: Cambiado de 8 a 5 para cumplir con CHAR(5)
                psHist.setString(1, UUID.randomUUID().toString().substring(0, 5));
                psHist.setString(2, idEnvio);
                psHist.setDouble(3, lat);
                psHist.setDouble(4, lon);
                psHist.executeUpdate();

                con.commit();
                System.out.println(">> GPS Actualizado para envío " + idEnvio);

            } catch (SQLException e) {
                con.rollback();
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
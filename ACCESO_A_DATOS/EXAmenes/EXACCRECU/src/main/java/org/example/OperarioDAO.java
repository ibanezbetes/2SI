package org.example;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OperarioDAO {
    private Connection conexion;

    public OperarioDAO(Connection conexion) {
        this.conexion = conexion;
    }

    // Insertar en BD
    public void insertarOperario(Operario op) throws SQLException {
        String sql = "INSERT INTO operario (id, dni, nombre, latitud, longitud) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = conexion.prepareStatement(sql)) {
            stmt.setString(1, op.getId());
            stmt.setString(2, op.getDni());
            stmt.setString(3, op.getNombre());
            stmt.setDouble(4, op.getLatitud());
            stmt.setDouble(5, op.getLongitud());
            stmt.executeUpdate();
        }
    }

    // Registrar trazabilidad
    public void registrarIntervencion(String id, String idExp, String idOp, String accion, String obs) throws SQLException {
        String sql = "INSERT INTO intervencion (id, id_expedicion, id_operario, accion, observaciones, fecha_hora) VALUES (?, ?, ?, ?, ?, SYSDATE)";
        try (PreparedStatement stmt = conexion.prepareStatement(sql)) {
            stmt.setString(1, id);
            stmt.setString(2, idExp);
            stmt.setString(3, idOp);
            stmt.setString(4, accion);
            stmt.setString(5, obs);
            stmt.executeUpdate();
        }
    }

    // Listar para exportar
    public List<Operario> listarOperarios() throws SQLException {
        List<Operario> lista = new ArrayList<>();
        String sql = "SELECT id, dni, nombre, latitud, longitud FROM operario";
        try (Statement stmt = conexion.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                lista.add(new Operario(
                        rs.getString("id"),
                        rs.getString("dni"),
                        rs.getString("nombre"),
                        rs.getDouble("latitud"),
                        rs.getDouble("longitud")
                ));
            }
        }
        return lista;
    }
}
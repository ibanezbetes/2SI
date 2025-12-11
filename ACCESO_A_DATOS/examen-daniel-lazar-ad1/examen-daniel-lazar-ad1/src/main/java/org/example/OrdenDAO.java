package org.example;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrdenDAO {

    public List<Orden> obtenerTodos() {
        List<Orden> lista = new ArrayList<>();
        String sql = "SELECT id_orden, codigo_orden, TO_CHAR(fecha_generacion, 'YYYY-MM-DD HH24:MI:SS') as fecha_gen, " +
                "estado, prioridad, id_pedido, id_responsable, transporte_compania, transporte_coste, " +
                "transporte_tracking, TO_CHAR(fecha_salida, 'YYYY-MM-DD HH24:MI:SS') as fecha_sal FROM ordenes_trabajo";

        try (Connection con = ConexionBD.obtenerConexion();
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                lista.add(new Orden(
                        rs.getInt("id_orden"),
                        rs.getString("codigo_orden"),
                        rs.getString("fecha_gen"),
                        rs.getString("estado"),
                        rs.getString("prioridad"),
                        rs.getInt("id_pedido"),
                        rs.getInt("id_responsable"),
                        rs.getString("transporte_compania"),
                        rs.getDouble("transporte_coste"),
                        rs.getString("transporte_tracking"),
                        rs.getString("fecha_sal")
                ));
            }
        } catch (SQLException e) {
            System.err.println("Error en DAO (Listar): " + e.getMessage());
        }
        return lista;
    }

    public boolean insertarOrden(Orden orden) {
        String sql = "INSERT INTO ordenes_trabajo (id_orden, codigo_orden, estado, prioridad, id_pedido, id_responsable, fecha_generacion) " +
                "VALUES (?, ?, ?, ?, ?, ?, SYSDATE)";

        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, orden.getId_orden());
            ps.setString(2, orden.getCodigo_orden());
            ps.setString(3, "pendiente");
            ps.setString(4, orden.getPrioridad());
            ps.setInt(5, orden.getId_pedido());
            ps.setInt(6, orden.getId_responsable());

            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.err.println("Error en DAO (Insertar): " + e.getMessage());
            return false;
        }
    }

    public boolean asignarTransporte(int idOrden, String compania, double coste, String tracking) {
        String sql = "UPDATE ordenes_trabajo SET transporte_compania=?, transporte_coste=?, transporte_tracking=?, " +
                "estado='enviada', fecha_salida=SYSDATE WHERE id_orden=?";

        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, compania);
            ps.setDouble(2, coste);
            ps.setString(3, tracking);
            ps.setInt(4, idOrden);

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error en DAO (Actualizar): " + e.getMessage());
            return false;
        }
    }
}
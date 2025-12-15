import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import db.ConnectionFactory;

public class OrdenTrabajoDAO {

    public int crearOrden(OrdenTrabajo ot) throws SQLException {
        String sqlId = "SELECT NVL(MAX(ID_ORDEN),0)+1 FROM ORDEN_TRABAJO";
        String sql = "INSERT INTO ORDEN_TRABAJO (" +
                "ID_ORDEN, ID_TICKET_VENTA, FECHA_GENERACION, " +
                "ID_ESTADO, ID_PRIORIDAD, ID_EMPLEADO_RESPONSABLE, ID_DIRECCION_ENTREGA" +
                ") VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection cn = ConnectionFactory.getConnection()) {
            int newId;
            try (Statement st = cn.createStatement(); ResultSet rs = st.executeQuery(sqlId)) {
                rs.next();
                newId = rs.getInt(1);
            }
            try (PreparedStatement ps = cn.prepareStatement(sql)) {
                ps.setInt(1, newId);
                ps.setInt(2, ot.getIdTicketVenta());
                ps.setTimestamp(3, Timestamp.valueOf(ot.getFechaGeneracion()));
                ps.setString(4, ot.getIdEstado());
                ps.setString(5, ot.getIdPrioridad());
                ps.setInt(6, ot.getIdEmpleadoResponsable());
                ps.setInt(7, ot.getIdDireccionEntrega());
                ps.executeUpdate();
            }
            return newId;
        }
    }

    public List<OrdenTrabajo> findAll() throws SQLException {
        String sql = "SELECT * FROM ORDEN_TRABAJO ORDER BY ID_ORDEN DESC";
        List<OrdenTrabajo> lista = new ArrayList<>();
        try (Connection cn = ConnectionFactory.getConnection();
             Statement st = cn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                lista.add(mapOrden(rs));
            }
        }
        return lista;
    }

    public OrdenTrabajo findById(int idOrden) throws SQLException {
        String sql = "SELECT * FROM ORDEN_TRABAJO WHERE ID_ORDEN = ?";
        try (Connection cn = ConnectionFactory.getConnection();
             PreparedStatement ps = cn.prepareStatement(sql)) {
            ps.setInt(1, idOrden);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapOrden(rs);
                }
            }
        }
        return null;
    }

    public void actualizarEstadoYEnvio(OrdenTrabajo ot) throws SQLException {
        String sql = "UPDATE ORDEN_TRABAJO SET " +
                "ID_ESTADO = ?, " +
                "ID_TRANSPORTE = ?, " +
                "COSTE_ENVIO = ?, " +
                "CODIGO_SEGUIMIENTO = ?, " +
                "FECHA_SALIDA = ? " +
                "WHERE ID_ORDEN = ?";

        try (Connection cn = ConnectionFactory.getConnection();
             PreparedStatement ps = cn.prepareStatement(sql)) {
            ps.setString(1, ot.getIdEstado());
            if (ot.getIdTransporte() != null) ps.setInt(2, ot.getIdTransporte());
            else ps.setNull(2, Types.INTEGER);

            ps.setBigDecimal(3, ot.getCosteEnvio());
            ps.setString(4, ot.getCodigoSeguimiento());

            if (ot.getFechaSalida() != null) ps.setTimestamp(5, Timestamp.valueOf(ot.getFechaSalida()));
            else ps.setNull(5, Types.TIMESTAMP);

            ps.setInt(6, ot.getIdOrden());
            ps.executeUpdate();
        }
    }

    public int registrarIncidencia(Incidencia inc) throws SQLException {
        String sqlId = "SELECT NVL(MAX(ID_INCIDENCIA),0)+1 FROM INCIDENCIA";
        String sql = "INSERT INTO INCIDENCIA (" +
                "ID_INCIDENCIA, ID_ORDEN, FECHA, ID_TIPO_INCIDENCIA, " +
                "DESCRIPCION, ID_PRODUCTO, ID_EMPLEADO_REPORTA, ESTADO" +
                ") VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection cn = ConnectionFactory.getConnection()) {
            int newId;
            try (Statement st = cn.createStatement(); ResultSet rs = st.executeQuery(sqlId)) {
                rs.next();
                newId = rs.getInt(1);
            }
            try (PreparedStatement ps = cn.prepareStatement(sql)) {
                ps.setInt(1, newId);
                ps.setInt(2, inc.getIdOrden());
                ps.setTimestamp(3, Timestamp.valueOf(inc.getFecha()));
                ps.setString(4, inc.getIdTipoIncidencia());
                ps.setString(5, inc.getDescripcion());
                if (inc.getIdProducto() != null) ps.setInt(6, inc.getIdProducto());
                else ps.setNull(6, Types.INTEGER);
                ps.setInt(7, inc.getIdEmpleadoReporta());
                ps.setString(8, inc.getEstado());
                ps.executeUpdate();
            }
            return newId;
        }
    }

    public List<Incidencia> findIncidenciasByOrden(int idOrden) throws SQLException {
        String sql = "SELECT * FROM INCIDENCIA WHERE ID_ORDEN = ? ORDER BY FECHA";
        List<Incidencia> lista = new ArrayList<>();
        try (Connection cn = ConnectionFactory.getConnection();
             PreparedStatement ps = cn.prepareStatement(sql)) {
            ps.setInt(1, idOrden);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Incidencia i = new Incidencia();
                    i.setIdIncidencia(rs.getInt("ID_INCIDENCIA"));
                    i.setIdOrden(rs.getInt("ID_ORDEN"));
                    i.setFecha(rs.getTimestamp("FECHA").toLocalDateTime());
                    i.setIdTipoIncidencia(rs.getString("ID_TIPO_INCIDENCIA"));
                    i.setDescripcion(rs.getString("DESCRIPCION"));
                    int idProd = rs.getInt("ID_PRODUCTO");
                    if (!rs.wasNull()) i.setIdProducto(idProd);
                    i.setIdEmpleadoReporta(rs.getInt("ID_EMPLEADO_REPORTA"));
                    i.setEstado(rs.getString("ESTADO"));
                    lista.add(i);
                }
            }
        }
        return lista;
    }

    private OrdenTrabajo mapOrden(ResultSet rs) throws SQLException {
        OrdenTrabajo ot = new OrdenTrabajo();
        ot.setIdOrden(rs.getInt("ID_ORDEN"));
        ot.setIdTicketVenta(rs.getInt("ID_TICKET_VENTA"));
        Timestamp tsGen = rs.getTimestamp("FECHA_GENERACION");
        if (tsGen != null) ot.setFechaGeneracion(tsGen.toLocalDateTime());
        ot.setIdEstado(rs.getString("ID_ESTADO"));
        ot.setIdPrioridad(rs.getString("ID_PRIORIDAD"));
        ot.setIdEmpleadoResponsable(rs.getInt("ID_EMPLEADO_RESPONSABLE"));
        ot.setIdDireccionEntrega(rs.getInt("ID_DIRECCION_ENTREGA"));
        int idTrans = rs.getInt("ID_TRANSPORTE");
        if (!rs.wasNull()) ot.setIdTransporte(idTrans);
        ot.setCosteEnvio(rs.getBigDecimal("COSTE_ENVIO"));
        ot.setCodigoSeguimiento(rs.getString("CODIGO_SEGUIMIENTO"));
        Timestamp tsSal = rs.getTimestamp("FECHA_SALIDA");
        if (tsSal != null) ot.setFechaSalida(tsSal.toLocalDateTime());
        return ot;
    }
}
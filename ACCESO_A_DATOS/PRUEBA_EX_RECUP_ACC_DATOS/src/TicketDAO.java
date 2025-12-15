import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import db.ConnectionFactory;

public class TicketDAO {
    // Uso Strings con + para compatibilidad Java 11
    private static final String BASE_SQL =
            "SELECT t.ID_TICKET_VENTA, t.FECHA, t.PAGO, NVL(SUM(l.IMPORTE), 0) AS TOTAL " +
                    "FROM TICKET_VENTA t " +
                    "LEFT JOIN LINEA_TICKET l ON l.ID_TICKET_VENTA = t.ID_TICKET_VENTA " +
                    "%s " +
                    "GROUP BY t.ID_TICKET_VENTA, t.FECHA, t.PAGO " +
                    "ORDER BY t.FECHA DESC";

    public List<TicketResumen> findAllResumen() throws SQLException {
        String sql = String.format(BASE_SQL, "");
        try (Connection cn = ConnectionFactory.getConnection();
             Statement st = cn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            return map(rs);
        }
    }

    public List<TicketResumen> findResumenBetween(LocalDate desde, LocalDate hasta) throws SQLException {
        String where = "WHERE t.FECHA BETWEEN ? AND ?";
        String sql = String.format(BASE_SQL, where);
        try (Connection cn = ConnectionFactory.getConnection();
             PreparedStatement ps = cn.prepareStatement(sql)) {
            ps.setDate(1, Date.valueOf(desde));
            ps.setDate(2, Date.valueOf(hasta));
            try (ResultSet rs = ps.executeQuery()) {
                return map(rs);
            }
        }
    }

    private List<TicketResumen> map(ResultSet rs) throws SQLException {
        List<TicketResumen> lista = new ArrayList<>();
        while (rs.next()) {
            TicketResumen tr = new TicketResumen();
            tr.setIdTicket(rs.getInt("ID_TICKET_VENTA"));
            Date d = rs.getDate("FECHA");
            tr.setFecha(d != null ? d.toLocalDate() : null);
            tr.setPago(rs.getString("PAGO"));
            BigDecimal total = rs.getBigDecimal("TOTAL");
            tr.setTotal(total != null ? total : BigDecimal.ZERO);
            lista.add(tr);
        }
        return lista;
    }
}


package org.example.dao;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.example.db.OracleConnectionFactory;
import org.example.model.TicketResumen;

public class TicketDao {

    private static TicketResumen mapRow(ResultSet rs) throws SQLException {
        long id = rs.getLong("ID_TICKET");
        Date fecha = rs.getDate("FECHA");
        String forma = rs.getString("FORMA_PAGO");
        BigDecimal total = rs.getBigDecimal("TOTAL");
        return new TicketResumen(id, fecha.toLocalDate(), forma, total);
    }

    public List<TicketResumen> findAllResumen() throws SQLException {
        String sql =
                "SELECT t.ID_TICKET, t.FECHA, t.FORMA_PAGO, " +
                "NVL(SUM(dt.IMPORTE), 0) AS TOTAL " +
                "FROM TICKET_CAJA t " +
                "LEFT JOIN DETALLE_TICKET dt ON dt.ID_TICKET = t.ID_TICKET " +
                "GROUP BY t.ID_TICKET, t.FECHA, t.FORMA_PAGO " +
                "ORDER BY t.ID_TICKET";
        try (Connection cn = OracleConnectionFactory.getConnection();
             PreparedStatement ps = cn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<TicketResumen> out = new ArrayList<>();
            while (rs.next()) out.add(mapRow(rs));
            return out;
        }
    }

    public List<TicketResumen> findResumenByPeriodo(LocalDate desde, LocalDate hasta) throws SQLException {
        String sql =
                "SELECT t.ID_TICKET, t.FECHA, t.FORMA_PAGO, " +
                "NVL(SUM(dt.IMPORTE), 0) AS TOTAL " +
                "FROM TICKET_CAJA t " +
                "LEFT JOIN DETALLE_TICKET dt ON dt.ID_TICKET = t.ID_TICKET " +
                "WHERE t.FECHA BETWEEN ? AND ? " +
                "GROUP BY t.ID_TICKET, t.FECHA, t.FORMA_PAGO " +
                "ORDER BY t.ID_TICKET";
        try (Connection cn = OracleConnectionFactory.getConnection();
             PreparedStatement ps = cn.prepareStatement(sql)) {
            ps.setDate(1, Date.valueOf(desde));
            ps.setDate(2, Date.valueOf(hasta));
            try (ResultSet rs = ps.executeQuery()) {
                List<TicketResumen> out = new ArrayList<>();
                while (rs.next()) out.add(mapRow(rs));
                return out;
            }
        }
    }
}

package org.example.dao;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.example.db.OracleConnectionFactory;
import org.example.model.Articulo;

public class ArticuloDao {

    public List<Articulo> findAll() throws SQLException {
        String sql = "SELECT ID_ARTICULO, NOMBRE, DETALLE, COD_REFERENCIA, CANTIDAD_DISP, PRECIO_UNIT FROM ARTICULO ORDER BY ID_ARTICULO";
        try (Connection cn = OracleConnectionFactory.getConnection();
             PreparedStatement ps = cn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            List<Articulo> out = new ArrayList<>();
            while (rs.next()) {
                Articulo a = new Articulo(
                        rs.getLong("ID_ARTICULO"),
                        rs.getString("NOMBRE"),
                        rs.getString("DETALLE"),
                        rs.getString("COD_REFERENCIA"),
                        rs.getInt("CANTIDAD_DISP"),
                        rs.getBigDecimal("PRECIO_UNIT")
                );
                out.add(a);
            }
            return out;
        }
    }

    public long nextId(Connection cn) throws SQLException {
        try (Statement st = cn.createStatement();
             ResultSet rs = st.executeQuery("SELECT NVL(MAX(ID_ARTICULO), 1000) + 1 AS NEXT_ID FROM ARTICULO")) {
            rs.next();
            return rs.getLong(1);
        }
    }

    public Articulo insert(Articulo a) throws SQLException {
        String sql = "INSERT INTO ARTICULO (ID_ARTICULO, NOMBRE, DETALLE, COD_REFERENCIA, CANTIDAD_DISP, PRECIO_UNIT) VALUES (?,?,?,?,?,?)";
        try (Connection cn = OracleConnectionFactory.getConnection()) {
            if (a.getIdArticulo() == 0) {
                a.setIdArticulo(nextId(cn));
            }
            try (PreparedStatement ps = cn.prepareStatement(sql)) {
                ps.setLong(1, a.getIdArticulo());
                ps.setString(2, a.getNombre());
                ps.setString(3, a.getDetalle());
                ps.setString(4, a.getCodReferencia());
                ps.setInt(5, a.getCantidadDisp());
                ps.setBigDecimal(6, a.getPrecioUnit() != null ? a.getPrecioUnit() : BigDecimal.ZERO);
                ps.executeUpdate();
            }
        }
        return a;
    }
}

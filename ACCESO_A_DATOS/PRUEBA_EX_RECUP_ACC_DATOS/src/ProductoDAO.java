import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import db.ConnectionFactory;

public class ProductoDAO {

    public List<Producto> findAll() throws SQLException {
        String sql = "SELECT * FROM PRODUCTO ORDER BY ID_PRODUCTO";
        List<Producto> lista = new ArrayList<>();
        try (Connection cn = ConnectionFactory.getConnection();
             Statement st = cn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                Producto p = new Producto();
                p.setId(rs.getInt("ID_PRODUCTO"));
                p.setNombre(rs.getString("NOMBRE"));
                p.setDescripcion(rs.getString("DESCRIPCION"));
                p.setSku(rs.getString("SKU"));
                p.setStock(rs.getInt("STOCK"));
                p.setPvp(rs.getBigDecimal("PVP"));
                lista.add(p);
            }
        }
        return lista;
    }

    public int insert(Producto p) throws SQLException {
        String sqlId = "SELECT NVL(MAX(ID_PRODUCTO),0)+1 FROM PRODUCTO";
        String sql = "INSERT INTO PRODUCTO (ID_PRODUCTO, NOMBRE, DESCRIPCION, SKU, STOCK, PVP) VALUES (?,?,?,?,?,?)";
        try (Connection cn = ConnectionFactory.getConnection()) {
            int newId;
            try (Statement st = cn.createStatement(); ResultSet rs = st.executeQuery(sqlId)) {
                rs.next();
                newId = rs.getInt(1);
            }
            try (PreparedStatement ps = cn.prepareStatement(sql)) {
                ps.setInt(1, newId);
                ps.setString(2, p.getNombre());
                ps.setString(3, p.getDescripcion());
                ps.setString(4, p.getSku());
                ps.setInt(5, p.getStock());
                ps.setBigDecimal(6, p.getPvp());
                ps.executeUpdate();
            }
            return newId;
        }
    }
}
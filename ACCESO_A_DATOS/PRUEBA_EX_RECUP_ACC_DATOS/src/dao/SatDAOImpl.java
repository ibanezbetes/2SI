package dao;
import db.ConnectionFactory;
import model.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class SatDAOImpl implements SatDAO {

    @Override
    public int crearSolicitud(SolicitudSat s) throws SQLException {
        // Obtenemos ID manual (MAX + 1)
        String sqlId = "SELECT NVL(MAX(ID_SOLICITUD),0)+1 FROM SOLICITUD_SAT";
        String sql = "INSERT INTO SOLICITUD_SAT (ID_SOLICITUD, ID_CLIENTE, ID_PRODUCTO, ID_TECNICO, DESCRIPCION_PROBLEMA, PRIORIDAD, FECHA_SOLICITUD) VALUES (?,?,?,?,?,?,?)";
        
        try (Connection cn = ConnectionFactory.getConnection()) {
            int newId;
            // 1. Obtener ID
            try(Statement st = cn.createStatement(); ResultSet rs = st.executeQuery(sqlId)) {
                rs.next(); 
                newId = rs.getInt(1);
            }
            // 2. Insertar
            try(PreparedStatement ps = cn.prepareStatement(sql)) {
                ps.setInt(1, newId);
                ps.setInt(2, s.getIdCliente());
                ps.setInt(3, s.getIdProducto());
                ps.setInt(4, s.getIdTecnico());
                ps.setString(5, s.getDescripcion());
                ps.setString(6, s.getPrioridad());
                ps.setTimestamp(7, Timestamp.valueOf(s.getFechaSolicitud()));
                ps.executeUpdate();
            }
            return newId;
        }
    }

    @Override
    public int crearActuacion(ActuacionSat a) throws SQLException {
        String sqlId = "SELECT NVL(MAX(ID_ACTUACION),0)+1 FROM ACTUACION_SAT";
        String sql = "INSERT INTO ACTUACION_SAT (ID_ACTUACION, ID_SOLICITUD, DESCRIPCION, HORAS_TRABAJO, COSTE_MANO_OBRA) VALUES (?,?,?,?,?)";
        
        try (Connection cn = ConnectionFactory.getConnection()) {
            int newId;
            // 1. Obtener ID
            try(Statement st = cn.createStatement(); ResultSet rs = st.executeQuery(sqlId)) {
                rs.next(); 
                newId = rs.getInt(1);
            }
            // 2. Insertar Actuación
            try(PreparedStatement ps = cn.prepareStatement(sql)) {
                ps.setInt(1, newId);
                ps.setInt(2, a.getIdSolicitud());
                ps.setString(3, a.getDescripcion());
                ps.setDouble(4, a.getHoras());
                ps.setBigDecimal(5, a.getCosteManoObra());
                ps.executeUpdate();
            }
            // 3. Actualizar estado de la solicitud padre a "EN_PROCESO"
            String sqlUp = "UPDATE SOLICITUD_SAT SET ESTADO='EN_PROCESO' WHERE ID_SOLICITUD=?";
            try(PreparedStatement ps2 = cn.prepareStatement(sqlUp)){
                ps2.setInt(1, a.getIdSolicitud());
                ps2.executeUpdate();
            }
            return newId;
        }
    }

    @Override
    public int crearMaterial(MaterialSat m) throws SQLException {
        String sqlId = "SELECT NVL(MAX(ID_MATERIAL),0)+1 FROM MATERIAL_SAT";
        String sql = "INSERT INTO MATERIAL_SAT (ID_MATERIAL, ID_ACTUACION, NOMBRE_MATERIAL, CANTIDAD, PRECIO_UNIDAD) VALUES (?,?,?,?,?)";
        
        try (Connection cn = ConnectionFactory.getConnection()) {
            int newId;
            try(Statement st = cn.createStatement(); ResultSet rs = st.executeQuery(sqlId)) {
                rs.next(); 
                newId = rs.getInt(1);
            }
            try(PreparedStatement ps = cn.prepareStatement(sql)) {
                ps.setInt(1, newId);
                ps.setInt(2, m.getIdActuacion());
                ps.setString(3, m.getNombre());
                ps.setInt(4, m.getCantidad());
                ps.setBigDecimal(5, m.getPrecioUnidad());
                ps.executeUpdate();
            }
            return newId;
        }
    }

    @Override
    public void generarDocumentoFinal(int idSolicitud, String conclusiones) throws SQLException {
        // Inserta el documento y cierra la solicitud
        String sqlDoc = "INSERT INTO DOCUMENTO_SAT (ID_DOCUMENTO, ID_SOLICITUD, CONCLUSIONES) VALUES ((SELECT NVL(MAX(ID_DOCUMENTO),0)+1 FROM DOCUMENTO_SAT), ?, ?)";
        String sqlUp = "UPDATE SOLICITUD_SAT SET ESTADO='CERRADA', FECHA_RESOLUCION=SYSDATE WHERE ID_SOLICITUD=?";
        
        try (Connection cn = ConnectionFactory.getConnection()) {
            // Insertar Documento
            try(PreparedStatement ps = cn.prepareStatement(sqlDoc)) {
                ps.setInt(1, idSolicitud);
                ps.setString(2, conclusiones);
                ps.executeUpdate();
            }
            // Actualizar Estado
            try(PreparedStatement ps = cn.prepareStatement(sqlUp)) {
                ps.setInt(1, idSolicitud);
                ps.executeUpdate();
            }
        }
    }

    @Override
    public List<SolicitudSat> listarSolicitudesCompletas() throws SQLException {
        // Carga "ansiosa" (manual) para traer toda la jerarquía para el XML
        List<SolicitudSat> lista = new ArrayList<>();
        String sqlSol = "SELECT * FROM SOLICITUD_SAT ORDER BY ID_SOLICITUD DESC";
        
        try (Connection cn = ConnectionFactory.getConnection();
             Statement st = cn.createStatement();
             ResultSet rs = st.executeQuery(sqlSol)) {
            
            while(rs.next()) {
                SolicitudSat s = new SolicitudSat();
                s.setIdSolicitud(rs.getInt("ID_SOLICITUD"));
                s.setIdCliente(rs.getInt("ID_CLIENTE"));
                s.setIdProducto(rs.getInt("ID_PRODUCTO"));
                s.setIdTecnico(rs.getInt("ID_TECNICO"));
                s.setDescripcion(rs.getString("DESCRIPCION_PROBLEMA"));
                s.setEstado(rs.getString("ESTADO"));
                s.setPrioridad(rs.getString("PRIORIDAD"));
                
                Timestamp ts = rs.getTimestamp("FECHA_SOLICITUD");
                if(ts != null) s.setFechaSolicitud(ts.toLocalDateTime());
                
                // IMPORTANTE: Llamada para llenar la lista de hijos
                cargarActuaciones(cn, s);
                lista.add(s);
            }
        }
        return lista;
    }
    
    // Método auxiliar privado para cargar Actuaciones
    private void cargarActuaciones(Connection cn, SolicitudSat s) throws SQLException {
        String sql = "SELECT * FROM ACTUACION_SAT WHERE ID_SOLICITUD = ?";
        try(PreparedStatement ps = cn.prepareStatement(sql)){
            ps.setInt(1, s.getIdSolicitud());
            try(ResultSet rs = ps.executeQuery()){
                while(rs.next()){
                    ActuacionSat a = new ActuacionSat();
                    a.setIdActuacion(rs.getInt("ID_ACTUACION"));
                    a.setIdSolicitud(s.getIdSolicitud());
                    a.setDescripcion(rs.getString("DESCRIPCION"));
                    a.setHoras(rs.getDouble("HORAS_TRABAJO"));
                    a.setCosteManoObra(rs.getBigDecimal("COSTE_MANO_OBRA"));
                    
                    // IMPORTANTE: Llamada para llenar la lista de nietos (Materiales)
                    cargarMateriales(cn, a);
                    s.addActuacion(a);
                }
            }
        }
    }
    
    // Método auxiliar privado para cargar Materiales
    private void cargarMateriales(Connection cn, ActuacionSat a) throws SQLException {
        String sql = "SELECT * FROM MATERIAL_SAT WHERE ID_ACTUACION = ?";
        try(PreparedStatement ps = cn.prepareStatement(sql)){
            ps.setInt(1, a.getIdActuacion());
            try(ResultSet rs = ps.executeQuery()){
                while(rs.next()){
                    MaterialSat m = new MaterialSat();
                    m.setIdMaterial(rs.getInt("ID_MATERIAL"));
                    m.setIdActuacion(a.getIdActuacion());
                    m.setNombre(rs.getString("NOMBRE_MATERIAL"));
                    m.setCantidad(rs.getInt("CANTIDAD"));
                    m.setPrecioUnidad(rs.getBigDecimal("PRECIO_UNIDAD"));
                    a.addMaterial(m);
                }
            }
        }
    }
}
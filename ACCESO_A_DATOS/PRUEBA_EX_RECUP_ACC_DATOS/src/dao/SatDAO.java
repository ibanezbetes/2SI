package dao;
import model.*;
import java.sql.SQLException;
import java.util.List;

public interface SatDAO {
    // Operaciones principales
    int crearSolicitud(SolicitudSat sol) throws SQLException;
    int crearActuacion(ActuacionSat act) throws SQLException;
    int crearMaterial(MaterialSat mat) throws SQLException;
    void generarDocumentoFinal(int idSolicitud, String conclusiones) throws SQLException;
    
    // Operación compleja: Traer todo el árbol de datos (Solicitud -> Actuaciones -> Materiales)
    List<SolicitudSat> listarSolicitudesCompletas() throws SQLException;
}

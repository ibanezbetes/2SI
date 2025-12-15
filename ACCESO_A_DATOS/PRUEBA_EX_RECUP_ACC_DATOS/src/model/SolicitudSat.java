package model;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class SolicitudSat {
    // Atributos base
    private int idSolicitud;
    private int idCliente;
    private int idProducto;
    private int idTecnico;
    private String descripcion;
    private String estado;
    private String prioridad;
    private LocalDateTime fechaSolicitud;
    private LocalDateTime fechaResolucion;
    
    // LISTA IMPORTANTE: Para la jerarquía del XML (Solicitud contiene Actuaciones)
    private List<ActuacionSat> actuaciones = new ArrayList<>();

    public SolicitudSat() {}
    
    // Getters y Setters
    public int getIdSolicitud() { return idSolicitud; }
    public void setIdSolicitud(int id) { this.idSolicitud = id; }
    
    public int getIdCliente() { return idCliente; }
    public void setIdCliente(int id) { this.idCliente = id; }
    
    public int getIdProducto() { return idProducto; }
    public void setIdProducto(int id) { this.idProducto = id; }
    
    public int getIdTecnico() { return idTecnico; }
    public void setIdTecnico(int id) { this.idTecnico = id; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String d) { this.descripcion = d; }
    
    public String getEstado() { return estado; }
    public void setEstado(String e) { this.estado = e; }
    
    public String getPrioridad() { return prioridad; }
    public void setPrioridad(String p) { this.prioridad = p; }
    
    public LocalDateTime getFechaSolicitud() { return fechaSolicitud; }
    public void setFechaSolicitud(LocalDateTime f) { this.fechaSolicitud = f; }
    
    public LocalDateTime getFechaResolucion() { return fechaResolucion; }
    public void setFechaResolucion(LocalDateTime f) { this.fechaResolucion = f; }
    
    // Gestión de la lista
    public List<ActuacionSat> getActuaciones() { return actuaciones; }
    public void addActuacion(ActuacionSat a) { this.actuaciones.add(a); }
}

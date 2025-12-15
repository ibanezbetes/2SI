package model;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ActuacionSat {
    private int idActuacion;
    private int idSolicitud;
    private String descripcion;
    private double horas;
    private BigDecimal costeManoObra;
    
    // LISTA IMPORTANTE: Actuación contiene Materiales
    private List<MaterialSat> materiales = new ArrayList<>();

    public ActuacionSat() {}
    
    // Getters y Setters
    public int getIdActuacion() { return idActuacion; }
    public void setIdActuacion(int id) { this.idActuacion = id; }
    
    public int getIdSolicitud() { return idSolicitud; }
    public void setIdSolicitud(int id) { this.idSolicitud = id; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String d) { this.descripcion = d; }
    
    public double getHoras() { return horas; }
    public void setHoras(double h) { this.horas = h; }
    
    public BigDecimal getCosteManoObra() { return costeManoObra; }
    public void setCosteManoObra(BigDecimal c) { this.costeManoObra = c; }
    
    // Gestión de la lista
    public List<MaterialSat> getMateriales() { return materiales; }
    public void addMaterial(MaterialSat m) { this.materiales.add(m); }
}

package model;
import java.math.BigDecimal;

public class MaterialSat {
    private int idMaterial;
    private int idActuacion;
    private String nombre;
    private int cantidad;
    private BigDecimal precioUnidad;
    
    public MaterialSat() {}
    
    // Getters y Setters
    public int getIdMaterial() { return idMaterial; }
    public void setIdMaterial(int id) { this.idMaterial = id; }
    
    public int getIdActuacion() { return idActuacion; }
    public void setIdActuacion(int id) { this.idActuacion = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String n) { this.nombre = n; }
    
    public int getCantidad() { return cantidad; }
    public void setCantidad(int c) { this.cantidad = c; }
    
    public BigDecimal getPrecioUnidad() { return precioUnidad; }
    public void setPrecioUnidad(BigDecimal p) { this.precioUnidad = p; }
}

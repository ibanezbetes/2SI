import java.time.LocalDateTime;

public class Incidencia {
    private int idIncidencia;
    private int idOrden;
    private LocalDateTime fecha;
    private String idTipoIncidencia;
    private String descripcion;
    private Integer idProducto;
    private int idEmpleadoReporta;
    private String estado;

    public Incidencia() {}

    public int getIdIncidencia() { return idIncidencia; }
    public void setIdIncidencia(int idIncidencia) { this.idIncidencia = idIncidencia; }
    public int getIdOrden() { return idOrden; }
    public void setIdOrden(int idOrden) { this.idOrden = idOrden; }
    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
    public String getIdTipoIncidencia() { return idTipoIncidencia; }
    public void setIdTipoIncidencia(String idTipoIncidencia) { this.idTipoIncidencia = idTipoIncidencia; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public Integer getIdProducto() { return idProducto; }
    public void setIdProducto(Integer idProducto) { this.idProducto = idProducto; }
    public int getIdEmpleadoReporta() { return idEmpleadoReporta; }
    public void setIdEmpleadoReporta(int idEmpleadoReporta) { this.idEmpleadoReporta = idEmpleadoReporta; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}


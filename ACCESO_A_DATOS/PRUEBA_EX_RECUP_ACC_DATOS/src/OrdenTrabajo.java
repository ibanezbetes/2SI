import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrdenTrabajo {
    private int idOrden;
    private int idTicketVenta;
    private String idEstado;
    private String idPrioridad;
    private int idEmpleadoResponsable;
    private int idDireccionEntrega;
    private Integer idTransporte;
    private BigDecimal costeEnvio;
    private String codigoSeguimiento;
    private LocalDateTime fechaGeneracion;
    private LocalDateTime fechaSalida;

    public OrdenTrabajo() {}

    public int getIdOrden() { return idOrden; }
    public void setIdOrden(int idOrden) { this.idOrden = idOrden; }
    public int getIdTicketVenta() { return idTicketVenta; }
    public void setIdTicketVenta(int idTicketVenta) { this.idTicketVenta = idTicketVenta; }
    public String getIdEstado() { return idEstado; }
    public void setIdEstado(String idEstado) { this.idEstado = idEstado; }
    public String getIdPrioridad() { return idPrioridad; }
    public void setIdPrioridad(String idPrioridad) { this.idPrioridad = idPrioridad; }
    public int getIdEmpleadoResponsable() { return idEmpleadoResponsable; }
    public void setIdEmpleadoResponsable(int idEmpleadoResponsable) { this.idEmpleadoResponsable = idEmpleadoResponsable; }
    public int getIdDireccionEntrega() { return idDireccionEntrega; }
    public void setIdDireccionEntrega(int idDireccionEntrega) { this.idDireccionEntrega = idDireccionEntrega; }
    public Integer getIdTransporte() { return idTransporte; }
    public void setIdTransporte(Integer idTransporte) { this.idTransporte = idTransporte; }
    public BigDecimal getCosteEnvio() { return costeEnvio; }
    public void setCosteEnvio(BigDecimal costeEnvio) { this.costeEnvio = costeEnvio; }
    public String getCodigoSeguimiento() { return codigoSeguimiento; }
    public void setCodigoSeguimiento(String codigoSeguimiento) { this.codigoSeguimiento = codigoSeguimiento; }
    public LocalDateTime getFechaGeneracion() { return fechaGeneracion; }
    public void setFechaGeneracion(LocalDateTime fechaGeneracion) { this.fechaGeneracion = fechaGeneracion; }
    public LocalDateTime getFechaSalida() { return fechaSalida; }
    public void setFechaSalida(LocalDateTime fechaSalida) { this.fechaSalida = fechaSalida; }
}


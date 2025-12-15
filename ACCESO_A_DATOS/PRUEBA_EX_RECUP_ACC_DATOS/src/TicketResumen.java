import java.math.BigDecimal;
import java.time.LocalDate;

public class TicketResumen {
    private int idTicket;
    private LocalDate fecha;
    private String pago;
    private BigDecimal total;

    public TicketResumen() {}

    public int getIdTicket() { return idTicket; }
    public void setIdTicket(int idTicket) { this.idTicket = idTicket; }
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public String getPago() { return pago; }
    public void setPago(String pago) { this.pago = pago; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
}


package org.example.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TicketResumen {
    private long idTicket;
    private LocalDate fecha;
    private String formaPago;
    private BigDecimal totalImporte;

    public TicketResumen(long idTicket, LocalDate fecha, String formaPago, BigDecimal totalImporte) {
        this.idTicket = idTicket;
        this.fecha = fecha;
        this.formaPago = formaPago;
        this.totalImporte = totalImporte;
    }

    public long getIdTicket() { return idTicket; }
    public LocalDate getFecha() { return fecha; }
    public String getFormaPago() { return formaPago; }
    public BigDecimal getTotalImporte() { return totalImporte; }

    @Override
    public String toString() {
        return "TicketResumen{" +
                "idTicket=" + idTicket +
                ", fecha=" + fecha +
                ", formaPago='" + formaPago + '\'' +
                ", total=" + totalImporte +
                '}';
    }
}

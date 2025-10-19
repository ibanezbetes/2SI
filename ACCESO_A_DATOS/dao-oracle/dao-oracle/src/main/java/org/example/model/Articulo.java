package org.example.model;

import java.math.BigDecimal;

public class Articulo {
    private long idArticulo;
    private String nombre;
    private String detalle;
    private String codReferencia;
    private int cantidadDisp;
    private BigDecimal precioUnit;

    public Articulo() {}

    public Articulo(long idArticulo, String nombre, String detalle, String codReferencia, int cantidadDisp, BigDecimal precioUnit) {
        this.idArticulo = idArticulo;
        this.nombre = nombre;
        this.detalle = detalle;
        this.codReferencia = codReferencia;
        this.cantidadDisp = cantidadDisp;
        this.precioUnit = precioUnit;
    }

    public long getIdArticulo() { return idArticulo; }
    public void setIdArticulo(long idArticulo) { this.idArticulo = idArticulo; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDetalle() { return detalle; }
    public void setDetalle(String detalle) { this.detalle = detalle; }

    public String getCodReferencia() { return codReferencia; }
    public void setCodReferencia(String codReferencia) { this.codReferencia = codReferencia; }

    public int getCantidadDisp() { return cantidadDisp; }
    public void setCantidadDisp(int cantidadDisp) { this.cantidadDisp = cantidadDisp; }

    public BigDecimal getPrecioUnit() { return precioUnit; }
    public void setPrecioUnit(BigDecimal precioUnit) { this.precioUnit = precioUnit; }

    @Override
    public String toString() {
        return "Articulo{" +
                "id=" + idArticulo +
                ", nombre='" + nombre + '\'' +
                ", ref='" + codReferencia + '\'' +
                ", cant=" + cantidadDisp +
                ", precio=" + precioUnit +
                '}';
    }
}

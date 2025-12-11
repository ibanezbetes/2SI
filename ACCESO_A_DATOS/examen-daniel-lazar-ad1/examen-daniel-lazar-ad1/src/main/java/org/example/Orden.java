package org.example;

import javax.xml.bind.annotation.*;

@XmlRootElement(name = "orden")
@XmlAccessorType(XmlAccessType.FIELD)
public class Orden {

    private int id_orden;
    private String codigo_orden;
    private String fecha_generacion; // Se mantiene como String para simplificar tu modelo original
    private String estado;
    private String prioridad;
    private int id_pedido;
    private int id_responsable;

    // Datos de transporte
    private String transporte_compania;
    private double transporte_coste; // CAMBIADO DE long A double
    private String transporte_tracking;
    private String fecha_salida;

    // Constructor vacío (Obligatorio para JAXB/XML)
    public Orden(){}

    // Constructor completo
    public Orden(int id_orden, String codigo_orden, String fecha_generacion, String estado, String prioridad, int id_pedido, int id_responsable, String transporte_compania, double transporte_coste, String transporte_tracking, String fecha_salida) {
        this.id_orden = id_orden;
        this.codigo_orden = codigo_orden;
        this.fecha_generacion = fecha_generacion;
        this.estado = estado;
        this.prioridad = prioridad;
        this.id_pedido = id_pedido;
        this.id_responsable = id_responsable;
        this.transporte_compania = transporte_compania;
        this.transporte_coste = transporte_coste;
        this.transporte_tracking = transporte_tracking;
        this.fecha_salida = fecha_salida;
    }

    // Getters y Setters
    public int getId_orden() { return id_orden; }
    public void setId_orden(int id_orden) { this.id_orden = id_orden; }

    public String getCodigo_orden() { return codigo_orden; }
    public void setCodigo_orden(String codigo_orden) { this.codigo_orden = codigo_orden; }

    public String getFecha_generacion() { return fecha_generacion; }
    public void setFecha_generacion(String fecha_generacion) { this.fecha_generacion = fecha_generacion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getPrioridad() { return prioridad; }
    public void setPrioridad(String prioridad) { this.prioridad = prioridad; }

    public int getId_pedido() { return id_pedido; }
    public void setId_pedido(int id_pedido) { this.id_pedido = id_pedido; }

    public int getId_responsable() { return id_responsable; }
    public void setId_responsable(int id_responsable) { this.id_responsable = id_responsable; }

    public String getTransporte_compania() { return transporte_compania; }
    public void setTransporte_compania(String transporte_compania) { this.transporte_compania = transporte_compania; }

    public double getTransporte_coste() { return transporte_coste; }
    public void setTransporte_coste(double transporte_coste) { this.transporte_coste = transporte_coste; }

    public String getTransporte_tracking() { return transporte_tracking; }
    public void setTransporte_tracking(String transporte_tracking) { this.transporte_tracking = transporte_tracking; }

    public String getFecha_salida() { return fecha_salida; }
    public void setFecha_salida(String fecha_salida) { this.fecha_salida = fecha_salida; }

    @Override
    public String toString() {
        return "Orden #" + id_orden + " [" + codigo_orden + "] Estado: " + estado;
    }
}
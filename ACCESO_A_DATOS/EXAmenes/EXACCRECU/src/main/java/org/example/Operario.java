package org.example;

public class Operario {
    private String id;
    private String dni;
    private String nombre;
    private double latitud;
    private double longitud;

    public Operario() {}

    public Operario(String id, String dni, String nombre, double latitud, double longitud) {
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    // Getters y Setters básicos
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public double getLatitud() { return latitud; }
    public void setLatitud(double latitud) { this.latitud = latitud; }
    public double getLongitud() { return longitud; }
    public void setLongitud(double longitud) { this.longitud = longitud; }
}
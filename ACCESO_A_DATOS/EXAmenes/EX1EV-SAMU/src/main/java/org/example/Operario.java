package org.example;

// Ya no hay imports raros de XML aquí

public class Operario {

    private String id;
    private String dni;
    private String nombre;
    private String especialidad;

    // Constructor vacío (opcional, pero buena práctica)
    public Operario() {}

    public Operario(String id, String dni, String nombre, String especialidad) {
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.especialidad = especialidad;
    }

    // Getters y Setters normales
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEspecialidad() { return especialidad; }
    public void setEspecialidad(String especialidad) { this.especialidad = especialidad; }

    @Override
    public String toString() {
        return "Operario [id=" + id + ", nombre=" + nombre + "]";
    }
}
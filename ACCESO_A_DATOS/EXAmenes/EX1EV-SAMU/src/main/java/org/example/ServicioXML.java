package org.example;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class ServicioXML {

    // --- MÉTODO PARA ESCRIBIR (Como en la página 25 del PDF) ---
    // Usamos FileWriter y PrintWriter para escribir texto plano
    public void generarXML(List<Operario> operarios, String ruta) {
        File fichero = null;
        FileWriter writer = null;
        PrintWriter pw = null;

        try {
            fichero = new File(ruta); //
            writer = new FileWriter(fichero); //
            pw = new PrintWriter(writer); //

            // Recorremos la lista y escribimos una línea por cada operario
            // Formato: ID,DNI,Nombre,Especialidad
            for (Operario op : operarios) {
                pw.println(op.getId() + "," + op.getDni() + "," + op.getNombre() + "," + op.getEspecialidad());
            }

            System.out.println("Fichero guardado correctamente en: " + fichero.getAbsolutePath());

        } catch (Exception e) {
            e.printStackTrace(); //
        } finally {
            try {
                // Cerramos el fichero en el finally para asegurar que se libera
                if (writer != null) {
                    writer.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
    }

    // --- MÉTODO PARA LEER (Como en la página 22 del PDF) ---
    // Usamos FileReader y BufferedReader
    public void leerXML(String ruta) {
        File archivo = null;
        FileReader reader = null;
        BufferedReader buffer = null;

        try {
            archivo = new File(ruta); //

            // Verificamos si existe antes de intentar leer (página 18)
            if (!archivo.exists()) {
                System.out.println("El archivo no existe.");
                return;
            }

            reader = new FileReader(archivo); //
            buffer = new BufferedReader(reader); //

            String linea;
            System.out.println("--- Leyendo datos del fichero ---");

            // Leemos línea a línea hasta que sea null
            while ((linea = buffer.readLine()) != null) {
                // Separamos los datos por la coma
                String[] datos = linea.split(",");
                // datos[0] es ID, datos[1] es DNI, datos[2] es Nombre...
                System.out.println("Operario leído: " + datos[2] + " (" + datos[3] + ")");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (reader != null) {
                    reader.close(); //
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
    }
}
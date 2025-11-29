package org.example;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class GestorXML {

    // EXPORTAR: Escribimos los datos separados por comas (Método PrintWriter)
    public void exportarOperarios(List<Operario> lista, String ruta) {
        File fichero = new File(ruta);
        FileWriter writer = null;
        PrintWriter pw = null;

        try {
            writer = new FileWriter(fichero); //
            pw = new PrintWriter(writer);     //

            // Escribimos una línea por cada operario
            // Formato: ID,DNI,NOMBRE,LAT,LON
            for (Operario op : lista) {
                pw.println(op.getId() + "," +
                        op.getDni() + "," +
                        op.getNombre() + "," +
                        op.getLatitud() + "," +
                        op.getLongitud());
            }
            System.out.println("Fichero generado correctamente en: " + fichero.getAbsolutePath());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (writer != null) writer.close(); // Cerramos el fichero
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    // IMPORTAR: Leemos línea a línea y troceamos (Método BufferedReader)
    public List<Operario> importarOperarios(String ruta) {
        List<Operario> lista = new ArrayList<>();
        File fichero = new File(ruta);
        FileReader reader = null;
        BufferedReader buffer = null;

        try {
            if (fichero.exists()) { // Comprobamos si existe
                reader = new FileReader(fichero);      //
                buffer = new BufferedReader(reader);   //

                String linea;
                // Leemos mientras haya líneas
                while ((linea = buffer.readLine()) != null) {
                    // Troceamos la línea por la coma
                    String[] datos = linea.split(",");

                    // Reconstruimos el objeto Operario
                    // datos[0]=ID, datos[1]=DNI, datos[2]=NOMBRE, datos[3]=LAT, datos[4]=LON
                    Operario op = new Operario(
                            datos[0],
                            datos[1],
                            datos[2],
                            Double.parseDouble(datos[3]),
                            Double.parseDouble(datos[4])
                    );
                    lista.add(op);
                }
            } else {
                System.out.println("El fichero no existe, no se puede importar.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (reader != null) reader.close(); // Cerramos recursos
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return lista;
    }
}
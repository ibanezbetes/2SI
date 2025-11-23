package org.example;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.Statement;

public class ImportadorXML {

    public void importarTabla(String nombreFichero) {
        File archivo = null;
        FileReader reader = null;
        BufferedReader buffer = null;
        Connection conn = null;
        Statement stmt = null;

        String nombreTabla = nombreFichero.replace(".xml", "");

        try {
            archivo = new File(nombreFichero);
            reader = new FileReader(archivo);
            buffer = new BufferedReader(reader);

            conn = ConexionOracle.getConnection();
            stmt = conn.createStatement();

            String linea;
            String columnasSQL = "";
            String valoresSQL = "";
            boolean dentroDeFila = false;

            while ((linea = buffer.readLine()) != null) {

                linea = linea.trim();

                if (linea.equals("<FILA>")) {
                    dentroDeFila = true;
                    columnasSQL = "";
                    valoresSQL = "";
                }
                else if (linea.equals("</FILA>")) {
                    dentroDeFila = false;

                    if (columnasSQL.length() > 0) {
                        String sql = "INSERT INTO " + nombreTabla + " (" + columnasSQL + ") VALUES (" + valoresSQL + ")";

                        stmt.executeUpdate(sql);
                        System.out.println(" -> Insertada fila en " + nombreTabla);
                    }
                }
                else if (dentroDeFila && linea.startsWith("<") && !linea.startsWith("</")) {
                    int finEtiquetaApertura = linea.indexOf(">");
                    int inicioEtiquetaCierre = linea.lastIndexOf("<");

                    if (finEtiquetaApertura > 0 && inicioEtiquetaCierre > finEtiquetaApertura) {
                        String nombreColumna = linea.substring(1, finEtiquetaApertura);

                        String valorDato = linea.substring(finEtiquetaApertura + 1, inicioEtiquetaCierre);

                        String valorFormateado;
                        if (esNumero(valorDato)) {
                            valorFormateado = valorDato;
                        } else {
                            valorFormateado = "'" + valorDato + "'";
                        }

                        if (columnasSQL.equals("")) {
                            columnasSQL = nombreColumna;
                            valoresSQL = valorFormateado;
                        } else {
                            columnasSQL = columnasSQL + "," + nombreColumna;
                            valoresSQL = valoresSQL + "," + valorFormateado;
                        }
                    }
                }
            }

            System.out.println("Importación del fichero " + nombreFichero + " terminada.");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != reader) {
                    reader.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
    }

    private boolean esNumero(String valor) {
        try {
            Double.parseDouble(valor);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
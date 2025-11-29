package org.example;

import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.sql.*;

public class ExportadorXML {

    public void exportarTabla(String nombreTabla) {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        File fichero = null;
        FileWriter writer = null;
        PrintWriter pw = null;

        try {
            conn = ConexionOracle.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery("SELECT * FROM " + nombreTabla);

            fichero = new File(nombreTabla + ".xml");
            writer = new FileWriter(fichero);
            pw = new PrintWriter(writer);

            pw.println("<" + nombreTabla + ">");

            ResultSetMetaData meta = rs.getMetaData();
            int numColumnas = meta.getColumnCount();

            pw.println("  <ESTRUCTURA>");
            for (int i = 1; i <= numColumnas; i++) {
                if (i > 1) pw.print(",");
                pw.print(meta.getColumnName(i));
            }
            pw.println();
            pw.println("  </ESTRUCTURA>");

            pw.println("  <DATOS>");
            while (rs.next()) {
                pw.println("    <FILA>");
                for (int i = 1; i <= numColumnas; i++) {
                    String nombreCol = meta.getColumnName(i);
                    String valor = rs.getString(i);
                    if (valor == null) valor = "";

                    pw.println("      <" + nombreCol + ">" + valor + "</" + nombreCol + ">");
                }
                pw.println("    </FILA>");
            }
            pw.println("  </DATOS>");
            pw.println("</" + nombreTabla + ">");

            System.out.println("Fichero exportado: " + nombreTabla + ".xml");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != pw) {
                    pw.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }


            try {
                if (conn != null) conn.close();
            } catch (SQLException e) {}
        }
    }
}
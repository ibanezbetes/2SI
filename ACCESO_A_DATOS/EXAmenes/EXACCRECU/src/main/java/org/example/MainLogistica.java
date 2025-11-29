package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

public class MainLogistica {

    public static void main(String[] args) {
        String url = "jdbc:oracle:thin:@localhost:1521:xe";
        String user = "LOLO";
        String pass = "LOLO";
        Connection conexion = null;

        try {
            System.out.println("--- 1. Conectando a BD ---");
            conexion = DriverManager.getConnection(url, user, pass);

            OperarioDAO dao = new OperarioDAO(conexion);
            GestorXML gestorXML = new GestorXML();

            // 2. Alta Operario
            System.out.println("\n--- 2. Alta Operario ---");
            Operario nuevoOp = new Operario("OP099", "99999999X", "Laura Recepcion", 40.45, -3.69);
            try {
                dao.insertarOperario(nuevoOp);
                System.out.println("Operario insertado.");
            } catch (SQLException e) {
                System.out.println("El operario ya existía.");
            }

            // 3. Registrar Intervención
            System.out.println("\n--- 3. Registro Intervención ---");
            try {
                // Asegúrate que EX001 existe en tu SQL
                dao.registrarIntervencion("IN099", "EX001", "OP099", "VERIFICACION", "Todo OK");
                System.out.println("Intervención registrada.");
            } catch (SQLException e) {
                System.out.println("Error registro intervención: " + e.getMessage());
            }

            // 4. Exportar (Fichero simple)
            System.out.println("\n--- 4. Exportar a Fichero ---");
            List<Operario> listaOps = dao.listarOperarios();
            // Le ponemos extensión .xml para cumplir, aunque por dentro sea texto simple
            gestorXML.exportarOperarios(listaOps, "operarios.xml");

            // 5. Importar (Fichero simple)
            System.out.println("\n--- 5. Importar de Fichero ---");
            List<Operario> listaImportada = gestorXML.importarOperarios("operarios.xml");
            for (Operario op : listaImportada) {
                System.out.println("Leído -> " + op.getNombre() + " (" + op.getLatitud() + ", " + op.getLongitud() + ")");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try { if (conexion != null) conexion.close(); } catch (Exception e) {}
        }
    }
}
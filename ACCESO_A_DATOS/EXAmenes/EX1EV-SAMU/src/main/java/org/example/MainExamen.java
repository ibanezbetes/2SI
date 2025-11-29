package org.example;

import java.util.List;
// Si te piden Scanner para leer datos del teclado, impórtalo también:
// import java.util.Scanner;

public class MainExamen {

    public static void main(String[] args) {

        // 1. Instanciamos nuestros servicios (DAO y XML)
        OperarioDAO operarioDAO = new OperarioDAO();
        ServicioXML servicioXML = new ServicioXML();

        System.out.println("==========================================");
        System.out.println("     INICIO DEL EXAMEN - GESTIÓN LOGÍSTICA");
        System.out.println("==========================================");

        // -----------------------------------------------------------
        // PARTE 1: PRUEBAS DE BASE DE DATOS (Requisito de Trazabilidad y GPS)
        // -----------------------------------------------------------
        System.out.println("\n---> 1. Probando Registro de Trazabilidad (DAO)...");

        // Simulamos que el operario 'OP001' realiza el 'PICKING' del envío 'EN001'
        // NOTA: Asegúrate de usar los IDs que insertaste en el script SQL (A)
        operarioDAO.registrarPaso("EN001", "OP001", "PICKING_FINALIZADO");

        System.out.println("\n---> 2. Probando Geolocalización (DAO)...");

        // Simulamos que el envío se mueve a nuevas coordenadas
        // Envio: 'EN001', Lat: 40.41, Lon: -3.70
        operarioDAO.actualizarGPS("EN001", 40.4167, -3.7037);

        // -----------------------------------------------------------
        // PARTE 2: PRUEBAS DE XML (Requisito de Exportar/Importar)
        // -----------------------------------------------------------
        System.out.println("\n==========================================");
        System.out.println("     PRUEBAS DE XML (IMPORTAR / EXPORTAR)");
        System.out.println("==========================================");

        System.out.println("\n---> 3. Obteniendo datos de Oracle para Exportar...");

        // Recuperamos la lista completa de operarios desde la BD
        List<Operario> listaParaExportar = operarioDAO.obtenerTodos();

        if (listaParaExportar.isEmpty()) {
            System.out.println("AVISO: La base de datos parece vacía o no hay conexión.");
        } else {
            System.out.println("Se han recuperado " + listaParaExportar.size() + " operarios.");
        }

        System.out.println("\n---> 4. Generando archivo XML...");
        // Nombre del fichero donde guardaremos los datos
        String nombreFichero = "operarios_examen.xml";

        // Llamamos al servicio para crear el archivo físico
        servicioXML.generarXML(listaParaExportar, nombreFichero);

        System.out.println("\n---> 5. Importando (Leyendo) el archivo XML generado...");
        // Leemos el archivo que acabamos de crear para verificar que funciona
        servicioXML.leerXML(nombreFichero);

        System.out.println("\n==========================================");
        System.out.println("     FIN DE LA EJECUCIÓN");
        System.out.println("==========================================");
    }
}
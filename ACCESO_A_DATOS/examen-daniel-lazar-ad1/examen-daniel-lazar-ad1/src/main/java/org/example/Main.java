package org.example;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.util.List;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        OrdenDAO ordenDAO = new OrdenDAO();
        Scanner scanner = new Scanner(System.in);
        boolean salir = false;

        while (!salir) {
            System.out.println("\n--- GESTIÓN LOGÍSTICA ---");
            System.out.println("1. Listar órdenes (Base de Datos)");
            System.out.println("2. Exportar a XML");
            System.out.println("3. Importar desde XML");
            System.out.println("4. Salir");
            System.out.print("Elige una opción: ");

            String entrada = scanner.nextLine();
            int opcion;
            try {
                opcion = Integer.parseInt(entrada);
            } catch (NumberFormatException e) {
                System.out.println(">> Error: Introduce un número válido.");
                continue;
            }

            switch (opcion) {
                case 1:
                    System.out.println("\n--- LISTADO DE ÓRDENES (BD) ---");
                    List<Orden> listaVer = ordenDAO.obtenerTodos();
                    if (listaVer.isEmpty()) {
                        System.out.println("No hay órdenes en la base de datos.");
                    } else {
                        System.out.println("Se han recuperado " + listaVer.size() + " órdenes.");
                        for (Orden o : listaVer) {
                            System.out.println(o);
                        }
                    }
                    break;

                case 2:
                    System.out.println("\n--- EXPORTANDO A XML ---");
                    List<Orden> listaExportar = ordenDAO.obtenerTodos();
                    if (listaExportar.isEmpty()) {
                        System.out.println("No hay datos para exportar.");
                    } else {
                        exportarXML(listaExportar);
                    }
                    break;

                case 3:
                    System.out.println("\n--- IMPORTANDO DESDE XML ---");
                    importarXML();
                    break;

                case 4:
                    salir = true;
                    break;

                default:
                    System.out.println("Opción no válida.");
            }
        }

        System.out.println("--- FIN ---");
        scanner.close();
    }

    private static void exportarXML(List<Orden> lista) {
        try {
            OrdenXML misDatosXML = new OrdenXML();
            misDatosXML.setListaOrdenes(lista);

            JAXBContext context = JAXBContext.newInstance(OrdenXML.class);
            Marshaller mar = context.createMarshaller();
            mar.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

            File archivo = new File("listado_ordenes.xml");
            mar.marshal(misDatosXML, archivo);

            System.out.println("Archivo XML generado correctamente: " + archivo.getAbsolutePath());

        } catch (JAXBException e) {
            System.err.println("Error al exportar XML: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void importarXML() {
        File archivo = new File("listado_ordenes.xml");

        if (!archivo.exists()) {
            System.out.println("Error: No existe el archivo 'listado_ordenes.xml'. Primero debes exportarlo (Opción 2).");
            return;
        }

        try {
            JAXBContext context = JAXBContext.newInstance(OrdenXML.class);

            Unmarshaller unmarshaller = context.createUnmarshaller();

            OrdenXML datosImportados = (OrdenXML) unmarshaller.unmarshal(archivo);
            List<Orden> lista = datosImportados.getListaOrdenes();

            System.out.println("Lectura del XML exitosa.");
            System.out.println("Se han importado " + lista.size() + " órdenes del fichero:");

            for (Orden o : lista) {
                System.out.println(" [XML] " + o.toString());
            }

        } catch (JAXBException e) {
            System.err.println("Error al leer el XML: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
package org.example;

import java.util.Scanner;

public class MenuPrincipal {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        ExportadorXML exportador = new ExportadorXML();
        ImportadorXML importador = new ImportadorXML();
        ArticuloDAO articuloDAO = new ArticuloDAO();
        VentaDAO ventaDAO = new VentaDAO();

        int op = 0;
        do {
            System.out.println("1- Programa de gestión: ");
            System.out.println("2- Visualizar Artículos");
            System.out.println("3- Visualizar Ventas");
            System.out.println("4- Exportar Tabla");
            System.out.println("5- Importar Tabla");
            System.out.println("0- Salir");
            System.out.print("Elige un número (0-5): ");

            if (sc.hasNextInt()) {
                op = sc.nextInt();
                sc.nextLine();
            } else {
                sc.nextLine(); op = -1;
            }

            switch(op) {
                case 1: articuloDAO.visualizarTodos(); break;
                case 2: ventaDAO.visualizarTodas(); break;
                case 3:
                    System.out.print("Tabla a exportar: ");
                    String tExp = sc.nextLine().toUpperCase();
                    exportador.exportarTabla(tExp);
                    break;
                case 4:
                    System.out.print("Fichero a importar (Ej: Tabla.xml): ");
                    String fImp = sc.nextLine();
                    importador.importarTabla(fImp);
                    break;
                case 0: System.out.println("Fin."); break;
            }
        } while(op != 0);
    }
}
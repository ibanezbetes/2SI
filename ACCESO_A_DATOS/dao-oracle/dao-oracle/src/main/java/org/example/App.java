package org.example;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

import org.example.dao.ArticuloDao;
import org.example.dao.TicketDao;
import org.example.model.Articulo;
import org.example.model.TicketResumen;

public class App {
    private static final DateTimeFormatter DF = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ROOT);

    public static void main(String[] args) throws SQLException {
        Scanner sc = new Scanner(System.in);
        TicketDao ticketDao = new TicketDao();
        ArticuloDao articuloDao = new ArticuloDao();

        while (true) {
            System.out.println("=== Menú DAO Oracle ===");
            System.out.println("1) Ver TODAS las ventas (tickets)");
            System.out.println("2) Ver ventas por periodo (YYYY-MM-DD a YYYY-MM-DD)");
            System.out.println("3) Ver TODOS los artículos");
            System.out.println("4) Insertar NUEVO artículo");
            System.out.println("0) Salir");
            System.out.print("Opción: ");

            String op = sc.nextLine().trim();

            switch (op) {
                case "1":
                    listarVentas(ticketDao);
                    break;
                case "2":
                    listarVentasPorPeriodo(sc, ticketDao);
                    break;
                case "3":
                    listarArticulos(articuloDao);
                    break;
                case "4":
                    insertarArticulo(sc, articuloDao);
                    break;
                case "0":
                    System.out.println("Hasta luego");
                    return; // sale del main
                default:
                    System.out.println("Opción no válida");
                    break;
            }
        }

    }

    private static void listarVentas(TicketDao dao) throws SQLException {
        List<TicketResumen> lista = dao.findAllResumen();
        if (lista.isEmpty()) {
            System.out.println("No hay tickets.");
            return;
        }
        lista.forEach(System.out::println);
    }

    private static void listarVentasPorPeriodo(Scanner sc, TicketDao dao) throws SQLException {
        System.out.print("Desde (YYYY-MM-DD): ");
        LocalDate d1 = LocalDate.parse(sc.nextLine().trim(), DF);
        System.out.print("Hasta (YYYY-MM-DD): ");
        LocalDate d2 = LocalDate.parse(sc.nextLine().trim(), DF);
        List<TicketResumen> lista = dao.findResumenByPeriodo(d1, d2);
        if (lista.isEmpty()) {
            System.out.println("No hay tickets en el periodo.");
            return;
        }
        lista.forEach(System.out::println);
    }

    private static void listarArticulos(ArticuloDao dao) throws SQLException {
        List<Articulo> lista = dao.findAll();
        if (lista.isEmpty()) {
            System.out.println("No hay artículos.");
            return;
        }
        lista.forEach(System.out::println);
    }

    private static void insertarArticulo(Scanner sc, ArticuloDao dao) throws SQLException {
        Articulo a = new Articulo();
        System.out.print("Nombre: ");
        a.setNombre(sc.nextLine().trim());
        System.out.print("Detalle (puede estar vacío): ");
        String det = sc.nextLine().trim();
        a.setDetalle(det.isEmpty()? null : det);
        System.out.print("Cod. referencia: ");
        a.setCodReferencia(sc.nextLine().trim());
        System.out.print("Cantidad disponible: ");
        a.setCantidadDisp(Integer.parseInt(sc.nextLine().trim()));
        System.out.print("Precio unitario: ");
        a.setPrecioUnit(new BigDecimal(sc.nextLine().trim()));
        Articulo creado = dao.insert(a);
        System.out.println("Insertado: " + creado);
    }
}

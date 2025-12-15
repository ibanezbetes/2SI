import dao.*;
import model.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        SatDAO satDAO = new SatDAOImpl();
        XmlSatDAO xmlDAO = new XmlSatDAO();
        int op = -1;
        
        do {
            System.out.println("\n=========================================");
            System.out.println("      GESTION SAT - PAPA NOEL ERP");
            System.out.println("=========================================");
            System.out.println("1. Registrar Nueva Solicitud (Cliente)");
            System.out.println("2. Registrar Actuacion (Técnico)");
            System.out.println("3. Añadir Material a Actuacion");
            System.out.println("4. Cerrar Solicitud (Generar Doc Final)");
            System.out.println("5. Listar Todo y EXPORTAR a XML");
            System.out.println("6. IMPORTAR desde XML (Reconstruir DB)");
            System.out.println("0. Salir");
            System.out.print(">>> Elige opción: ");
            
            try { 
                String input = in.nextLine();
                if(input.isEmpty()) continue;
                op = Integer.parseInt(input); 
            } catch(Exception e){ 
                System.out.println("¡Introduce un numero valido!");
                continue;
            }
            
            try {
                switch(op) {
                    case 1:
                        // NUEVA SOLICITUD
                        System.out.println("\n--- NUEVA SOLICITUD ---");
                        System.out.print("ID Cliente (ej: 1): "); int cli = Integer.parseInt(in.nextLine());
                        System.out.print("ID Producto (ej: 100): "); int prod = Integer.parseInt(in.nextLine());
                        System.out.print("Descripcion Problema: "); String desc = in.nextLine();
                        
                        SolicitudSat s = new SolicitudSat();
                        s.setIdCliente(cli); 
                        s.setIdProducto(prod); 
                        s.setIdTecnico(1); // Asignamos técnico 1 por defecto
                        s.setDescripcion(desc); 
                        s.setPrioridad("NORMAL");
                        s.setFechaSolicitud(LocalDateTime.now());
                        
                        int id = satDAO.crearSolicitud(s);
                        System.out.println(">> Solicitud creada con ID: " + id);
                        break;
                        
                    case 2:
                        // NUEVA ACTUACIÓN
                        System.out.println("\n--- REGISTRAR ACTUACION ---");
                        System.out.print("ID Solicitud a trabajar: "); int idS = Integer.parseInt(in.nextLine());
                        System.out.print("Descripción del trabajo: "); String dAct = in.nextLine();
                        System.out.print("Horas empleadas: "); double h = Double.parseDouble(in.nextLine());
                        
                        ActuacionSat a = new ActuacionSat();
                        a.setIdSolicitud(idS); 
                        a.setDescripcion(dAct); 
                        a.setHoras(h);
                        a.setCosteManoObra(new BigDecimal(h * 20)); // Ejemplo: 20€/hora
                        
                        int idAct = satDAO.crearActuacion(a);
                        System.out.println(">> Actuación registrada ID: " + idAct);
                        break;
                        
                    case 3:
                        // NUEVO MATERIAL
                        System.out.println("\n--- AÑADIR MATERIAL ---");
                        System.out.print("ID Actuación donde se usó: "); int idA = Integer.parseInt(in.nextLine());
                        System.out.print("Nombre Material: "); String nom = in.nextLine();
                        System.out.print("Cantidad: "); int c = Integer.parseInt(in.nextLine());
                        
                        MaterialSat m = new MaterialSat();
                        m.setIdActuacion(idA); 
                        m.setNombre(nom); 
                        m.setCantidad(c);
                        m.setPrecioUnidad(new BigDecimal(5.00)); // Precio fijo ejemplo
                        
                        int idMat = satDAO.crearMaterial(m);
                        System.out.println(">> Material añadido ID: " + idMat);
                        break;
                        
                    case 4:
                        // CERRAR SOLICITUD
                        System.out.println("\n--- CERRAR SOLICITUD Y GENERAR DOCUMENTO ---");
                        System.out.print("ID Solicitud a Cerrar: "); int idC = Integer.parseInt(in.nextLine());
                        System.out.print("Conclusiones finales: "); String conc = in.nextLine();
                        
                        satDAO.generarDocumentoFinal(idC, conc);
                        System.out.println(">> Solicitud CERRADA y Documento generado correctamente.");
                        break;
                        
                    case 5:
                        // LISTAR Y EXPORTAR
                        System.out.println("\n--- LISTADO COMPLETO (Y EXPORTACION XML) ---");
                        List<SolicitudSat> lista = satDAO.listarSolicitudesCompletas();
                        
                        for(SolicitudSat sol : lista) {
                            System.out.println("SOLICITUD #" + sol.getIdSolicitud() + " | " + sol.getDescripcion() + " | Estado: " + sol.getEstado());
                            for(ActuacionSat act : sol.getActuaciones()){
                                System.out.println("   -> ACTUACION: " + act.getDescripcion());
                                for(MaterialSat mat : act.getMateriales()){
                                    System.out.println("      -> MATERIAL: " + mat.getNombre() + " (x" + mat.getCantidad() + ")");
                                }
                            }
                        }
                        // Exportar a XML
                        xmlDAO.exportarXML(lista, "reparaciones_sat.xml");
                        break;
                        
                    case 6:
                        // IMPORTAR
                        System.out.println("\n--- IMPORTANDO XML ---");
                        xmlDAO.importarXML("reparaciones_sat.xml", satDAO);
                        break;
                        
                    case 0:
                        System.out.println("Saliendo...");
                        break;
                        
                    default:
                        System.out.println("Opción no reconocida.");
                }
            } catch (Exception e) { 
                System.out.println("ERROR: " + e.getMessage());
                e.printStackTrace(); 
            }
            
        } while(op != 0);
        in.close();
    }
}
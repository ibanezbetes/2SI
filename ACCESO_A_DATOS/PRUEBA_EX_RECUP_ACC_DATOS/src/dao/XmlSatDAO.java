package dao;
import model.*;
import java.io.*;
import java.util.List;
import javax.xml.parsers.*;
import org.w3c.dom.*;

public class XmlSatDAO {
    
    // --- EXPORTAR ---
    // Usamos StringBuilder para escribir el XML "a mano" y tener control total del formato
    public void exportarXML(List<SolicitudSat> datos, String fichero) throws IOException {
        StringBuilder sb = new StringBuilder();
        
        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        sb.append("<reparaciones>\n");
        
        for(SolicitudSat s : datos) {
            // Nivel 1: Solicitud
            sb.append("  <solicitud id=\"").append(s.getIdSolicitud()).append("\">\n");
            sb.append("    <cliente>").append(s.getIdCliente()).append("</cliente>\n");
            sb.append("    <producto>").append(s.getIdProducto()).append("</producto>\n");
            sb.append("    <problema>").append(s.getDescripcion()).append("</problema>\n");
            
            sb.append("    <actuaciones>\n");
            for(ActuacionSat a : s.getActuaciones()) {
                // Nivel 2: Actuación
                sb.append("      <actuacion id=\"").append(a.getIdActuacion()).append("\">\n");
                sb.append("        <desc>").append(a.getDescripcion()).append("</desc>\n");
                
                sb.append("        <materiales>\n");
                for(MaterialSat m : a.getMateriales()) {
                    // Nivel 3: Material
                    sb.append("          <material id=\"").append(m.getIdMaterial()).append("\">\n");
                    sb.append("            <nombre>").append(m.getNombre()).append("</nombre>\n");
                    sb.append("            <cantidad>").append(m.getCantidad()).append("</cantidad>\n");
                    sb.append("          </material>\n");
                }
                sb.append("        </materiales>\n");
                sb.append("      </actuacion>\n");
            }
            sb.append("    </actuaciones>\n");
            sb.append("  </solicitud>\n");
        }
        sb.append("</reparaciones>");
        
        // Escribir a disco
        try(FileWriter fw = new FileWriter(fichero)) {
            fw.write(sb.toString());
        }
        System.out.println(">> XML Generado con éxito: " + fichero);
    }
    
    // --- IMPORTAR ---
    // Usamos DOM (Document Object Model) para leer la estructura jerárquica
    public void importarXML(String fichero, SatDAO dao) throws Exception {
        File f = new File(fichero);
        if(!f.exists()) {
            System.out.println("El fichero no existe.");
            return;
        }
        
        // Preparar Parser
        DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
        Document doc = dBuilder.parse(f);
        doc.getDocumentElement().normalize();
        
        NodeList nSol = doc.getElementsByTagName("solicitud");
        System.out.println("Encontradas " + nSol.getLength() + " solicitudes en el XML.");
        
        for(int i=0; i<nSol.getLength(); i++) {
            Element eSol = (Element) nSol.item(i);
            
            // 1. Crear Solicitud (Simulamos importación creando nuevas IDs)
            SolicitudSat s = new SolicitudSat();
            s.setIdCliente(Integer.parseInt(getTagValue("cliente", eSol)));
            s.setIdProducto(Integer.parseInt(getTagValue("producto", eSol)));
            s.setDescripcion(getTagValue("problema", eSol));
            s.setIdTecnico(1); // Asignamos técnico por defecto al importar
            s.setPrioridad("NORMAL");
            s.setFechaSolicitud(java.time.LocalDateTime.now());
            
            int idSolNueva = dao.crearSolicitud(s);
            System.out.println("  -> Importada Solicitud Nueva ID: " + idSolNueva);
            
            // 2. Recorrer Actuaciones dentro de esta solicitud
            NodeList nAct = eSol.getElementsByTagName("actuacion");
            for(int j=0; j<nAct.getLength(); j++) {
                Element eAct = (Element) nAct.item(j);
                ActuacionSat a = new ActuacionSat();
                a.setIdSolicitud(idSolNueva);
                a.setDescripcion(getTagValue("desc", eAct));
                a.setHoras(1.0); // Valor por defecto si no viene en XML
                a.setCosteManoObra(java.math.BigDecimal.TEN);
                
                int idActNueva = dao.crearActuacion(a);
                
                // 3. Recorrer Materiales dentro de esta actuación
                NodeList nMat = eAct.getElementsByTagName("material");
                for(int k=0; k<nMat.getLength(); k++) {
                    Element eMat = (Element) nMat.item(k);
                    MaterialSat m = new MaterialSat();
                    m.setIdActuacion(idActNueva);
                    m.setNombre(getTagValue("nombre", eMat));
                    m.setCantidad(Integer.parseInt(getTagValue("cantidad", eMat)));
                    m.setPrecioUnidad(java.math.BigDecimal.ONE);
                    
                    dao.crearMaterial(m);
                }
            }
        }
        System.out.println(">> Importación finalizada.");
    }
    
    // Auxiliar para sacar texto de tags XML
    private String getTagValue(String tag, Element element) {
        return element.getElementsByTagName(tag).item(0).getTextContent();
    }
}
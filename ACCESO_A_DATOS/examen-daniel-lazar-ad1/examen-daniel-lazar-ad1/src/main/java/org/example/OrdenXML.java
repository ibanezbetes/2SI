package org.example;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

// Define que este objeto será la raíz del XML <datos_ordenes>
@XmlRootElement(name = "datos_ordenes")
public class OrdenXML {

    private List<Orden> listaOrdenes;

    // Constructor vacío necesario
    public OrdenXML() {}

    // Constructor con lista
    public OrdenXML(List<Orden> listaOrdenes) {
        this.listaOrdenes = listaOrdenes;
    }

    // El nombre que tendrá cada item de la lista en el XML: <orden>
    @XmlElement(name = "orden")
    public List<Orden> getListaOrdenes() {
        return listaOrdenes;
    }

    public void setListaOrdenes(List<Orden> listaOrdenes) {
        this.listaOrdenes = listaOrdenes;
    }
}
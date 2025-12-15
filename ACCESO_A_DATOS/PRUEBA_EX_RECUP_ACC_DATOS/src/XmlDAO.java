import java.io.FileWriter;
import java.sql.*;

import db.ConnectionFactory;

public class XmlDAO {
    public void exportarTabla(String nombreTabla) throws Exception {
        String sql = "SELECT * FROM " + nombreTabla;
        try (Connection cn = ConnectionFactory.getConnection();
             Statement st = cn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            ResultSetMetaData meta = rs.getMetaData();
            int cols = meta.getColumnCount();
            StringBuilder sb = new StringBuilder();
            sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
            sb.append("<tabla nombre=\"").append(nombreTabla).append("\">\n");
            while (rs.next()) {
                sb.append("  <fila>\n");
                for (int i = 1; i <= cols; i++) {
                    String nombreCol = meta.getColumnName(i);
                    String valor = rs.getString(i);
                    if (valor == null) valor = "";
                    sb.append("    <").append(nombreCol).append(">")
                            .append(valor)
                            .append("</").append(nombreCol).append(">\n");
                }
                sb.append("  </fila>\n");
            }
            sb.append("</tabla>");
            try (FileWriter fw = new FileWriter(nombreTabla + ".xml")) {
                fw.write(sb.toString());
            }
            System.out.println("Fichero generado: " + nombreTabla + ".xml");
        }
    }
}
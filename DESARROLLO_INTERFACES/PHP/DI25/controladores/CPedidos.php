<?php 
require_once 'controladores/Controlador.php';
require_once 'vistas/Vista.php';
require_once 'modelos/DAO.php';

class CPedidos extends Controlador {
    private $dao;
    
    public function __construct(){
        $this->dao = new DAO();
    }
    
    public function getVistaPedidosPrincipal($datos=array()){
        Vista::render('vistas/Pedidos/VPedidosPrincipal.php');
    }
    
    public function getVistaListadoPedidos($datos=array()){
        extract($datos);
        $fecha = isset($fecha) ? $fecha : '';
        $estado = isset($estado) ? $estado : '';
        $pagina = isset($pagina) ? (int)$pagina : 1;
        $tamPag = isset($tam_pag) ? (int)$tam_pag : 10;
        
        // Construct filter
        $filtro = "";
        if($fecha != '') $filtro .= " AND fecha = '$fecha'";
        if($estado != '') $filtro .= " AND estado = '$estado'";
        
        // Count totals
        // Nota: Asegurarse que la tabla existe. Si no, esto fallará.
        $sqlCount = "SELECT COUNT(*) as total FROM pedidos WHERE 1=1 $filtro";
        
        // Intento simple de manejar error si tabla no existe (aunque DAO suele hacer die())
        // En un entorno real, verificaríamos existencia antes.
        
        $res = $this->dao->consultar($sqlCount);
        // Si no hay tabla, $res podría ser vacío o error. Asumimos éxito por ahora.
        $totalRegistros = isset($res[0]['total']) ? $res[0]['total'] : 0;
        
        // Pagination
        $offset = ($pagina - 1) * $tamPag;
        
        // Query
        $sql = "SELECT p.idPedido, p.fecha, p.total, p.estado, u.nombre, u.apellido1 
                FROM pedidos p 
                LEFT JOIN usuarios u ON p.idUsuario = u.idUsuario 
                WHERE 1=1 $filtro 
                ORDER BY p.fecha DESC 
                LIMIT $offset, $tamPag";
                
        $pedidos = $this->dao->consultar($sql);
        
        if(count($pedidos) > 0){
            echo '<div class="table-responsive"><table class="table table-sm table-striped table-hover">
                  <thead><tr><th>ID</th><th>Fecha</th><th>Usuario</th><th>Total</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>';
            foreach($pedidos as $p){
                // Formato fecha europea
                $fechaFmt = date("d/m/Y", strtotime($p['fecha']));
                echo '<tr>
                        <td>'.$p['idPedido'].'</td>
                        <td>'.$fechaFmt.'</td>
                        <td>'.$p['nombre'].' '.$p['apellido1'].'</td>
                        <td>'.number_format($p['total'], 2).' €</td>
                        <td>'.$this->badgeEstado($p['estado']).'</td>
                        <td>
                            <button class="btn btn-sm btn-info me-1" onclick="editarPedido('.$p['idPedido'].')">✏️</button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarPedido('.$p['idPedido'].')">❌</button>
                        </td>
                      </tr>';
            }
            echo '</tbody></table></div>';
             
             // Paginación reusable
             Vista::render('vistas/VPaginacion.php', array(
                'totalRegistros' => $totalRegistros,
                'pagActual' => $pagina,
                'tamPag' => $tamPag,
                'funcionCallback' => 'buscarPedidos'
            ));
            
        } else {
            echo '<div class="alert alert-info">No se encontraron pedidos. (Asegúrese de haber ejecutado el script SQL de creación de tablas)</div>';
        }
    }
    
    private function badgeEstado($estado){
        $color = 'secondary';
        switch($estado){
            case 'Pendiente': $color = 'warning'; break;
            case 'Procesado': $color = 'info'; break;
            case 'Enviado': $color = 'primary'; break;
            case 'Entregado': $color = 'success'; break;
        }
        return "<span class='badge bg-$color'>$estado</span>";
    }
    
    public function obtenerPedido($datos=array()){
        extract($datos);
        // Cabecera
        $sql = "SELECT * FROM pedidos WHERE idPedido = $idPedido";
        $pedido = $this->dao->consultar($sql);
        
        if(empty($pedido)){
            echo json_encode(['error' => 'Pedido no encontrado']);
            return;
        }
        
        // Detalles (si existieran)
        // $sqlDet = "SELECT * FROM pedidos_detalles WHERE idPedido = $idPedido";
        // $detalles = $this->dao->consultar($sqlDet);
        
        header('Content-Type: application/json');
        echo json_encode($pedido[0]);
    }
    
    public function crearPedido($datos=array()){
        extract($datos);
        // Validación básica
        if(empty($idUsuario) || empty($fecha)){
             echo '<div class="alert alert-danger">Usuario y Fecha obligatorios</div>';
             return;
        }
        
        // Insertar cabecera
        $sql = "INSERT INTO pedidos (fecha, idUsuario, total, estado) VALUES ('$fecha', $idUsuario, 0, 'Pendiente')";
        $id = $this->dao->insertar($sql);
        
        echo $id > 0 ? '<div class="alert alert-success">Pedido creado (ID: '.$id.')</div>' : '<div class="alert alert-danger">Error creando pedido</div>';
    }
    
    public function actualizarPedido($datos=array()){
        extract($datos);
        // Solo actualizamos estado y fecha por simplicidad en este ejercicio
        if(empty($idPedido)){
             echo '<div class="alert alert-danger">ID Pedido obligatorio</div>';
             return;
        }
        
        $sql = "UPDATE pedidos SET fecha='$fecha', estado='$estado' WHERE idPedido=$idPedido";
        $res = $this->dao->actualizar($sql);
        
         echo $res >= 0 ? '<div class="alert alert-success">Pedido actualizado</div>' : '<div class="alert alert-danger">Error actualizando</div>';
    }
    
    public function eliminarPedido($datos=array()){
        extract($datos);
        $sql = "DELETE FROM pedidos WHERE idPedido=$idPedido";
        $res = $this->dao->borrar($sql);
        echo $res > 0 ? '<div class="alert alert-success">Pedido eliminado</div>' : '<div class="alert alert-danger">Error eliminando</div>';
    }
    
    // Método auxiliar para llenar combos de usuarios
    public function getUsuariosCombo(){
        $sql = "SELECT idUsuario, nombre, apellido1 FROM usuarios WHERE activo='S' ORDER BY nombre";
        $usuarios = $this->dao->consultar($sql);
        header('Content-Type: application/json');
        echo json_encode($usuarios);
    }
}
?>

<?php 
require_once 'controladores/Controlador.php';
require_once 'vistas/Vista.php';
require_once 'modelos/DAO.php';

class CPedidos extends Controlador{
    private $dao;
    
    public function __construct(){
        $this->dao = new DAO();
    }
    
    public function getVistaPedidosPrincipal($datos=array()){
        Vista::render('vistas/Pedidos/VPedidosPrincipal.php');
    }
    
    public function getVistaListadoPedidos($datos=array()){
        extract($datos);
        $usuario = isset($usuario) ? $usuario : '';
        $fecha = isset($fecha) ? $fecha : '';
        $pagina = isset($pagina) ? (int)$pagina : 1;
        $tamPag = isset($tam_pag) ? (int)$tam_pag : 15;
        
        // 1. Count
        $sqlCount = "SELECT COUNT(*) as total FROM pedidos p JOIN usuarios u ON p.idUsuario = u.idUsuario WHERE 1=1";
        $filtro = "";
        if($usuario != '') $filtro .= " AND u.nombre LIKE '%$usuario%'";
        if($fecha != '') $filtro .= " AND p.fecha = '$fecha'";
        $sqlCount .= $filtro;
        
        $res = $this->dao->consultar($sqlCount);
        $totalRegistros = $res[0]['total'];
        
        // 2. Data
        $offset = ($pagina - 1) * $tamPag;
        $sql = "SELECT p.idPedido, p.fecha, p.total, p.estado, u.nombre, u.apellido1 
                FROM pedidos p 
                JOIN usuarios u ON p.idUsuario = u.idUsuario 
                WHERE 1=1";
        $sql .= $filtro;
        $sql .= " ORDER BY p.fecha DESC, p.idPedido DESC";
        $sql .= " LIMIT $offset, $tamPag";
        
        $pedidos = $this->dao->consultar($sql);
        
        if(count($pedidos) > 0){
            echo '<div class="table-responsive"><table class="table table-striped table-hover">
                  <thead><tr><th>ID</th><th>Fecha</th><th>Usuario</th><th>Total</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>';
            foreach($pedidos as $p){
                $estado = ($p['estado']=='P') ? 'Pendiente' : (($p['estado']=='C') ? 'Completado' : $p['estado']);
                echo '<tr>
                        <td>'.$p['idPedido'].'</td>
                        <td>'.$p['fecha'].'</td>
                        <td>'.$p['nombre'].' '.$p['apellido1'].'</td>
                        <td>'.$p['total'].' €</td>
                        <td>'.$estado.'</td>
                        <td>
                            <button class="btn btn-sm btn-primary me-1" onclick="editarPedido('.$p['idPedido'].');">✏️</button>
                            <!-- <button class="btn btn-sm btn-danger" onclick="eliminarPedido('.$p['idPedido'].');">❌</button> -->
                        </td>
                      </tr>';
            }
            echo '</tbody></table></div>';
            
            Vista::render('vistas/VPaginacion.php', array(
                'totalRegistros' => $totalRegistros,
                'pagActual' => $pagina,
                'tamPag' => $tamPag,
                'funcionCallback' => 'buscarPedidos'
            ));
        }else{
            echo '<div class="alert alert-warning">No se encontraron pedidos</div>';
        }
    }
    
    public function obtenerPedido($datos=array()){
        extract($datos);
        // Header
        $sql = "SELECT p.*, u.nombre as usuarioNombre FROM pedidos p JOIN usuarios u ON p.idUsuario = u.idUsuario WHERE idPedido = $idPedido";
        $pedido = $this->dao->consultar($sql);
        
        if(count($pedido) > 0){
            $data = $pedido[0];
            // Details
            $sqlDet = "SELECT d.*, pr.producto FROM pedidos_detalles d JOIN productos pr ON d.idProducto = pr.idProducto WHERE idPedido = $idPedido";
            $data['detalles'] = $this->dao->consultar($sqlDet);
            
            header('Content-Type: application/json');
            echo json_encode($data);
        }else{
            echo json_encode(['error'=>'No encontrado']);
        }
    }
    
    public function crearPedido($datos=array()){
        extract($datos);
        // Expecting: idUsuario, fecha, estado, detalles (JSON String)
        if(empty($idUsuario) || empty($fecha)){
             echo '<div class="alert alert-danger">Usuario y Fecha son obligatorios</div>'; return;
        }
        
        $detallesArray = isset($detalles) ? json_decode($detalles, true) : [];
        if(!is_array($detallesArray)) $detallesArray = [];
        
        // Calculate Total
        $total = 0;
        foreach($detallesArray as $d){
            $total += ($d['cantidad'] * $d['precioUnitario']);
        }
        
        $sql = "INSERT INTO pedidos (idUsuario, fecha, total, estado) VALUES ('$idUsuario', '$fecha', '$total', '$estado')";
        $idPedido = $this->dao->insertar($sql);
        
        if($idPedido > 0){
            foreach($detallesArray as $d){
                $sqlDet = "INSERT INTO pedidos_detalles (idPedido, idProducto, cantidad, precioUnitario) 
                           VALUES ($idPedido, {$d['idProducto']}, {$d['cantidad']}, {$d['precioUnitario']})";
                $this->dao->insertar($sqlDet);
            }
            echo '<div class="alert alert-success">Pedido creado exitosamente (ID: '.$idPedido.')</div>';
        }else{
            echo '<div class="alert alert-danger">Error al crear cabecera de pedido</div>';
        }
    }
    
    // Simplification: Update only updates header or status for now, or re-creates details?
    // For this exercise, I'll limit update to Header info + Status. Details editing is complex (diffing).
    // Prompt says "Crear el módulo de pedidos included los detalles". Editing details is implied but complex.
    // I'll implement a simple Update that updates Header.
    public function actualizarPedido($datos=array()){
        extract($datos);
        
        if(empty($idPedido) || empty($idUsuario) || empty($fecha)){
             echo '<div class="alert alert-danger">Datos incompletos</div>'; return;
        }
        
        $detallesArray = isset($detalles) ? json_decode($detalles, true) : [];
        if(!is_array($detallesArray)) $detallesArray = [];
        
        // Recalculate Total
        $total = 0;
        foreach($detallesArray as $d){
            $total += ($d['cantidad'] * $d['precioUnitario']);
        }
        
        // 1. Update Header
        $sql = "UPDATE pedidos SET fecha='$fecha', estado='$estado', total='$total', idUsuario='$idUsuario' WHERE idPedido=$idPedido";
        $res = $this->dao->actualizar($sql);
        
        if($res >= 0){
             // 2. Replace Details (Delete all and re-insert)
             $this->dao->borrar("DELETE FROM pedidos_detalles WHERE idPedido=$idPedido");
             
             foreach($detallesArray as $d){
                $sqlDet = "INSERT INTO pedidos_detalles (idPedido, idProducto, cantidad, precioUnitario) 
                           VALUES ($idPedido, {$d['idProducto']}, {$d['cantidad']}, {$d['precioUnitario']})";
                $this->dao->insertar($sqlDet);
             }
             
             echo '<div class="alert alert-success">Pedido actualizado exitosamente</div>';
        }else{
             echo '<div class="alert alert-danger">Error al actualizar cabecera</div>';
        }
    }

    public function getUsuariosJSON(){
         $sql = "SELECT idUsuario, nombre, apellido1 FROM usuarios WHERE activo='S' ORDER BY nombre";
         echo json_encode($this->dao->consultar($sql));
    }
    
    public function getProductosJSON(){
         $sql = "SELECT idProducto, producto, precioVenta FROM productos WHERE activo='S' ORDER BY producto";
         echo json_encode($this->dao->consultar($sql));
    }
}
?>

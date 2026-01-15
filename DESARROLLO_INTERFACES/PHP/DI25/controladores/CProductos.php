<?php 
require_once 'controladores/Controlador.php';
require_once 'vistas/Vista.php';
require_once 'modelos/DAO.php';

// Clase Controlador de Productos
class CProductos extends Controlador{
    private $dao;
    
    public function __construct(){
        $this->dao = new DAO();
    }
    
    // Mostrar la vista principal de productos
    public function getVistaProductosPrincipal($datos=array()){
        Vista::render('vistas/Productos/VProductosPrincipal.php');
    }
    
    // Listar productos según filtros de búsqueda
    // Listar productos según filtros de búsqueda con Paginación
    public function getVistaListadoProductos($datos=array()){
        extract($datos);
        $producto = isset($producto) ? $producto : '';
        $pagina = isset($pagina) ? (int)$pagina : 1;
        $tamPag = isset($tam_pag) ? (int)$tam_pag : 15;
        
        // 1. Obtener el TOTAL de registros (sin paginación)
        $sqlCount = "SELECT COUNT(*) as total FROM productos WHERE activo='S'";
        $filtro = "";
        if($producto != '') $filtro .= " AND producto LIKE '%$producto%'";
        $sqlCount .= $filtro;
        
        $res = $this->dao->consultar($sqlCount);
        $totalRegistros = $res[0]['total'];
        
        // 2. Obtener los registros de la página actual
        $offset = ($pagina - 1) * $tamPag;
        
        $sql = "SELECT idProducto, producto, descripcion, stock, precioVenta FROM productos WHERE activo='S'";
        $sql .= $filtro;
        $sql .= " ORDER BY producto";
        $sql .= " LIMIT $offset, $tamPag";
        
        $productos = $this->dao->consultar($sql);
        
        if(count($productos) > 0){
            echo '<div class="table-responsive"><table class="table table-striped table-hover">
                  <thead><tr><th>ID</th><th>Producto</th><th>Descripción</th><th>Stock</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>';
            foreach($productos as $p){
                echo '<tr><td>'.$p['idProducto'].'</td><td>'.$p['producto'].'</td><td>'.$p['descripcion'].'</td>
                      <td>'.$p['stock'].'</td><td>'.$p['precioVenta'].'</td><td>
                      <button class="btn btn-sm btn-primary me-1" onclick="editarProducto('.$p['idProducto'].');">✏️</button>
                      <button class="btn btn-sm btn-danger" onclick="eliminarProducto('.$p['idProducto'].',\''.addslashes($p['producto']).'\');">❌</button>
                      </td></tr>';
            }
            echo '</tbody></table></div>';
            
            // Renderizar la vista de paginación
            Vista::render('vistas/VPaginacion.php', array(
                'totalRegistros' => $totalRegistros,
                'pagActual' => $pagina,
                'tamPag' => $tamPag,
                'funcionCallback' => 'buscarProductos'
            ));
        }else{
            echo '<div class="alert alert-warning">No se encontraron productos</div>';
        }
    }
    
    // Obtener datos de un producto para edición (JSON)
    public function obtenerProducto($datos=array()){
        extract($datos);
        $sql = "SELECT * FROM productos WHERE idProducto = $idProducto";
        $productos = $this->dao->consultar($sql);
        header('Content-Type: application/json');
        echo json_encode(count($productos) > 0 ? $productos[0] : ['error'=>'No encontrado']);
    }
    
    // Crear un nuevo producto en la BD
    public function crearProducto($datos=array()){
        extract($datos);
        if(empty($producto) || !isset($precioVenta)){
            echo '<div class="alert alert-danger">Nombre y precio son obligatorios</div>';
            return;
        }
        $sql = "INSERT INTO productos (producto, descripcion, stock, precioVenta, activo) 
                VALUES ('$producto','$descripcion','$stock','$precioVenta','S')";
        $id = $this->dao->insertar($sql);
        echo $id > 0 ? '<div class="alert alert-success">Producto creado exitosamente</div>' : '<div class="alert alert-danger">Error al crear</div>';
    }
    
    // Actualizar datos de un producto
    public function actualizarProducto($datos=array()){
        extract($datos);
        if(empty($idProducto) || empty($producto) || !isset($precioVenta)){
            echo '<div class="alert alert-danger">Campos obligatorios incompletos</div>';
            return;
        }
        $sql = "UPDATE productos SET producto='$producto', descripcion='$descripcion', stock='$stock', precioVenta='$precioVenta' WHERE idProducto=$idProducto";
        $res = $this->dao->actualizar($sql);
        echo $res >= 0 ? '<div class="alert alert-success">Producto actualizado exitosamente</div>' : '<div class="alert alert-danger">Error al actualizar</div>';
    }
    
    // Eliminar producto (baja lógica)
    public function eliminarProducto($datos=array()){
        extract($datos);
        $sql = "UPDATE productos SET activo='N' WHERE idProducto=$idProducto";
        $res = $this->dao->actualizar($sql);
        echo $res > 0 ? '<div class="alert alert-success">Producto eliminado exitosamente</div>' : '<div class="alert alert-danger">Error al eliminar</div>';
    }
}
?>

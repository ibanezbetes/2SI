<?php 
    require_once 'controladores/Controlador.php';
    require_once 'vistas/Vista.php';
    require_once 'modelos/DAO.php';

    class CProductos extends Controlador{
        private $dao;
        
        public function __construct() {
            $this->dao = new DAO();
        }
        
        public function getVistaProductosPrincipal($datos=array()) {
            Vista::render('vistas/Productos/VProductosPrincipal.php');
        }
        
        public function getVistaListadoProductos($datos=array()) {
            extract($datos);
            $producto = isset($producto) ? $producto : '';
            
            $sql = "SELECT idProducto, producto, descripcion, stock, precioVenta, activo FROM productos WHERE activo='S'";
            if($producto != ''){
                $sql .= " AND producto LIKE '%$producto%'";
            }
            $sql .= " ORDER BY producto";
            try{
                $productos = $this->dao->consultar($sql);
                if(count($productos) > 0){
                    echo '<div class="table-responsive">\n<table class="table table-striped table-hover">\n<thead class="table-dark">\n<tr>\n<th>ID</th><th>Producto</th><th>Descripcion</th><th>Stock</th><th>Precio</th><th>Acciones</th>\n</tr>\n</thead>\n<tbody>';
                    foreach($productos as $p){
                        echo '<tr>';
                        echo '<td>'.$p['idProducto'].'</td>';
                        echo '<td>'.$p['producto'].'</td>';
                        echo '<td>'.$p['descripcion'].'</td>';
                        echo '<td>'.$p['stock'].'</td>';
                        echo '<td>'.$p['precioVenta'].'</td>';
                        echo '<td>';
                        echo '<button class="btn btn-sm btn-primary me-1" onclick="editarProducto('.$p['idProducto'].');">✏️</button>';
                        echo '<button class="btn btn-sm btn-danger" onclick="eliminarProducto('.$p['idProducto'].', \''.addslashes($p['producto']).'\');">❌</button>';
                        echo '</td>';
                        echo '</tr>';
                    }
                    echo '</tbody></table></div>';
                }else{
                    echo '<div class="alert alert-warning">No se encontraron productos.</div>';
                }
            }catch(Exception $e){
                echo '<div class="alert alert-danger">Error en la consulta: '.$e->getMessage().'</div>';
            }
        }
        
        public function obtenerProducto($datos=array()){
            extract($datos);
            $idProducto = isset($idProducto) ? intval($idProducto) : 0;
            if($idProducto <= 0){
                header('Content-Type: application/json');
                echo json_encode(['error'=>'ID de producto requerido']);
                return;
            }
            try{
                $sql = "SELECT idProducto, producto, descripcion, idCategoria, stock, precioVenta, activo FROM productos WHERE idProducto = $idProducto";
                $res = $this->dao->consultar($sql);
                header('Content-Type: application/json');
                if(count($res) > 0) echo json_encode($res[0]);
                else echo json_encode(['error'=>'Producto no encontrado']);
            }catch(Exception $e){
                header('Content-Type: application/json');
                echo json_encode(['error'=>'Error en la consulta: '.$e->getMessage()]);
            }
        }

        public function getVistaProductoForm($datos=array()){
            $productoData = array();
            if(isset($datos['idProducto']) && $datos['idProducto']!=''){
                $id = intval($datos['idProducto']);
                $sql = "SELECT idProducto, producto, descripcion, idCategoria, stock, precioVenta, activo FROM productos WHERE idProducto = $id";
                $res = $this->dao->consultar($sql);
                if(count($res)>0) $productoData = $res[0];
            }
            $datosVista = array('producto' => $productoData);
            Vista::render('vistas/Productos/VProductoForm.php', $datosVista);
        }
        
        public function crearProducto($datos=array()){
            extract($datos);
            if(empty($producto) || !isset($precioVenta)){
                echo '<div class="alert alert-danger">Nombre y precio son obligatorios</div>';
                return;
            }
            try{
                $sql = "INSERT INTO productos (producto, descripcion, idCategoria, stock, precioCompra, precioVenta, stockMinimo, activo) VALUES ('".$producto."', '".$descripcion."', '".$idCategoria."', '".$stock."', '".$precioCompra."', '".$precioVenta."', '".$stockMinimo."', 'S')";
                $id = $this->dao->insertar($sql);
                if($id>0) echo '<div class="alert alert-success">Producto creado con ID: '.$id.'</div>';
                else echo '<div class="alert alert-danger">Error al crear producto</div>';
            }catch(Exception $e){
                echo '<div class="alert alert-danger">Error en la consulta: '.$e->getMessage().'</div>';
            }
        }
        
        public function actualizarProducto($datos=array()){
            extract($datos);
            if(empty($idProducto) || empty($producto) || !isset($precioVenta)){
                echo '<div class="alert alert-danger">Campos obligatorios faltan</div>';
                return;
            }
            try{
                $sql = "UPDATE productos SET producto='$producto', descripcion='$descripcion', idCategoria='$idCategoria', stock='$stock', precioVenta='$precioVenta' WHERE idProducto = $idProducto";
                $res = $this->dao->actualizar($sql);
                if($res>=0) echo '<div class="alert alert-success">Producto actualizado</div>';
                else echo '<div class="alert alert-danger">Error al actualizar producto</div>';
            }catch(Exception $e){
                echo '<div class="alert alert-danger">Error en la consulta: '.$e->getMessage().'</div>';
            }
        }
        
        public function eliminarProducto($datos=array()){
            extract($datos);
            if(empty($idProducto)){
                echo '<div class="alert alert-danger">ID de producto requerido</div>';
                return;
            }
            try{
                $sql = "UPDATE productos SET activo='N' WHERE idProducto = $idProducto";
                $res = $this->dao->actualizar($sql);
                if($res>0) echo '<div class="alert alert-success">Producto eliminado</div>';
                else echo '<div class="alert alert-warning">No se pudo eliminar el producto</div>';
            }catch(Exception $e){
                echo '<div class="alert alert-danger">Error en la consulta: '.$e->getMessage().'</div>';
            }
        }
    }
?>
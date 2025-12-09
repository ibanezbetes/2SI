<?php 
require_once 'controladores/Controlador.php';
require_once 'vistas/Vista.php';
require_once 'modelos/DAO.php';

// Clase Controlador de Usuarios
// Hereda de la clase base Controlador
class CUsuarios extends Controlador{
    private $dao;
    
    public function __construct(){
        $this->dao = new DAO();
    }
    
    // Método para mostrar la vista principal de gestión de usuarios
    public function getVistaUsuariosPrincipal($datos=array()){
        Vista::render('vistas/Usuarios/VUsuariosPrincipal.php');
    }
    
    // Método para buscar y listar usuarios (se llama por AJAX)
    public function getVistaListadoUsuarios($datos=array()){
        extract($datos);
        $nombre = isset($nombre) ? $nombre : '';
        $email = isset($email) ? $email : '';
        $pagina = isset($pagina) ? (int)$pagina : 1;
        $tamPag = isset($tam_pag) ? (int)$tam_pag : 15;
        
        // 1. Obtener el TOTAL de registros (sin paginación)
        // Construir la consulta SQL para contar
        $sqlCount = "SELECT COUNT(*) as total FROM usuarios WHERE activo='S'";
        
        $filtro = "";
        if($nombre != '') $filtro .= " AND nombre LIKE '%$nombre%'";
        if($email != '') $filtro .= " AND mail LIKE '%$email%'";
        
        $sqlCount .= $filtro;
        
        $res = $this->dao->consultar($sqlCount);
        $totalRegistros = $res[0]['total'];
        
        // 2. Obtener los registros de la página actual
        $offset = ($pagina - 1) * $tamPag;
        
        $sql = "SELECT idUsuario, nombre, apellido1, apellido2, mail, movil, activo FROM usuarios WHERE activo='S'";
        $sql .= $filtro;
        $sql .= " ORDER BY nombre, apellido1";
        $sql .= " LIMIT $offset, $tamPag";
        
        $usuarios = $this->dao->consultar($sql);
        
        if(count($usuarios) > 0){
            echo '<div class="table-responsive"><table class="table table-striped table-hover">
                  <thead><tr><th>Nombre</th><th>Apellidos</th><th>Email</th><th>Móvil</th><th>Acciones</th></tr></thead><tbody>';
            foreach($usuarios as $u){
                echo '<tr><td>'.$u['nombre'].'</td>
                      <td>'.$u['apellido1'].' '.($u['apellido2'] ?? '').'</td><td>'.$u['mail'].'</td>
                      <td>'.$u['movil'].'</td><td>
                      <button class="btn btn-sm btn-primary me-1" onclick="editarUsuario('.$u['idUsuario'].');">✏️</button>
                      <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('.$u['idUsuario'].',\''.$u['nombre'].'\');">❌</button>
                      </td></tr>';
            }
            echo '</tbody></table></div>';
            
            // Renderizar la vista de paginación
            Vista::render('vistas/VPaginador.php', array(
                'totalRegistros' => $totalRegistros,
                'pagActual' => $pagina,
                'tamPag' => $tamPag
            ));
            
        }else{
            echo '<div class="alert alert-warning">No se encontraron usuarios</div>';
        }
    }
    
    // Obtener datos de un usuario específico (para editar) y devolverlos como JSON
    public function obtenerUsuario($datos=array()){
        extract($datos);
        $sql = "SELECT * FROM usuarios WHERE idUsuario = $idUsuario";
        $usuarios = $this->dao->consultar($sql);
        header('Content-Type: application/json');
        echo json_encode(count($usuarios) > 0 ? $usuarios[0] : ['error'=>'No encontrado']);
    }
    
    // Insertar un nuevo usuario en la base de datos
    public function crearUsuario($datos=array()){
        extract($datos);
        if(empty($nombre) || empty($apellido1) || empty($mail) || empty($login) || empty($pass)){
            echo '<div class="alert alert-danger">Campos obligatorios incompletos</div>';
            return;
        }
        // Encriptar contraseña con MD5 (Nota: En producción usar password_hash)
        $passEncriptada = md5($pass);
        $fechaAlta = date('Y-m-d');
        $sql = "INSERT INTO usuarios (nombre, apellido1, apellido2, mail, movil, login, pass, sexo, fechaAlta, activo) 
                VALUES ('$nombre','$apellido1','$apellido2','$mail','$movil','$login','$passEncriptada','$sexo','$fechaAlta','S')";
        $id = $this->dao->insertar($sql);
        echo $id > 0 ? '<div class="alert alert-success">Usuario creado exitosamente</div>' : '<div class="alert alert-danger">Error al crear</div>';
    }
    
    // Actualizar los datos de un usuario existente
    public function actualizarUsuario($datos=array()){
        extract($datos);
        if(empty($idUsuario) || empty($nombre) || empty($apellido1) || empty($mail) || empty($login)){
            echo '<div class="alert alert-danger">Campos obligatorios incompletos</div>';
            return;
        }
        $sql = "UPDATE usuarios SET nombre='$nombre', apellido1='$apellido1', apellido2='$apellido2', 
                mail='$mail', movil='$movil', login='$login', sexo='$sexo' WHERE idUsuario=$idUsuario";
        $res = $this->dao->actualizar($sql);
        echo $res >= 0 ? '<div class="alert alert-success">Usuario actualizado exitosamente</div>' : '<div class="alert alert-danger">Error al actualizar</div>';
    }
    
    // Eliminado lógico de un usuario (poner activo='N')
    public function eliminarUsuario($datos=array()){
        extract($datos);
        
        // Verificar si es admin
        $sqlCheck = "SELECT login FROM usuarios WHERE idUsuario = $idUsuario";
        $usuario = $this->dao->consultar($sqlCheck);
        
        if (!empty($usuario) && $usuario[0]['login'] === 'admin') {
            echo '<div class="alert alert-danger">No se puede eliminar al administrador principal</div>';
            return;
        }

        $sql = "UPDATE usuarios SET activo='N' WHERE idUsuario=$idUsuario";
        $res = $this->dao->actualizar($sql);
        echo $res > 0 ? '<div class="alert alert-success">Usuario eliminado exitosamente</div>' : '<div class="alert alert-danger">Error al eliminar</div>';
    }
}
?>

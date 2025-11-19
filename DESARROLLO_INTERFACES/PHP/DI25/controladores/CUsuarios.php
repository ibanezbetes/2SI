<?php 
require_once 'controladores/Controlador.php';
require_once 'vistas/Vista.php';
require_once 'modelos/DAO.php';

class CUsuarios extends Controlador{
    private $dao;
    
    public function __construct(){
        $this->dao = new DAO();
    }
    
    public function getVistaUsuariosPrincipal($datos=array()){
        Vista::render('vistas/Usuarios/VUsuariosPrincipal.php');
    }
    
    public function getVistaListadoUsuarios($datos=array()){
        extract($datos);
        $nombre = isset($nombre) ? $nombre : '';
        $email = isset($email) ? $email : '';
        
        $sql = "SELECT idUsuario, nombre, apellido1, apellido2, mail, movil, activo FROM usuarios WHERE activo='S'";
        if($nombre != '') $sql .= " AND nombre LIKE '%$nombre%'";
        if($email != '') $sql .= " AND mail LIKE '%$email%'";
        $sql .= " ORDER BY nombre, apellido1";
        
        $usuarios = $this->dao->consultar($sql);
        
        if(count($usuarios) > 0){
            echo '<div class="table-responsive"><table class="table table-striped table-hover">
                  <thead><tr><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Email</th><th>Móvil</th><th>Acciones</th></tr></thead><tbody>';
            foreach($usuarios as $u){
                echo '<tr><td>'.$u['idUsuario'].'</td><td>'.$u['nombre'].'</td>
                      <td>'.$u['apellido1'].' '.($u['apellido2'] ?? '').'</td><td>'.$u['mail'].'</td>
                      <td>'.$u['movil'].'</td><td>
                      <button class="btn btn-sm btn-primary me-1" onclick="editarUsuario('.$u['idUsuario'].');">✏️</button>
                      <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('.$u['idUsuario'].',\''.$u['nombre'].'\');">❌</button>
                      </td></tr>';
            }
            echo '</tbody></table></div>';
        }else{
            echo '<div class="alert alert-warning">No se encontraron usuarios</div>';
        }
    }
    
    public function obtenerUsuario($datos=array()){
        extract($datos);
        $sql = "SELECT * FROM usuarios WHERE idUsuario = $idUsuario";
        $usuarios = $this->dao->consultar($sql);
        header('Content-Type: application/json');
        echo json_encode(count($usuarios) > 0 ? $usuarios[0] : ['error'=>'No encontrado']);
    }
    
    public function crearUsuario($datos=array()){
        extract($datos);
        if(empty($nombre) || empty($apellido1) || empty($mail) || empty($login) || empty($pass)){
            echo '<div class="alert alert-danger">Campos obligatorios incompletos</div>';
            return;
        }
        $passEncriptada = md5($pass);
        $fechaAlta = date('Y-m-d');
        $sql = "INSERT INTO usuarios (nombre, apellido1, apellido2, mail, movil, login, pass, sexo, fechaAlta, activo) 
                VALUES ('$nombre','$apellido1','$apellido2','$mail','$movil','$login','$passEncriptada','$sexo','$fechaAlta','S')";
        $id = $this->dao->insertar($sql);
        echo $id > 0 ? '<div class="alert alert-success">Usuario creado exitosamente</div>' : '<div class="alert alert-danger">Error al crear</div>';
    }
    
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
    
    public function eliminarUsuario($datos=array()){
        extract($datos);
        $sql = "UPDATE usuarios SET activo='N' WHERE idUsuario=$idUsuario";
        $res = $this->dao->actualizar($sql);
        echo $res > 0 ? '<div class="alert alert-success">Usuario eliminado exitosamente</div>' : '<div class="alert alert-danger">Error al eliminar</div>';
    }
}
?>

<?php 
    require_once 'controladores/Controlador.php';
    require_once 'vistas/Vista.php';
    require_once 'modelos/DAO.php';

    class CUsuarios extends Controlador{
        private $dao;
        
        public function __construct() {
            $this->dao = new DAO();
        }
        
        public function getVistaUsuariosPrincipal($datos=array()) {
            Vista::render('vistas/Usuarios/VUsuariosPrincipal.php');
        }
        
        public function getVistaListadoUsuarios($datos=array()) {
            extract($datos);
            $nombre = isset($nombre) ? $nombre : '';
            $email = isset($email) ? $email : '';
            
            $sql = "SELECT idUsuario, nombre, apellido1, apellido2, mail, movil, activo 
                    FROM usuarios WHERE activo='S'";
            
            if($nombre != '') {
                $sql .= " AND nombre LIKE '%$nombre%'";
            }
            
            if($email != '') {
                $sql .= " AND mail LIKE '%$email%'";
            }
            
            $sql .= " ORDER BY nombre, apellido1";
            
            try {
                $usuarios = $this->dao->consultar($sql);
                
                // Crear tabla HTML directamente
                if(count($usuarios) > 0) {
                    echo '<div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead class="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Email</th>
                                        <th>Móvil</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>';
                    
                    foreach($usuarios as $usuario) {
                        echo '<tr>
                                <td>' . $usuario['idUsuario'] . '</td>
                                <td>' . $usuario['nombre'] . '</td>
                                <td>' . $usuario['apellido1'] . ' ' . ($usuario['apellido2'] ?? '') . '</td>
                                <td>' . $usuario['mail'] . '</td>
                                <td>' . $usuario['movil'] . '</td>
                                <td><span class="badge bg-success">Activo</span></td>
                                <td>
                                    <button class="btn btn-sm btn-primary me-1" onclick="editarUsuario(' . $usuario['idUsuario'] . ');" title="Editar">
                                        ✏️
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(' . $usuario['idUsuario'] . ', \'' . $usuario['nombre'] . '\');" title="Eliminar">
                                        ❌
                                    </button>
                                </td>
                              </tr>';
                    }
                    
                    echo '</tbody>
                          </table>
                          </div>
                          <div class="alert alert-info">Se encontraron ' . count($usuarios) . ' usuario(s).</div>';
                } else {
                    echo '<div class="alert alert-warning">No se encontraron usuarios con los criterios especificados.</div>';
                }
                
            } catch (Exception $e) {
                echo '<div class="alert alert-danger">Error en la consulta: ' . $e->getMessage() . '</div>';
            }
        }
        
        public function buscarUsuarios($datos=array()) {
            extract($datos);
            $nombre = isset($nombre) ? $nombre : '';
            $email = isset($email) ? $email : '';
            
            $sql = "SELECT idUsuario, nombre, apellido1, apellido2, mail, movil, activo 
                    FROM usuarios WHERE activo='S'";
            
            if($nombre != '') {
                $sql .= " AND nombre LIKE '%$nombre%'";
            }
            
            if($email != '') {
                $sql .= " AND mail LIKE '%$email%'";
            }
            
            $sql .= " ORDER BY nombre, apellido1";
            
            try {
                $usuarios = $this->dao->consultar($sql);
                
                // Crear tabla HTML directamente
                if(count($usuarios) > 0) {
                    echo '<div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead class="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Email</th>
                                        <th>Móvil</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>';
                    
                    foreach($usuarios as $usuario) {
                        echo '<tr>
                                <td>' . $usuario['idUsuario'] . '</td>
                                <td>' . $usuario['nombre'] . '</td>
                                <td>' . $usuario['apellido1'] . ' ' . ($usuario['apellido2'] ?? '') . '</td>
                                <td>' . $usuario['mail'] . '</td>
                                <td>' . $usuario['movil'] . '</td>
                                <td><span class="badge bg-success">Activo</span></td>
                                <td>
                                    <button class="btn btn-sm btn-primary me-1" onclick="editarUsuario(' . $usuario['idUsuario'] . ');" title="Editar">
                                        ✏️
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(' . $usuario['idUsuario'] . ', \'' . $usuario['nombre'] . '\');" title="Eliminar">
                                        ❌
                                    </button>
                                </td>
                              </tr>';
                    }
                    
                    echo '</tbody>
                          </table>
                          </div>
                          <div class="alert alert-info">Se encontraron ' . count($usuarios) . ' usuario(s).</div>';
                } else {
                    echo '<div class="alert alert-warning">No se encontraron usuarios con los criterios especificados.</div>';
                }
                
            } catch (Exception $e) {
                echo '<div class="alert alert-danger">Error en la consulta: ' . $e->getMessage() . '</div>';
            }
        }
        
        public function obtenerUsuario($datos=array()) {
            extract($datos);
            $idUsuario = isset($idUsuario) ? $idUsuario : '';
            
            if($idUsuario == '') {
                header('Content-Type: application/json');
                echo json_encode(['error' => 'ID de usuario requerido']);
                return;
            }
            
            try {
                $sql = "SELECT idUsuario, nombre, apellido1, apellido2, mail, movil, login, sexo, activo 
                        FROM usuarios WHERE idUsuario = $idUsuario";
                $usuarios = $this->dao->consultar($sql);
                
                header('Content-Type: application/json');
                if(count($usuarios) > 0) {
                    echo json_encode($usuarios[0]);
                } else {
                    echo json_encode(['error' => 'Usuario no encontrado']);
                }
            } catch (Exception $e) {
                header('Content-Type: application/json');
                echo json_encode(['error' => 'Error en la consulta: ' . $e->getMessage()]);
            }
        }

        public function getVistaUsuarioForm($datos=array()){
            $usuarioData = array();
            if(isset($datos['idUsuario']) && $datos['idUsuario']!=''){
                $id = intval($datos['idUsuario']);
                $sql = "SELECT idUsuario, nombre, apellido1, apellido2, mail, movil, login, sexo, activo FROM usuarios WHERE idUsuario = $id";
                $res = $this->dao->consultar($sql);
                if(count($res)>0) $usuarioData = $res[0];
            }
            // Pasar datos a la vista como variable $datos para que la vista pueda usarla
            $datosVista = array('usuario' => $usuarioData);
            Vista::render('vistas/Usuarios/VUsuarioForm.php', $datosVista);
        }
        
        public function crearUsuario($datos=array()) {
            extract($datos);
            
            // Validar campos requeridos
            if(empty($nombre) || empty($apellido1) || empty($mail) || empty($login) || empty($pass)) {
                echo '<div class="alert alert-danger">Todos los campos marcados como requeridos deben completarse</div>';
                return;
            }
            
            // Verificar si el login ya existe
            $sqlCheck = "SELECT COUNT(*) as total FROM usuarios WHERE login = '$login' AND activo='S'";
            $resultado = $this->dao->consultar($sqlCheck);
            if($resultado[0]['total'] > 0) {
                echo '<div class="alert alert-danger">El login ingresado ya está en uso. Por favor, elija otro.</div>';
                return;
            }
            
            try {
                // Encriptar contraseña (MD5 como en los datos existentes)
                $passEncriptada = md5($pass);
                $fechaAlta = date('Y-m-d');
                
                $sql = "INSERT INTO usuarios (nombre, apellido1, apellido2, mail, movil, login, pass, sexo, fechaAlta, activo) 
                        VALUES ('$nombre', '$apellido1', '$apellido2', '$mail', '$movil', '$login', '$passEncriptada', '$sexo', '$fechaAlta', 'S')";
                
                $resultado = $this->dao->insertar($sql);
                
                if($resultado > 0) {
                    echo '<div class="alert alert-success">Usuario creado exitosamente con ID: ' . $resultado . '</div>';
                } else {
                    echo '<div class="alert alert-danger">Error al crear el usuario</div>';
                }
                
            } catch (Exception $e) {
                echo '<div class="alert alert-danger">Error en la consulta: ' . $e->getMessage() . '</div>';
            }
        }
        
        public function actualizarUsuario($datos=array()) {
            extract($datos);
            
            // Validar campos requeridos
            if(empty($idUsuario) || empty($nombre) || empty($apellido1) || empty($mail) || empty($login)) {
                echo '<div class="alert alert-danger">Todos los campos marcados como requeridos deben completarse</div>';
                return;
            }
            
            // Verificar si el login ya existe (excluyendo el usuario actual)
            $sqlCheck = "SELECT COUNT(*) as total FROM usuarios WHERE login = '$login' AND idUsuario != $idUsuario AND activo='S'";
            $resultado = $this->dao->consultar($sqlCheck);
            if($resultado[0]['total'] > 0) {
                echo '<div class="alert alert-danger">El login ingresado ya está en uso. Por favor, elija otro.</div>';
                return;
            }
            
            try {
                $sql = "UPDATE usuarios SET 
                        nombre = '$nombre',
                        apellido1 = '$apellido1',
                        apellido2 = '$apellido2',
                        mail = '$mail',
                        movil = '$movil',
                        login = '$login',
                        sexo = '$sexo'
                        WHERE idUsuario = $idUsuario";
                
                $resultado = $this->dao->actualizar($sql);
                
                if($resultado >= 0) {
                    echo '<div class="alert alert-success">Usuario actualizado exitosamente</div>';
                } else {
                    echo '<div class="alert alert-danger">Error al actualizar el usuario</div>';
                }
                
            } catch (Exception $e) {
                echo '<div class="alert alert-danger">Error en la consulta: ' . $e->getMessage() . '</div>';
            }
        }
        
        public function verificarLogin($datos=array()) {
            extract($datos);
            $login = isset($login) ? $login : '';
            $idUsuario = isset($idUsuario) ? $idUsuario : null;
            
            if($login == '') {
                header('Content-Type: application/json');
                echo json_encode(['disponible' => false, 'mensaje' => 'Login vacío']);
                return;
            }
            
            try {
                // Si es edición, excluir el usuario actual de la búsqueda
                if($idUsuario) {
                    $sql = "SELECT COUNT(*) as total FROM usuarios WHERE login = '$login' AND idUsuario != $idUsuario AND activo='S'";
                } else {
                    $sql = "SELECT COUNT(*) as total FROM usuarios WHERE login = '$login' AND activo='S'";
                }
                
                $resultado = $this->dao->consultar($sql);
                $disponible = ($resultado[0]['total'] == 0);
                
                header('Content-Type: application/json');
                echo json_encode([
                    'disponible' => $disponible,
                    'mensaje' => $disponible ? 'Login disponible' : 'Login ya en uso'
                ]);
                
            } catch (Exception $e) {
                header('Content-Type: application/json');
                echo json_encode(['disponible' => false, 'mensaje' => 'Error al verificar login']);
            }
        }
        
        public function eliminarUsuario($datos=array()) {
            extract($datos);
            
            if(empty($idUsuario)) {
                echo '<div class="alert alert-danger">ID de usuario requerido para eliminar</div>';
                return;
            }
            
            try {
                // En lugar de eliminar físicamente, cambiar el estado a inactivo
                $sql = "UPDATE usuarios SET activo = 'N' WHERE idUsuario = $idUsuario";
                
                $resultado = $this->dao->actualizar($sql);
                
                if($resultado > 0) {
                    echo '<div class="alert alert-success">Usuario eliminado exitosamente</div>';
                } else {
                    echo '<div class="alert alert-warning">No se pudo eliminar el usuario o ya estaba inactivo</div>';
                }
                
            } catch (Exception $e) {
                echo '<div class="alert alert-danger">Error en la consulta: ' . $e->getMessage() . '</div>';
            }
        }

    } //FIN class CUsuarios

?>
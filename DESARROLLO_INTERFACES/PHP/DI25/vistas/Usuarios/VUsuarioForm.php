<?php
    // Si se pasa $usuario en $datos, usarlo para rellenar los campos (editar)
    // Comprobar si vienen datos de un usuario para editar
    // Si $datos['usuario'] existe, rellenamos las variables con sus valores
    $u = array();
    if(isset($datos) && isset($datos['usuario']) && is_array($datos['usuario'])){
        $u = $datos['usuario'];
    }

    // Inicializar variables con valores del usuario o vacíos si es nuevo
    $id = isset($u['idUsuario']) ? $u['idUsuario'] : '';
    $nombre = isset($u['nombre']) ? $u['nombre'] : '';
    $apellido1 = isset($u['apellido1']) ? $u['apellido1'] : '';
    $apellido2 = isset($u['apellido2']) ? $u['apellido2'] : '';
    $mail = isset($u['mail']) ? $u['mail'] : '';
    $movil = isset($u['movil']) ? $u['movil'] : '';
    $login = isset($u['login']) ? $u['login'] : '';
    $sexo = isset($u['sexo']) ? $u['sexo'] : 'H';

    echo '<form id="formUsuario">';
    if($id != '') echo '<input type="hidden" name="idUsuario" id="idUsuario" value="'.$id.'">';
    echo '    <div class="mb-3">
                <label for="nombreUsuario" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombreUsuario" name="nombre" value="'.$nombre.'" required>
            </div>
            <div class="mb-3">
                <label for="apellido1Usuario" class="form-label">Primer Apellido</label>
                <input type="text" class="form-control" id="apellido1Usuario" name="apellido1" value="'.$apellido1.'" required>
            </div>
            <div class="mb-3">
                <label for="apellido2Usuario" class="form-label">Segundo Apellido</label>
                <input type="text" class="form-control" id="apellido2Usuario" name="apellido2" value="'.$apellido2.'">
            </div>
            <div class="mb-3">
                <label for="mailUsuario" class="form-label">Email</label>
                <input type="email" class="form-control" id="mailUsuario" name="mail" value="'.$mail.'" required>
            </div>
            <div class="mb-3">
                <label for="movilUsuario" class="form-label">Móvil</label>
                <input type="text" class="form-control" id="movilUsuario" name="movil" value="'.$movil.'">
            </div>
            <div class="mb-3">
                <label for="loginUsuario" class="form-label">Login</label>
                <input type="text" class="form-control" id="loginUsuario" name="login" value="'.$login.'" required>
            </div>
            <div class="mb-3">
                <label for="sexoUsuario" class="form-label">Sexo</label>
                <select class="form-control" id="sexoUsuario" name="sexo">
                    <option value="H" '.($sexo==='H'?'selected':'').'>Hombre</option>
                    <option value="M" '.($sexo==='M'?'selected':'').'>Mujer</option>
                </select>
            </div>';

    // Mostrar botones diferentes según si es creación o edición
    if($id==''){
        echo '    <div class="d-grid gap-2">
                    <button type="button" class="btn btn-primary" onclick="guardarUsuario();">💾 Guardar Usuario</button>
                    <button type="button" class="btn btn-secondary" onclick="cancelarFormulario();">❌ Cancelar</button>
                </div>';
    }else{
        echo '    <div class="d-grid gap-2">
                    <button type="button" class="btn btn-primary" onclick="actualizarUsuario();">✏️ Actualizar Usuario</button>
                    <button type="button" class="btn btn-secondary" onclick="cancelarFormulario();">❌ Cancelar</button>
                </div>';
    }

    echo '</form>';
?>
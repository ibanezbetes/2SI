<?php 
session_start(); 
$usuario='';
$pass='';
// Extraer las variables del formulario (POST) a variables locales ($usuario, $pass)
extract($_POST);
$msj='';

// Validar que los campos no estén vacíos
if($usuario=='' || $pass==''){
    $msj='Debes completar los campos.';
}else{
    // Comprobar credenciales hardcodeadas: usuario 'javier' y contraseña '123')
    // En una aplicación real, esto se comprobaría contra la base de datos
    if($usuario=='javier' && $pass=='123'){
        // Guardar el usuario en la sesión y redirigir al index
        $_SESSION['login']=$usuario;
        header('Location: index.php'); 
        exit();
    }else{
        $msj='Datos incorrectos.';
    }
}
?>
<!doctype html>
<html lang="es" class="login-page">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Login di25</title>
        <link rel="stylesheet" href="librerias/bootstrap-5.3.8-dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/estilos.css">
        <script src="librerias/bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body class="d-flex align-items-center">
    <form class="formulario" id="formularioLogin" method="post" action="login.php" novalidate>
            <h1 class="h3 mb-3 fw-normal">Identificate...</h1>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" 
                    name="usuario" id="usuario" placeholder="a">
                <label for="usuario">Usuario</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" 
                    name="pass" id="pass" placeholder="a">
                <label for="pass">Contraseña</label>
            </div>

            <span id="msj" class="msj"><?php echo $msj; ?></span>
            <button class="btn btn-primary w-100 py-2" type="submit">Acceder</button>

        </form>

        <script>
            // Validación del lado del cliente con JavaScript
            document.getElementById('formularioLogin').addEventListener('submit', function(e){
                const usuario = document.getElementById('usuario').value.trim();
                const pass = document.getElementById('pass').value.trim();
                const msjEl = document.getElementById('msj');
                msjEl.textContent = '';
                if(usuario === '' || pass === ''){
                    e.preventDefault();
                    msjEl.textContent = 'Debes completar los campos antes de enviar.';
                    msjEl.classList.add('fw-bold');
                    return false;
                }
                return true;
            });
        </script>


    </body>
</html>
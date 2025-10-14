<?php session_start(); 
    $usuario='';
    $pass='';
    extract($_POST);
    $msj='';
    //var_dump($_POST);
    if($usuario=='' || $pass==''){
        $msj='Debes completar los campos.';
    }else{
        if($usuario=='javier' && $pass='123'){
            //saltar a esta página (no puede haber pintado nada antes)
            $_SESSION['login']= 
            header('Location: index.php'); 
        }else{
            $msj='Datos incorrectos.';

        }
    }
?>
<!doctype html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Login di25</title>
        <link rel="stylesheet" href="librerias/bootstrap-5.3.8-dist/css/bootstrap.min.css">
        <script src="librerias/bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js"></script>
        <style>
            html, body { height: 100%; }
            .formulario { max-width: 330px; padding: 1rem; margin: auto !important; width: 100% !important;}
            .msj { color: red; }
        </style>
    </head>
    <body class="d-flex align-items-center bg-body-tertiary">
        <form class="formulario" id="formularioLogin" method="post" action="login.php">
            <h1 class="h3 mb-3 fw-normal">Identificate...</h1>

            <div class="form-floating">
                <input type="text" class="form-control input-sm" 
                    name="usuario" id="usuario" placeholder="Usuario">
                <label for="usuario">Usuario</label>
            </div><br>
            <div class="form-floating">
                <input type="password" class="form-control input-sm" 
                    name="pass" id="pass" placeholder="Password">
                <label for="pass">Contraseña</label>
            </div><br><br>

            <span id="msj" class="msj"><?php echo $msj; ?></span>
            <button class="btn btn-primary w-100 py-2" type="submit">Acceder</button>

        </form>


    </body>
</html>


</html>

<!--<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .login-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 100%;
            overflow: hidden;
        }
        
        .login-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        
        .login-body {
            padding: 2rem;
        }
        
        .btn-login {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 5px;
        }
        
        .btn-login:hover {
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <i class="fas fa-user-circle fa-3x mb-3"></i>
                <h3>Iniciar Sesión</h3>
            </div>
            
            <div class="login-body">
                <form id="loginForm">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="tu@email.com" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="password" placeholder="Tu contraseña" required>
                    </div>
                    
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="rememberMe">
                        <label class="form-check-label" for="rememberMe">
                            Recordarme
                        </label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-login w-100 mb-3">
                        Iniciar Sesión
                    </button>
                    
                    <div class="text-center">
                        <a href="#" class="text-muted">¿Olvidaste tu contraseña?</a>
                    </div>
                </form>
                
                <hr class="my-4">
                
                <div class="text-center">
                    <span class="text-muted">¿No tienes cuenta? </span>
                    <a href="#">Regístrate</a>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                alert('Login enviado correctamente!');
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    </script>
</body>
</html>-->
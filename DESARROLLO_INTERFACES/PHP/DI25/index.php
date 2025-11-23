<?php 
// Iniciar el almacenamiento en búfer de la sesión para usar variables de sesión
session_start();

// Comprobar si el usuario ha iniciado sesión correctamente
// Si existe la variable de sesión 'login', mostramos el botón de Logout
if(isset($_SESSION['login']) && $_SESSION['login']!=''){
    $btnlog = '<div class="d-flex align-items-center justify-content-end">
                   <span class="me-2">' . $_SESSION['login'] . '</span>
                   <a href="logout.php">
                       <img src="iconos/logout.png" style="height:2em;" alt="Logout">
                   </a>
               </div>';
// Si no ha iniciado sesión, mostramos el botón de Login
}else{
    $btnlog = '<a href="login.php">
                   <img src="iconos/login.png" style="height:2em;" alt="Login">
               </a>';
}
?>
<!DOCTYPE html>
    <html lang="es_ES">
    <head>
        <title>App D.I. 2025</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="librerias/bootstrap-5.3.8-dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/estilos.css">
        <script src="librerias/bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
    <!-- Contenedor principal para la cabecera -->
        <div class="container-fluid py-2">
            <div class="row align-items-center">
                <div class="col-md-2 col-3">
                    <img src="iconos/logo.png" alt="Logo" style="height:48px;">
                </div>
                <div class="col-md-8 col-6 text-center">
                    <h1 class="h4 mb-0">Aplicación de Daniel Ibáñez</h1>
                </div>
                <div class="col-md-2 col-3 text-end">
                    <?php echo $btnlog; ?>
                </div>
            </div>
        </div>
    <div class="container-fluid">
    <!-- Barra de navegación (Navbar) -->
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
<div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
        <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Mtto.Datos
        </a>
        <ul class="dropdown-menu">
            <!-- Enlace que carga dinámicamente la vista de usuarios usando AJAX -->
            <li><a class="dropdown-item" 
                onclick="obtenerVista('Usuarios','getVistaUsuariosPrincipal','capaContenido');" >Usuarios</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
        </li>
    </ul>
    </div>
</div>
</nav>
    </div>
    <div class="container-fluid">
        <div id="appAlert" class="mx-2 mt-3"></div>
    </div>
    <!-- Área donde se cargará el contenido dinámico (Vistas) sin recargar la página -->
    <div class="container-fluid" id="capaContenido">
        Contenido
    </div>
        <script src="js/utils.js"></script>
        <script src="js/usuarios.js"></script>
        <script src="js/productos.js"></script>
    </body>


</html>
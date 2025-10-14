<?php session_start();

    if( isset($_SESSION['login']) && $_SESSION['login']!=''){ //logeado
        $btnlog='<br>'.$_SESSION['login']
                .'<br><a href="logout.php"><img src="iconos/logout.png" 
                    style="height:2em;"></a>';
    }else{ //no logeado
        $btnlog='<br><a href="login.php"><img src="iconos/login.png" 
                    style="height:2em;"></a>';

    }// FIN no logeado



?>
<!DOCTYPE html>
    <html lang="es_ES">
    <head>
        <title>App D.I. 2025</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="librerias/bootstrap-5.3.8-dist/css/bootstrap.min.css">
        <script src="librerias/bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8 d-none d-md-block">
                    Aplicación de Daniel Ibáñez
                </div>
                <div class="col-md-2 col-sm-3">
                    <?php echo $btnlog; ?>
                </div>
            </div>
        </div>
        <div class="container-fluid">
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
        <div class="container-fluid" id="capaContenido">
            Contenido
        </div>
        <script src="index.js" async></script>
    </body>


</html>
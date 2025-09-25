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
                <input type="text" class="form-control input-sm" id="usuario" placeholder="Usuario">
                <label for="usuario">Usuario</label>
            </div><br>
            <div class="form-floating">
                <input type="password" class="form-control input-sm" id="pass" placeholder="Password">
                <label for="pass">Contraseña</label>
            </div><br><br>

            <span id="msj" class="msj"></span>
            <button class="btn btn-primary w-100 py-2" type="submit">Acceder</button>

        </form>


    </body>
</html>
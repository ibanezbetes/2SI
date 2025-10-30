<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Base de Datos</title>
    <link rel="stylesheet" href="librerias/bootstrap-5.3.8-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
    <div class="container mt-4">
<?php
// Script para verificar la conexión a la base de datos y crearla si no existe
require_once 'modelos/DAO.php';

try {
    echo "<h3 class='text-light'>Verificando conexión a la base de datos...</h3>";
    
    // Intentar conectar sin especificar base de datos
    $conexion = new mysqli('127.0.0.1', 'root', '');
    
    if ($conexion->connect_error) {
        die('<div class="alert alert-danger">Error de conexión: ' . $conexion->connect_error . '</div>');
    }
    
    echo "<p class='text-success'>✓ Conexión a MySQL exitosa</p>";
    
    // Crear base de datos si no existe
    $sql = "CREATE DATABASE IF NOT EXISTS db_di25 CHARACTER SET latin1 COLLATE latin1_spanish_ci";
    if ($conexion->query($sql) === TRUE) {
        echo "<p class='text-success'>✓ Base de datos 'db_di25' verificada/creada</p>";
    } else {
        echo "<p class='text-danger'>✗ Error creando base de datos: " . $conexion->error . "</p>";
    }
    
    $conexion->close();
    
    // Ahora probar con la clase DAO
    echo "<h4 class='text-light'>Probando clase DAO...</h4>";
    $dao = new DAO();
    
    // Verificar si existe la tabla usuarios
    $result = $dao->consultar("SHOW TABLES LIKE 'usuarios'");
    if (count($result) > 0) {
        echo "<p class='text-success'>✓ Tabla 'usuarios' encontrada</p>";
        
        // Mostrar algunos usuarios
        $usuarios = $dao->consultar("SELECT COUNT(*) as total FROM usuarios");
        echo "<p class='text-info'>📊 Total de usuarios en la base de datos: " . $usuarios[0]['total'] . "</p>";
        
        // Mostrar los primeros 3 usuarios
        $usuarios = $dao->consultar("SELECT idUsuario, nombre, apellido1, mail FROM usuarios LIMIT 3");
        echo "<h5 class='text-light'>Primeros usuarios:</h5>";
        echo "<ul class='text-light'>";
        foreach($usuarios as $user) {
            echo "<li>ID: {$user['idUsuario']} - {$user['nombre']} {$user['apellido1']} - {$user['mail']}</li>";
        }
        echo "</ul>";
        
    } else {
        echo "<p class='text-danger'>✗ Tabla 'usuarios' NO encontrada</p>";
        echo "<p class='text-warning'>⚠️ Necesitas importar el archivo SQL: modelos/usuarios y productos 2025 09 29.sql</p>";
    }
    
} catch (Exception $e) {
    echo "<div class='alert alert-danger'>Error: " . $e->getMessage() . "</div>";
}
?>

        <div class="card mt-4">
            <div class="card-header">
                <h3 class="card-title mb-0">Instrucciones:</h3>
            </div>
            <div class="card-body">
                <ol class="text-light">
                    <li>Si ves errores de conexión, verifica que XAMPP/WAMP esté ejecutándose</li>
                    <li>Si la tabla 'usuarios' no existe, importa el archivo SQL en phpMyAdmin</li>
                    <li>Ve a <a href="http://localhost/phpmyadmin" target="_blank" class="text-info">phpMyAdmin</a></li>
                    <li>Importa: <code class="bg-secondary text-light p-1 rounded">modelos/usuarios y productos 2025 09 29.sql</code></li>
                </ol>
            </div>
        </div>

        <div class="mt-4">
            <a href="index.php" class="btn btn-primary">← Volver al inicio</a>
        </div>
    </div>
</body>
</html>
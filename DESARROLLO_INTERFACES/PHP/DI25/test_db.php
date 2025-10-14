<?php
// Script para verificar la conexión a la base de datos y crearla si no existe
require_once 'modelos/DAO.php';

try {
    echo "<h3>Verificando conexión a la base de datos...</h3>";
    
    // Intentar conectar sin especificar base de datos
    $conexion = new mysqli('127.0.0.1', 'root', '');
    
    if ($conexion->connect_error) {
        die('<div style="color:red;">Error de conexión: ' . $conexion->connect_error . '</div>');
    }
    
    echo "<p style='color:green;'>✓ Conexión a MySQL exitosa</p>";
    
    // Crear base de datos si no existe
    $sql = "CREATE DATABASE IF NOT EXISTS db_di25 CHARACTER SET latin1 COLLATE latin1_spanish_ci";
    if ($conexion->query($sql) === TRUE) {
        echo "<p style='color:green;'>✓ Base de datos 'db_di25' verificada/creada</p>";
    } else {
        echo "<p style='color:red;'>✗ Error creando base de datos: " . $conexion->error . "</p>";
    }
    
    $conexion->close();
    
    // Ahora probar con la clase DAO
    echo "<h4>Probando clase DAO...</h4>";
    $dao = new DAO();
    
    // Verificar si existe la tabla usuarios
    $result = $dao->consultar("SHOW TABLES LIKE 'usuarios'");
    if (count($result) > 0) {
        echo "<p style='color:green;'>✓ Tabla 'usuarios' encontrada</p>";
        
        // Mostrar algunos usuarios
        $usuarios = $dao->consultar("SELECT COUNT(*) as total FROM usuarios");
        echo "<p style='color:blue;'>📊 Total de usuarios en la base de datos: " . $usuarios[0]['total'] . "</p>";
        
        // Mostrar los primeros 3 usuarios
        $usuarios = $dao->consultar("SELECT idUsuario, nombre, apellido1, mail FROM usuarios LIMIT 3");
        echo "<h5>Primeros usuarios:</h5>";
        echo "<ul>";
        foreach($usuarios as $user) {
            echo "<li>ID: {$user['idUsuario']} - {$user['nombre']} {$user['apellido1']} - {$user['mail']}</li>";
        }
        echo "</ul>";
        
    } else {
        echo "<p style='color:red;'>✗ Tabla 'usuarios' NO encontrada</p>";
        echo "<p style='color:orange;'>⚠️ Necesitas importar el archivo SQL: modelos/usuarios y productos 2025 09 29.sql</p>";
    }
    
} catch (Exception $e) {
    echo "<p style='color:red;'>Error: " . $e->getMessage() . "</p>";
}
?>

<h3>Instrucciones:</h3>
<ol>
    <li>Si ves errores de conexión, verifica que XAMPP/WAMP esté ejecutándose</li>
    <li>Si la tabla 'usuarios' no existe, importa el archivo SQL en phpMyAdmin</li>
    <li>Ve a <a href="http://localhost/phpmyadmin" target="_blank">phpMyAdmin</a></li>
    <li>Importa: <code>modelos/usuarios y productos 2025 09 29.sql</code></li>
</ol>

<p><a href="index.php">← Volver al inicio</a></p>
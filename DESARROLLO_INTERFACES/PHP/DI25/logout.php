<?php 
session_start();
// Limpiar todas las variables de sesión
$_SESSION = array();
// Destruir la sesión completamente
session_destroy();
// Redirigir al usuario a la página de login
header('Location: login.php');
exit();
?>
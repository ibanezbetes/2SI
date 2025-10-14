<?php 
    require_once 'controladores/Controlador.php';
    require_once 'vistas/Vista.php';

    class CUsuarios extends Controlador{
        public function getVistaUsuariosPrincipal($datos=array()) {
            Vista::render('vistas/Usuarios/VUsuariosPrincipal.php');
                       
        }

    } //FIN class CUsuarios

?>
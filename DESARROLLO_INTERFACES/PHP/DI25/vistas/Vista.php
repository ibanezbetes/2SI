<?php
    class Vista{
        // Método estático para incluir (mostrar) un archivo de vista
        // Recibe la ruta de la vista y un array opcional de datos
        static public function render($rutaVista, $datos=array()){
            require($rutaVista); //include
        }
    }

?>
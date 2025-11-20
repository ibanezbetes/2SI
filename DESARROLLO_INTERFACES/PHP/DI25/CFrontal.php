<?php 
// Controlador Frontal - Recibe todas las peticiones y las dirige al controlador correcto
session_start();

// Combinar GET, POST y FILES en un solo array
$getPost = array_merge($_GET, $_POST, $_FILES);

// Verificar que llegue el parámetro 'controlador'
if(isset($getPost['controlador']) && $getPost['controlador']!=''){
    
    // Verificar que exista el archivo del controlador
    if(file_exists('controladores/C'.$getPost['controlador'].'.php')){
        
        // Verificar que llegue el parámetro 'metodo'
        if(isset($getPost['metodo']) && $getPost['metodo']!=''){
            
            // Construir el nombre de la clase (ej: CUsuarios)
            $controlador = 'C'.$getPost['controlador'];
            $metodo = $getPost['metodo'];
            
            // Cargar el archivo del controlador
            require_once 'controladores/'.$controlador.'.php';
            
            // Crear instancia del controlador
            $objCont = new $controlador();
            
            // Verificar que el método existe y ejecutarlo
            if(method_exists($objCont, $metodo)){
                $objCont->$metodo($getPost);
            }else{
                echo 'Error: Método no existe';
            }
        }else{
            echo 'Error: Método no especificado';
        }
    }else{
        echo 'Error: Controlador no encontrado';
    }
}else{
    echo 'Error: Controlador no especificado';
}
?>

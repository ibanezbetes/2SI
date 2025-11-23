<?php 
// Controlador Frontal - Recibe todas las peticiones y las dirige al controlador correcto
session_start();

// Recogemos todos los datos que llegan por URL (GET), Formularios (POST) o Archivos (FILES)
// y los juntamos en una sola variable para manejarlos más fácil
$getPost = array_merge($_GET, $_POST, $_FILES);

// Miramos si nos han dicho qué controlador usar (ej: Usuarios, Productos)
if(isset($getPost['controlador']) && $getPost['controlador']!=''){
    
    // Comprobamos si existe el archivo de ese controlador en la carpeta 'controladores'
    if(file_exists('controladores/C'.$getPost['controlador'].'.php')){
        
        // Miramos si nos han dicho qué acción (método) realizar
        if(isset($getPost['metodo']) && $getPost['metodo']!=''){
            
            // Construir el nombre de la clase (ej: CUsuarios)
            $controlador = 'C'.$getPost['controlador'];
            $metodo = $getPost['metodo'];
            
            // Cargar el archivo del controlador
            require_once 'controladores/'.$controlador.'.php';
            
            // Creamos el objeto del controlador (ej: new CUsuarios())
            $objCont = new $controlador();
            
            // Si la acción existe en el controlador, la ejecutamos pasándole los datos
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

<?php 
session_start();
$getPost = array_merge($_GET, $_POST, $_FILES);

if(isset($getPost['controlador']) && $getPost['controlador']!=''){
    if(file_exists('controladores/C'.$getPost['controlador'].'.php')){
        if(isset($getPost['metodo']) && $getPost['metodo']!=''){
            $controlador = 'C'.$getPost['controlador'];
            $metodo = $getPost['metodo'];
            require_once 'controladores/'.$controlador.'.php';
            $objCont = new $controlador();
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

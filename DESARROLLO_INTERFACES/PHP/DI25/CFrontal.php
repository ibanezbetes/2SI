<?php session_start();
    $getPost=array_merge($_GET, $_POST, $_FILES);
    if(isset($getPost['controlador']) && $getPost['controlador']!=''){ //llega controlador
        if(file_exists('controladores/C'.$getPost['controlador'].'.php')){ //existe
            if(isset($getPost['metodo']) && $getPost['metodo']!=''){ //llega metodo
                $controlador='C'.$getPost['controlador'];
                $metodo=$getPost['metodo'];
                require_once 'controladores/'.$controlador . '.php';
                $objCont=new $controlador();
                if (method_exists($objCont, $metodo)) {
                    $objCont -> $metodo($getPost);
                }else{
                    echo 'Error CF-04'; //no llega metodo
                }
            }else{
                echo 'Error CF-03'; //no llega metodo
            }
        }else{//no encontrado controlador
            echo 'Error CF-02';
        }
    }else{ //no llega controlador
        echo 'Error CF-01';
    }
?>
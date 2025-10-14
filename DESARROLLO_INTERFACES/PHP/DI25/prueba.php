<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prueba PHP</title>
</head>

<body>
    Prueba basica de php:<br>
    <?php
        echo 'Hola';
        echo '<br>';
        $num1= 5;
        echo $num1;
        echo '<br>';
        $texto1= "Pepe tiene $num1 €";
        echo $texto1;
        echo '<br>';
        // comentario
        /*
        comentario multilinea
        */
        echo '<br>';

        $nombre= array();
        $letras= array('a','c','z');
        $letras[3]= 'b';
        var_dump($letras);
        print_r($letras);
        
        for($x=0; $x < sizeof($letras);$x++){
            echo $letras[$x].'<br>';
        }

        echo '<br>';

        foreach($letras as $pos=>$ele) {
            echo $ele. ' esta en la posicion ' .$pos. '<br>';
        }
        //array asociativo
        $nombre=array('primero'=>'Juan ', 'segundo'=>'Ivan ', 'tercero'=>'Pepe ');

        foreach($nombre as $pos=>$ele) {
            echo $ele. 'esta en la posicion ' .$pos. '<br>';
        }
        ?>
</body>

</html>
<?php
// Configuración de la base de datos
// Constantes de conexión a la base de datos
define('HOST', '127.0.0.1');
define('USER', 'root');
define('PASS', '');
define('DB', 'db_di25');

// DAO = Data Access Object (Objeto de Acceso a Datos)
// Esta clase maneja toda la comunicación con MySQL
class DAO{
    private $conexion; 
    
    // Constructor: se ejecuta al crear un objeto DAO
    public function __construct(){
        // Conectar a MySQL
        $this->conexion = new mysqli(HOST, USER, PASS, DB);
        
        // Si hay error, detener la ejecución
        if($this->conexion->connect_errno){
            die('Error de conexión: '.$this->conexion->connect_error);
        }
    }

    // Ejecutar consultas SELECT (devuelve array de resultados)
    // Método para realizar consultas SELECT
    // Devuelve un array con todas las filas encontradas
    public function consultar($SQL){
        $res = $this->conexion->query($SQL, MYSQLI_USE_RESULT);
        $filas = array();
        
        if($this->conexion->errno){
            die('Error en consulta: '.$this->conexion->error);
        }else{
            // Convertir cada fila en un array asociativo
            while($reg = $res->fetch_assoc()){
                $filas[] = $reg;
            }
        }
        return $filas;
    }

    // Ejecutar INSERT (devuelve el ID del nuevo registro)
    // Método para realizar INSERT
    // Devuelve el ID autogenerado del nuevo registro
    public function insertar($SQL){
        $this->conexion->query($SQL, MYSQLI_USE_RESULT);
        
        if($this->conexion->connect_errno){
            die('Error en BD: '.$SQL);
        }else{
            // Devolver el ID del registro insertado
            return $this->conexion->insert_id;
        }
    }

    // Ejecutar UPDATE (devuelve número de filas afectadas)
    // Método para realizar UPDATE
    // Devuelve el número de filas que fueron modificadas
    public function actualizar($SQL){
        $this->conexion->query($SQL, MYSQLI_USE_RESULT);
        
        if($this->conexion->connect_errno){
            die('Error en BD: '.$SQL);
        }else{
            // Devolver cuántas filas se modificaron
            return $this->conexion->affected_rows;
        }
    }

    // Ejecutar DELETE (devuelve número de filas eliminadas)
    // Método para realizar DELETE
    // Devuelve el número de filas eliminadas
    public function borrar($SQL){
        $this->conexion->query($SQL);
        return $this->conexion->affected_rows;
    }
}
?>

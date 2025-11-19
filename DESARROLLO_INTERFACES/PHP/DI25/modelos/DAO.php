<?php
define('HOST', '127.0.0.1');
define('USER', 'root');
define('PASS', '');
define('DB', 'db_di25');

class DAO{
    private $conexion; 
    
    public function __construct(){
        $this->conexion = new mysqli(HOST, USER, PASS, DB);
        if($this->conexion->connect_errno){
            die('Error de conexión: '.$this->conexion->connect_error);
        }
    }

    public function consultar($SQL){
        $res = $this->conexion->query($SQL, MYSQLI_USE_RESULT);
        $filas = array();
        if($this->conexion->errno){
            die('Error en consulta: '.$this->conexion->error);
        }else{
            while($reg = $res->fetch_assoc()){
                $filas[] = $reg;
            }
        }
        return $filas;
    }

    public function insertar($SQL){
        $this->conexion->query($SQL, MYSQLI_USE_RESULT);
        if($this->conexion->connect_errno){
            die('Error en BD: '.$SQL);
        }else{
            return $this->conexion->insert_id;
        }
    }

    public function actualizar($SQL){
        $this->conexion->query($SQL, MYSQLI_USE_RESULT);
        if($this->conexion->connect_errno){
            die('Error en BD: '.$SQL);
        }else{
            return $this->conexion->affected_rows;
        }
    }

    public function borrar($SQL){
        $this->conexion->query($SQL);
        return $this->conexion->affected_rows;
    }
}
?>

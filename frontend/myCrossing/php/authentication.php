<?php

// Esto es para probar la BBDD, si mas adelante
// hace falta abrir y cerrar sesion, crear las funciones
// que estan en pipo.php para abrir y cerrar sesion
// mas info en marcadores

require "opendb.php";

if(isset($_GET['command'])){
  switch($_GET['command']){
    case "setNull":
      $userId = $_GET['userId'];
      $sql = "UPDATE usuarios SET verification = NULL WHERE id = $userId";
      $result = mysqli_query($conn,$sql);
      break;

    case "setKey":
      if(isset($_GET['userId']) && isset($_GET['key'])){
      $userId = $_GET['userId'];
      $verif = $_GET['key'];
      $sql = "UPDATE usuarios SET verification = '$verif' WHERE id = $userId";
      $result = mysqli_query($conn,$sql);
      }else{
        print "No ha introducido id de usuario o key";
      }
      break;

    case "login":
        $sql = "SELECT nombre, contrasenya, id FROM usuarios";
        $result = mysqli_query($conn,$sql);
        $myArray = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            print json_encode($myArray);
        }
        break;

    case "read":
      if(isset($_GET['userId'])){
        $userId = $_GET['userId'];
        $sql = "SELECT * FROM usuarios WHERE id = $userId";
        $result = mysqli_query($conn,$sql);
        $myArray = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            print json_encode($myArray);
        }
      }else{
        print "No ha introducido id de usuario que leer";
      }
      break;

    case "readAll":
        $sql = "SELECT * FROM usuarios";
        $result = mysqli_query($conn,$sql);
            $myArray = array();
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $myArray[] = $row;
                }
                print json_encode($myArray);
            }
            break;

    case "getKey":
      if(isset($_GET['userId'])){
        $userId = $_GET['userId'];
        $sql = "SELECT verification FROM usuarios WHERE id = $userId";
        $result = mysqli_query($conn,$sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            print json_encode($myArray);
        }
      }else{
        print "No ha introducido id de usuario que leer";
      }
      break;
    
    case "register":
      $putdata = file_get_contents("php://input");
      $request = json_decode($putdata);
      if(isset($request)){
        $nombre = $request->nombre;
        $isla = $request->isla;
        $fruta = $request->fruta;
        $cumpleanyos = $request->cumpleanyos;
        $hemisferio = $request->hemisferio;
        $contrasenya = $request->clave;
        $email = $request->email;
        $verif = $request->verif;
        $sql = "INSERT INTO usuarios (nombre, contrasenya, isla, fruta, cumpleanyos, verification, email, hemisferio";
        $sql2 = ") VALUES ('$nombre', '$contrasenya', '$isla', '$fruta', '$cumpleanyos', '$verif', '$email', '$hemisferio'";
        
        if(!empty($request->id_switch)){
          $id_switch = $request->id_switch;
          $sql .= ", id_switch";
          $sql2 .= ", '$id_switch'";
        }
        if(!empty($request->id_suenyo)){
          $id_suenyo = $request->id_suenyo;
          $sql .= ", id_suenyo";
          $sql2 .= ", '$id_suenyo'";
        }
        if(!empty($request->apodo_aldeano)){
          $apodo_aldeano = $request->apodo_aldeano;
          $sql .= ", apodo_aldeano";
          $sql2 .= ", '$apodo_aldeano'";
        }
        
        $sql2 .= ")";
        $sql .= $sql2;
        $funciona = mysqli_query($conn,$sql);
        $sql = "SELECT id FROM usuarios WHERE nombre = '$nombre'";
        $result = mysqli_query($conn,$sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            print json_encode($myArray);
        }
      }else{
        print "No ha introducido los parametros necesarios de registro";
      }
      break;
      
    default:
      print "Comando no valido";
  }
}else{
  print "Comando no seleccionado";
}
mysqli_close($conn);
?>

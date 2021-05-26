<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Accept, Authorization');

require dirname(__FILE__) . "/opendb.php";

include dirname(__FILE__) . "/validators/usuarioValidator.php";
include dirname(__FILE__) . "/validators/catcancionValidator.php";


if(isset($_GET["command"])){
  $validation = false;

  switch($_GET["command"]){
    case "read"://---------------------------------------------------------------------------------------------------READ
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $validation = checkExisteUser($conn, $userId) &&
                checkVerification($conn, $userId, $verifCode);

        if($validation){
          $result = $conn->prepare('SELECT nombre_cancion FROM catcanciones WHERE usuario_id = ?');
          $result->bind_param('i',$userId);
          $result->execute();
          $res = $result->get_result();
          $myArray = array();

          if ($res->num_rows > 0) {
            while($row = $res->fetch_assoc()) {
              $myArray[] = $row;
            }
          }
          print json_encode($myArray, JSON_NUMERIC_CHECK);
        }
      }else{
        die("Faltan parametros");
      }
      break;

    case "create"://---------------------------------------------------------------------------------------------------CREATE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)){

          $request = json_decode($postdata);
          $nombreCancion = $request->nombre_cancion;

          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkNoTieneCancion($conn, $userId, $nombreCancion);

          if($validation){
            $result = $conn->prepare('INSERT INTO catcanciones(usuario_id, nombre_cancion) VALUES (?, ?)');
            $result->bind_param('is',$userId, $nombreCancion);
            $result->execute();
          }
        }else{
          die("No hay datos");
        }
      } else {
        die("Faltan parametros");
      }
      break;

    case "delete"://---------------------------------------------------------------------------------------------------DELETE
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["nombreCancion"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];
        $nombreFosil = $_GET["nombreCancion"];

        $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkTieneCancion($conn, $userId, $nombreFosil);

        if($validation){
          $result = $conn->prepare('DELETE FROM catcanciones WHERE usuario_id = ? AND nombre_cancion = ?');
          $result->bind_param('is',$userId, $nombreFosil);
          $result->execute();
        }
      }else{
        die("Faltan parametros");
      }
      break;

    default:
      die("Comando no válido");
  }
}else{
  die("Comando no seleccionado");
}

$conn -> close();

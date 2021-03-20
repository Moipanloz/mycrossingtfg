<?php

require "openDB.php";

include "validators/usuarioValidator.php";
include "validators/catarteValidator.php";


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
          $result = $conn->prepare('SELECT nombre_arte FROM catarte WHERE usuario_id = ?');
          $result->bind_param('i',$userId);
          $result->execute();
          $result = $result->get_result();

          $myArray = array();

          if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
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
          $nombreArte = $request->nombre_arte;

          $noTieneArte = checkTieneArte($conn, $userId, $nombreArte);

          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  !$noTieneArte;

          if($validation){
            $result = $conn->prepare('INSERT INTO catarte(usuario_id, nombre_arte) VALUES (?, ?)');
            $result->bind_param('is',$userId, $nombreArte);
            $result->execute();
          }
        }else{
          die("No hay datos");
        }
      }else{
        die("Faltan parametros");
      }
      break;

    case "delete"://---------------------------------------------------------------------------------------------------DELETE
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["nombreArte"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];
        $nombreArte = $_GET["nombreArte"];

        $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkTieneArte($conn, $userId, $nombreArte);

        if($validation){
          $result = $conn->prepare('DELETE FROM catarte WHERE usuario_id = ? AND nombre_arte = ?');
          $result->bind_param('is',$userId, $nombreArte);
          $result->execute();
        }
      } else {
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

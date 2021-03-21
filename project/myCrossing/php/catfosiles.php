<?php

require "openDB.php";

include "validators/usuarioValidator.php";
include "validators/catfosilValidator.php";


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
          $result = $conn->prepare('SELECT nombre_fosil FROM catfosiles WHERE usuario_id = ?');
          $result->bind_param('i',$userId);
          $result->execute();
          $result->store_result();
          $res = $result->get_result();
          $myArray = array();

          if ($result->num_rows > 0) {
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
          $nombreFosil = $request->nombre_fosil;

          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkNoTieneFosil($conn, $userId, $nombreFosil);

          if($validation){
            $result = $conn->prepare('INSERT INTO catfosiles(usuario_id, nombre_fosil) VALUES (?, ?)');
            $result->bind_param('is',$userId, $nombreFosil);
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
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["nombreFosil"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];
        $nombreFosil = $_GET["nombreFosil"];

        $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkTieneFosil($conn, $userId, $nombreFosil);

        if($validation){
          $result = $conn->prepare('DELETE FROM catfosiles WHERE usuario_id = ? AND nombre_fosil = ?');
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

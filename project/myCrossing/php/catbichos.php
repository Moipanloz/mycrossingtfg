<?php

require "openDB.php";

include "validators/usuarioValidator.php";
//include "validators/catbichoValidator.php";


if(isset($_GET["command"])){
  $validation = false;

  switch($_GET["command"]){
    case "read"://---------------------------------------------------------------------------------------------------READ
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $validation = true; //checkExisteUser($conn, $userId) &&
                //checkVerification($conn, $userId, $verifCode);

        if($validation){
          $result = $conn->prepare('SELECT nombre_criatura FROM catbichos WHERE usuario_id = ?');
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
        }else{
          print("No se cumplen los requisitos");
        }
      }else{
        print("Faltan parametros");
      }
      break;

    case "create"://---------------------------------------------------------------------------------------------------CREATE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)){

          $request = json_decode($postdata);
          $nombreCriatura = $request->nombre_criatura;

          //$noTieneFosil = checkTieneFosil($conn, $userId, $nombreFosil);

          $validation = true;/*checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  !$noTieneFosil;*/

          if($validation){
            $result = $conn->prepare('INSERT INTO catbichos(usuario_id, nombre_criatura) VALUES (?, ?)');
            $result->bind_param('is',$userId, $nombreCriatura);
            $result->execute();
          }else{
            print("No se cumplen los requisitos");
          }
        }else{
          print("No hay datos");
        }
      } else {
        print("Faltan parametros");
      }
      break;

    case "delete"://---------------------------------------------------------------------------------------------------DELETE
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["nombreCriatura"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];
        $nombreCriatura = $_GET["nombreCriatura"];

        $validation = true;/*checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkTieneFosil($conn, $userId, $nombreFosil);*/

        if($validation){
          $result = $conn->prepare('DELETE FROM catbichos WHERE usuario_id = ? AND nombre_criatura = ?');
          $result->bind_param('is',$userId, $nombreCriatura);
          $result->execute();
        }else{
          print("No se cumplen los requisitos");
        }
      } else {
        print("Faltan parametros");
      }
      break;

    default:
      print("Comando no válido");
  }
}

$conn -> close();

?>
<?php

require "openDB.php";

include "validators/usuarioValidator.php";
include "validators/ceValidator.php";

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
          $sql = "SELECT itemsce.source, GROUP_CONCAT(usuariosce.itemce_id) FROM usuariosce JOIN itemsce ON itemsce.id = usuariosce.itemce_id WHERE usuario_id = $userId GROUP BY source";
          $result = mysqli_query($conn,$sql);
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
          $itemId = $request->itemce_id; //aunque lo coja de items, son las colecciones (sources) a añadir

          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkDatosCorrectos($conn, $itemId);

          if($validation){
            $sql = "INSERT INTO usuariosce(usuario_id, itemce_id) VALUES ($userId, '$itemId')";
            $result = mysqli_query($conn,$sql);
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
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["itemId"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];
        $itemId = $_GET["itemId"];

        $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkTieneItem($conn, $userId, $itemId) &&
                  checkDatosCorrectos($conn, $itemId);

        if($validation){
          $sql = "DELETE FROM usuariosce WHERE usuario_id = $userId AND itemce_id = '$itemId'";
          $result = mysqli_query($conn,$sql);
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

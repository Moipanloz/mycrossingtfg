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
          $sql = "SELECT item_source, GROUP_CONCAT(item_name) FROM colesp WHERE usuario_id = $userId GROUP BY item_source";
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
          $itemName = $request->item_name;
          $itemSource = $request->item_source;

          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkDatosCorrectos($conn, $itemName, $itemSource);

          if($validation){
            $sql = "INSERT INTO colesp(usuario_id, item_name, item_source) VALUES ($userId, '$itemName', '$itemSource')";
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
        $itemName = $_GET["itemName"];

        $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkTieneItem($conn, $userId, $itemName) &&
                  checkDatosCorrectos($conn, $itemName);

        if($validation){
          $sql = "DELETE FROM colesp WHERE usuario_id = $userId AND item_name = '$itemName'";
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

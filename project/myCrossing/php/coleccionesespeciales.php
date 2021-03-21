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
          $result = $conn->prepare('SELECT item_source, GROUP_CONCAT(item_name) FROM colesp WHERE usuario_id = ? GROUP BY item_source');
          $result->bind_param('i',$userId);
          $result->execute();
          $result->store_result();
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
          $itemName = $request->item_name;
          $itemSource = $request->item_source;

          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkNoTieneItem($conn, $userId, $itemName) &&
                  checkSourceCorrecta($itemSource);
                  //No se puede comprobar que el nombre es correcto

          if($validation){
            $result = $conn->prepare('INSERT INTO colesp(usuario_id, item_name, item_source) VALUES (?, ?, ?)');
            $result->bind_param('iss',$userId, $itemName,$itemSource);
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
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["itemName"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];
        $itemName = $_GET["itemName"];

        $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkTieneItem($conn, $userId, $itemName);

        if($validation){
          $result = $conn->prepare('DELETE FROM colesp WHERE usuario_id = ? AND item_name = ?');
          $result->bind_param('is',$userId, $itemName);
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

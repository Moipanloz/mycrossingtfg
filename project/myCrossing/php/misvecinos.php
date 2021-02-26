<?php

require "openDB.php";

include "validators/usuarioValidator.php";
include "validators/vecinoValidator.php";

if(isset($_GET["command"])){
  $error = false;

  switch($_GET["command"]){
    case "read"://---------------------------------------------------------------------------------------------------READ
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $error = checkExisteUser($conn, $userId) &&
                checkVerification($conn, $userId, $verifCode);

        if($error){
          $sql = "SELECT * FROM misvecinos WHERE usuario_id = $userId";
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
          $vecinoId = $request->vecino_id;
          $amistad = $request->amistad;

          $tieneVecino = checkTieneVecino($userId, $vecinoId, $conn);
          $tieneVecino = ! $tieneVecino;

          $error = checkExisteUser($conn, $userId) &&
                   checkVerification($conn, $userId, $verifCode) &&
                   checkDatosCorrectos($vecinoId, $amistad) &&
                   checkNumeroVecinos($userId, $conn) &&
                   $tieneVecino;

          if($error){
            $sql = "INSERT INTO misvecinos(vecino_id, usuario_id, amistad) VALUES ($vecinoId, $userId, '$amistad')";
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

    case "updateVecino"://------------------------------------------------------------------------------------------------UPDATE VECINO
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["oldVecinoId"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];
        $oldVecinoId = $_GET["oldVecinoId"];

        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)){

          $request = json_decode($postdata);
          $vecinoId = $request->vecino_id;
          $amistad = $request->amistad;

          $tieneVecino = checkTieneVecino($userId, $vecinoId, $conn);
          $tieneVecino = ! $tieneVecino; // No se puede aplicar ! dentro de $error

          $error = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkDatosCorrectos($vecinoId, $amistad) &&
                  $tieneVecino;

          if($error){
            $sql = "UPDATE misvecinos SET vecino_id = $vecinoId, amistad = '$amistad' WHERE vecino_id = $oldVecinoId AND usuario_id = $userId";
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

    case "updateAmistad"://----------------------------------------------------------------------------------------UPDATE AMISTAD
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)){

          $request = json_decode($postdata);
          $vecinoId = $request->vecino_id;
          $amistad = $request->amistad;

          $error = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkDatosCorrectos($vecinoId, $amistad) &&
                  checkTieneVecino($userId, $vecinoId, $conn);

          if($error){
            $sql = "UPDATE misvecinos SET amistad = '$amistad' WHERE vecino_id = $vecinoId AND usuario_id = $userId";
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
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["vecinoId"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];
        $vecinoId = $_GET["vecinoId"];

        $error = checkExisteUser($conn, $userId) &&
                checkVerification($conn, $userId, $verifCode) &&
                checkTieneVecino($userId, $vecinoId, $conn);

        if($error){
          $sql = "DELETE FROM misvecinos WHERE vecino_id = $vecinoId AND usuario_id = $userId";
          $result = mysqli_query($conn,$sql);
        }else{
          print("No se cumplen los requisitos");
        }
      }else{
        print("Faltan parametros");
      }
      break;

    default:
      print("Comando no válido");
  }
}

$conn -> close();

?>

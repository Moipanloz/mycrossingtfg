<?php

require "openDB.php";

include "validators/usuarioValidator.php";
include "validators/vecinoValidator.php";

if(isset($_GET["command"])){
  $error = false;

  switch($_GET["command"]){
    case "read"://---------------------------------------------------------------------------------------------------READ
      if(isset($_GET["userId"])){
        $userId = $_GET["userId"];

        $error = checkUser($userId);

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
        print("No hay id de usuario");
      }


      break;

    case "create"://---------------------------------------------------------------------------------------------------CREATE
      if(isset($_GET["userId"])){

        $userId = $_GET["userId"];
        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)){

          $request = json_decode($postdata);
          $vecinoId = $request->vecino_id;
          $amistad = $request->amistad;

          $tieneVecino = checkTieneVecino($userId, $vecinoId, $conn);
          $tieneVecino = ! $tieneVecino;

          $error = checkUser($userId) &&
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
        print("No hay id de usuario");
      }
      break;

    case "updateVecino"://------------------------------------------------------------------------------------------------UPDATE VECINO
      if(isset($_GET["userId"])){

        $userId = $_GET["userId"];

        if(isset($_GET["oldVecinoId"])){
          $oldVecinoId = $_GET["oldVecinoId"];

          $postdata = file_get_contents("php://input");

          if(isset($postdata) && !empty($postdata)){

            $request = json_decode($postdata);
            $vecinoId = $request->vecino_id;
            $amistad = $request->amistad;

            $tieneVecino = checkTieneVecino($userId, $vecinoId, $conn);
            $tieneVecino = ! $tieneVecino; // No se puede aplicar ! dentro de $error

            $error = checkUser($userId) &&
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

        }else{
          print("No se encuentra el vecino a sustituir");
        }

      } else {
        print("No hay id de usuario");
      }
      break;

    case "updateAmistad"://----------------------------------------------------------------------------------------UPDATE AMISTAD
    if(isset($_GET["userId"])){

      $userId = $_GET["userId"];
      $postdata = file_get_contents("php://input");

      if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);
        $vecinoId = $request->vecino_id;
        $amistad = $request->amistad;

        $error = checkUser($userId) &&
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
      print("No hay id de usuario");
    }
    break;

    case "delete"://---------------------------------------------------------------------------------------------------DELETE
      if(isset($_GET["userId"])){
        $userId = $_GET["userId"];

        if(isset($_GET["vecinoId"])){

          $vecinoId = $_GET["vecinoId"];

          $error =  checkUser($userId) &&
                    checkTieneVecino($userId, $vecinoId, $conn);

          if($error){
            $sql = "DELETE FROM misvecinos WHERE vecino_id = $vecinoId AND usuario_id = $userId";
            $result = mysqli_query($conn,$sql);
          }else{
            print("No se cumplen los requisitos");
          }
        }else{
          print("No tienes a este vecino");
        }

      }else{
        print("No hay id de usuario");
      }
      break;

    default:
      print("Comando no válido");

  }

}

$conn -> close();

?>

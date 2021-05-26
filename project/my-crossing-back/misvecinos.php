<?php

header('Access-Control-Allow-Headers: https://mycrossing.herokuapp.com');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require dirname(__FILE__) . "/opendb.php";

include dirname(__FILE__) . "/validators/usuarioValidator.php";
include dirname(__FILE__) . "/validators/vecinoValidator.php";

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
          $result = $conn->prepare('SELECT * FROM misvecinos WHERE usuario_id = ?');
          $result->bind_param('i', $userId);
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
          $vecinoId = $request->vecino_id;
          $amistad = $request->amistad;

          $validation = checkExisteUser($conn, $userId) &&
                   checkVerification($conn, $userId, $verifCode) &&
                   checkDatosCorrectos($amistad) &&
                   checkNumeroVecinos($userId, $conn) &&
                   checkNoTieneVecino($userId, $vecinoId, $conn);

          if($validation){
            $result = $conn->prepare('INSERT INTO misvecinos(vecino_id, usuario_id, amistad) VALUES (?,?,?)');
            $result->bind_param('sis', $vecinoId, $userId, $amistad);
            $result->execute();
          }
        }else{
          die("No hay datos");
        }
      }else{
        die("Faltan parametros");
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

          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkDatosCorrectos($vecinoId, $amistad) &&
                  checkTieneVecino($userId, $oldVecinoId, $conn) &&
                  checkNoTieneVecino($userId, $vecinoId, $conn);

          if($validation){
            $result = $conn->prepare('UPDATE misvecinos SET vecino_id = ?, amistad = ? WHERE vecino_id = ? AND usuario_id = ?');
            $result->bind_param('sssi', $vecinoId, $amistad, $oldVecinoId, $userId,);
            $result->execute();
          }
        }else{
          die("No hay datos");
        }
      }else{
        die("Faltan parametros");
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

          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkDatosCorrectos($vecinoId, $amistad) &&
                  checkTieneVecino($userId, $vecinoId, $conn);

          if($validation){
            $result = $conn->prepare('UPDATE misvecinos SET amistad = ? WHERE vecino_id = ? AND usuario_id = ?');
            $result->bind_param('ssi', $amistad, $vecinoId, $userId,);
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
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["vecinoId"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];
        $vecinoId = $_GET["vecinoId"];
        $vecinoId = substr($vecinoId, 1, -1);

        $validation = checkExisteUser($conn, $userId) &&
                checkVerification($conn, $userId, $verifCode) &&
                checkTieneVecino($userId, $vecinoId, $conn);

        if($validation){
          $result = $conn->prepare('DELETE FROM misvecinos WHERE vecino_id = ? AND usuario_id = ?');
          $result->bind_param('si', $vecinoId, $userId);
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

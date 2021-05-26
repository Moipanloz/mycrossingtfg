<?php

require dirname(__FILE__) . "/openDB.php";

include dirname(__FILE__) . "/validators/usuarioValidator.php";
include dirname(__FILE__) . "/validators/catBichoValidator.php";


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
          $objectUserId = $request->usuario_id;

          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkNotEmptyCreature($nombreCriatura) &&
                  checkNoTieneCriatura($conn, $userId, $nombreCriatura) &&
                  checkSameUser($userId, $objectUserId);

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

        $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkNotEmptyCreature($nombreCriatura) &&
                  checkTieneCriatura($conn, $userId, $nombreCriatura);

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

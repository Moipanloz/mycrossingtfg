<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Accept, Authorization');

require dirname(__FILE__) . "/opendb.php";

include dirname(__FILE__) . "/validators/usuarioValidator.php";
include dirname(__FILE__) . "/validators/catsuenoValidator.php";


if(isset($_GET["command"])){
  $validation = false;

  switch($_GET["command"]){
    case "readMine"://---------------------------------------------------------------------------------------------------READMINE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $validation = checkExisteUser($conn, $userId) &&
                checkVerification($conn, $userId, $verifCode);

        if($validation){
          $result = $conn->prepare('SELECT usuarios.id,catsuenos.codigo_sueno,catsuenos.foto1,catsuenos.foto2,catsuenos.foto3,usuarios.nombre,usuarios.isla FROM catsuenos INNER JOIN usuarios ON usuarios.id=catsuenos.usuario_id WHERE usuario_id = ?');
          $result->bind_param('i',$userId);
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
    case "existe"://---------------------------------------------------------------------------------------------------READMINE
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["codigo"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];
        $codigoSueno = $_GET["codigo"];

        $validation = checkExisteUser($conn, $userId) &&
                checkVerification($conn, $userId, $verifCode);

        if($validation){
          $result = $conn->prepare('SELECT codigo_sueno FROM catsuenos WHERE codigo_sueno = ? AND usuario_id != ?');
          $result->bind_param('si',$codigoSueno, $userId);
          $result->execute();
          $res = $result->get_result();
          $myArray = array();

          print json_encode($res->num_rows!=0);
        }
      }else{
        die("Faltan parametros");
      }
      break;
    case "read"://---------------------------------------------------------------------------------------------------READ
      $result = $conn->prepare('SELECT usuarios.id,catsuenos.codigo_sueno,catsuenos.foto1,catsuenos.foto2,catsuenos.foto3,usuarios.nombre,usuarios.isla,COALESCE(CONSULTA1.cantidad,CONSULTA1.cantidad,0) AS likes FROM catsuenos INNER JOIN usuarios ON usuarios.id=catsuenos.usuario_id LEFT JOIN (SELECT codigo_sueno, COUNT(usuario_id) AS cantidad FROM likes_suenos GROUP BY codigo_sueno) AS CONSULTA1 ON catsuenos.codigo_sueno = CONSULTA1.codigo_sueno');
      $result->execute();
      $res = $result->get_result();
      $myArray = array();
      if ($res->num_rows > 0) {
        while($row = $res->fetch_assoc()) {
          $myArray[] = $row;
        }
      }
      print json_encode($myArray, JSON_NUMERIC_CHECK);
      break;

    case "create"://---------------------------------------------------------------------------------------------------CREATE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)){

          $request = json_decode($postdata);
          $codigoSueno = $request->codigo_sueno;
          $objectUserId = $request->usuario_id;
          preg_match('/^DA-[0-9]{4}-[0-9]{4}-[0-9]{4}$/', $codigoSueno, $matches);
          if(count($matches)==0){
            die("El codigo de sueño no cumple el patrón");
          }
          $foto1 = $request->foto1;
          $foto2 = $request->foto2;
          $foto3 = $request->foto3;
          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkNoTieneSueno($conn, $userId, $codigoSueno) &&
                  checkSameUser($userId, $objectUserId) &&
                  checkHasPhoto($foto1);

          if($validation){
            $result = $conn->prepare('INSERT INTO catsuenos(usuario_id, foto1, foto2, foto3, codigo_sueno) VALUES (?, ?, ?, ?, ?)');
            $result->bind_param('issss',$userId, $foto1, $foto2, $foto3, $codigoSueno);
            $result->execute();
          }
        }else{
          die("No hay datos");
        }
      } else {
        die("Faltan parametros");
      }
      break;

    case "update"://---------------------------------------------------------------------------------------------------CREATE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)){

          $request = json_decode($postdata);
          $codigoSueno = $request->codigo_sueno;
          preg_match('/^DA-[0-9]{4}-[0-9]{4}-[0-9]{4}$/', $codigoSueno, $matches);
          if(count($matches)==0){
            die("El codigo de sueño no cumple el patrón");
          }
          $foto1 = $request->foto1;
          $foto2 = $request->foto2;
          $foto3 = $request->foto3;
          $objectUserId = $request->usuario_id;
          $validation = checkExisteUser($conn, $userId) &&
                  checkPoseeAlgunSueno($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) && 
                  checkOtroNoTieneSueno($conn, $userId, $codigoSueno) &&
                  checkHasPhoto($foto1) &&
                  checkSameUser($userId, $objectUserId);

          if($validation){
            $result = $conn->prepare('UPDATE catsuenos SET foto1 = ?, foto2 = ?, foto3 = ?, codigo_sueno = ? WHERE usuario_id = ?');
            $result->bind_param('ssssi', $foto1, $foto2, $foto3, $codigoSueno, $userId);
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
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["codigoSueno"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];
        $codigoSueno = $_GET["codigoSueno"];

        $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkTieneSueno($conn, $userId, $codigoSueno);

        if($validation){
          $result = $conn->prepare('DELETE FROM catsuenos WHERE usuario_id = ? AND codigo_sueno = ?');
          $result->bind_param('is',$userId, $codigoSueno);
          $result->execute();
        }
      }else{
        die("Faltan parametros");
      }
      break;

    case "readMisLikes"://---------------------------------------------------------------------------------------------------READ USER LIKES
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];

        $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode);

        if($validation){
          $result = $conn->prepare('SELECT codigo_sueno FROM likes_suenos WHERE usuario_id = ?');
          $result->bind_param('i',$userId);
          $result->execute();
          $res = $result->get_result();
          if ($res->num_rows > 0) {
            while($row = $res->fetch_assoc()) {
              $myArray[] = $row;
            }
          }else if($res->num_rows == 0){
            $myArray[] = [];
          }
          print json_encode($myArray, JSON_NUMERIC_CHECK);
        }
      }else{
        die("Faltan parametros");
      }
      break;

    case "creaLike"://---------------------------------------------------------------------------------------------------CREATE LIKE
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["codigoSueno"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];
        $codigoSueno = $_GET["codigoSueno"];

        $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkExisteSueno($conn, $codigoSueno);

        preg_match('/^DA-[0-9]{4}-[0-9]{4}-[0-9]{4}$/', $codigoSueno, $matches);
        if(count($matches)==0){
          die("El codigo de sueño no cumple el patrón");
        }
        if($validation){
          $result = $conn->prepare('INSERT INTO likes_suenos (usuario_id, codigo_sueno) VALUES (?,?)');
          $result->bind_param('is',$userId, $codigoSueno);
          $result->execute();
        }
      }else{
        die("Faltan parametros");
      }
      break;

    case "deleteLike"://---------------------------------------------------------------------------------------------------DELETE LIKE
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["codigoSueno"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];
        $codigoSueno = $_GET["codigoSueno"];

        $validation = checkExisteUser($conn, $userId) &&
                checkVerification($conn, $userId, $verifCode) &&
                checkExisteLike($conn, $userId, $codigoSueno);

        if($validation){
          $result = $conn->prepare('DELETE FROM likes_suenos WHERE usuario_id = ? AND codigo_sueno = ?');
          $result->bind_param('is',$userId, $codigoSueno);
          $result->execute();
        }
      }else{
        die("Faltan parametros");
      }
      break;

    case "deleteAllLikes"://---------------------------------------------------------------------------------------------------DELETE ALL LIKES
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["codigoSueno"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];
        $codigoSueno = $_GET["codigoSueno"];

        $validation = checkExisteUser($conn, $userId);

        if($validation){
          $result = $conn->prepare('DELETE FROM likes_suenos WHERE codigo_sueno = ?');
          $result->bind_param('s',$codigoSueno);
          $result->execute();
        }
      }else{
        die("Faltan parametros");
      }
      break;

    case "mueveLikes"://---------------------------------------------------------------------------------------------------MUEVE LIKES
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["codigoSueno"])){
        $verifCode = $_GET["verif"];
        $userId = $_GET["userId"];
        $codigoSueno = $_GET["codigoSueno"];
        $codigoSuenoOriginal = $_GET["codigoSuenoOriginal"];

        $validation = checkExisteUser($conn, $userId);

        if($validation){
          $result = $conn->prepare('INSERT INTO likes_suenos SELECT usuario_id, ? FROM likes_suenos WHERE codigo_sueno = ?');
          $result->bind_param('ss',$codigoSueno, $codigoSuenoOriginal);
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

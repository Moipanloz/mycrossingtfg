<?php

require "openDB.php";

include "validators/usuarioValidator.php";
include "validators/catsuenoValidator.php";


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
    case "read"://---------------------------------------------------------------------------------------------------READ
      $result = $conn->prepare('SELECT usuarios.id,catsuenos.codigo_sueno,catsuenos.foto1,catsuenos.foto2,catsuenos.foto3,usuarios.nombre,usuarios.isla FROM catsuenos INNER JOIN usuarios ON usuarios.id=catsuenos.usuario_id');
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
    case "existe"://---------------------------------------------------------------------------------------------------READMINE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];
        $codigoUsuario = $_GET["codigo"];

        $validation = checkExisteUser($conn, $userId) &&
                checkVerification($conn, $userId, $verifCode);

        if($validation){
          $result = $conn->prepare('SELECT codigo_sueno FROM catsuenos WHERE codigo_sueno = ?');
          $result->bind_param('s',$codigoUsuario);
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
      $result = $conn->prepare('SELECT usuarios.id,catsuenos.codigo_sueno,catsuenos.foto1,catsuenos.foto2,catsuenos.foto3,usuarios.nombre,usuarios.isla FROM catsuenos INNER JOIN usuarios ON usuarios.id=catsuenos.usuario_id');
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
          $foto1 = $request->foto1;
          $foto2 = $request->foto2;
          $foto3 = $request->foto3;
          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkNoTieneSueno($conn, $userId, $codigoSueno);

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
          $foto1 = $request->foto1;
          $foto2 = $request->foto2;
          $foto3 = $request->foto3;
          $validation = checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode);

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

    default:
      die("Comando no válido");
  }
}else{
  die("Comando no seleccionado");
}

$conn -> close();

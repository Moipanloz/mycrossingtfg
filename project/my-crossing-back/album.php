<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Accept, Authorization');

require dirname(__FILE__) . "/opendb.php";

include dirname(__FILE__) . "/validators/usuarioValidator.php";

if(isset($_GET["command"])){
  $validation = false;

  switch($_GET["command"]){

    case "read"://---------------------------------------------------------------------------------------------------READ
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = (int)$_GET["userId"];
        $verifCode = $_GET["verif"];

        $validation = checkExisteUser($conn, $userId) &&
                checkVerification($conn, $userId, $verifCode);

        if($validation){
          $result = $conn->prepare('SELECT url_img FROM album WHERE usuario_id = ?');
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
    case "create":
      $postdata = file_get_contents("php://input");
      if(isset($_GET["verif"]) && isset($postdata) && !empty($postdata)){
        $verifCode = $_GET["verif"];
        $request = json_decode($postdata);
        $userId = $request->usuario_id;
        $url_image = $request->url_image;

        $validation =  checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode);

        //Para que sea correcto debe dar true
        if($validation){
          $result = $conn->prepare('INSERT INTO album(usuario_id, url_img) VALUES (?, ?)');
          $result->bind_param('is', $userId, $url_image);
          $result->execute();
        }
      }else{
        die("Faltan parametros");
      }
      break;
    case "delete":
      $postdata = file_get_contents("php://input");
      if(isset($_GET["verif"]) && isset($postdata) && !empty($postdata)){
        $verifCode = $_GET["verif"];
        $request = json_decode($postdata);
        $userId = $request->usuario_id;
        $url_image = $request->url_image;

        $validation =  checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode);

        //Para que sea correcto debe dar true
        if($validation){
          $result = $conn->prepare('DELETE FROM album WHERE usuario_id = ? AND url_img = ?');
          $result->bind_param('is', $userId, $url_image);
          $result->execute();
        }
      }else{
        die("Faltan parametros");
      }
      break;
    default:
      die("Comando no valido");
  }
}else{
  die("Comando no seleccionado");
}

$conn -> close();

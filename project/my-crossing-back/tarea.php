<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Accept, Authorization');

require dirname(__FILE__) . "/opendb.php";

include dirname(__FILE__) . "/validators/usuarioValidator.php";
include dirname(__FILE__) . "/validators/tareaValidator.php";

if(isset($_GET["command"])){
  $validation = false;

  switch($_GET["command"]){

    case "read": //---------------------------------------------------------------------------------------------------READ
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = (int)$_GET["userId"]; //convierte el string en int
        $verifCode = $_GET["verif"];

        $validation = checkExisteUser($conn, $userId) &&
                 checkVerification($conn, $userId, $verifCode);

        if($validation){
          $result = $conn->prepare('SELECT * FROM tareas WHERE usuario_id = ?');
          $result->bind_param('i', $userId);
          $result->execute();
          $res = $result->get_result();
          $myArray = array();

          if ($res->num_rows > 0) {
            while($row = $res->fetch_assoc()) {
              $myArray[] = $row;
            }
          }
          print(json_encode($myArray, JSON_NUMERIC_CHECK));
        }
      }else{
        die("Faltan parametros");
      }
      break;

    case "update"://---------------------------------------------------------------------------------------------------UPDATE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        // Cogemos los datos a actualizar enviados por el POST aunque no se
        // puede hacer desde $_POST dado que PHP no admite JSON en $_POST

        $putdata = file_get_contents("php://input");

        if(isset($putdata) && !empty($putdata)){

          $request = json_decode($putdata);
          $tareaId = $request->id;
          $hecha = $request->hecha;
          $imagenUrl = $request->imagen_url;

          // Si es false, lo pone vacio por lo que la query no se hara correctamente
          // asi que en caso de que sea false (vacio), lo ponemos como 0 (false en BD)
          if(empty($hecha)){
            $hecha = 0;
          }

          $validation =  checkExisteUser($conn, $userId) &&
                    checkExisteTarea($tareaId, $conn) &&
                    checkVerification($conn, $userId, $verifCode) &&
                    checkTareaOwner($userId, $tareaId, $conn) &&
                    checkDatosTareaCorrectos($imagenUrl, $hecha);

          if($validation){
            $result = $conn->prepare('UPDATE tareas SET hecha = ?, imagen_url = ? WHERE id = ?');
            $result->bind_param('isi', $hecha, $imagenUrl, $tareaId);
            $result->execute();
          }
        }else{
          die("No hay datos");
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
          $hecha = $request->hecha;
          $imagenUrl = $request->imagen_url;
          $objectUserId = $request->usuario_id;

          $validation = checkExisteUser($conn, $userId) &&
                    checkVerification($conn, $userId, $verifCode) &&
                    checkDatosTareaCorrectos($imagenUrl, $hecha) &&
                    checkNumeroTareas($userId, $conn) &&
                    checkSameUser($userId, $objectUserId);

          if($validation){
            $result = $conn->prepare('INSERT INTO tareas(usuario_id, hecha, imagen_url) VALUES(?,?,?)');
            $result->bind_param('iis',$userId, $hecha, $imagenUrl);
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
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["tareaId"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];
        $tareaId = $_GET["tareaId"];

        $validation = checkExisteUser($conn, $userId) &&
                  checkExisteTarea($tareaId, $conn) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkTareaOwner($userId, $tareaId, $conn);

        if($validation){
          $result = $conn->prepare('DELETE FROM tareas WHERE id = ?');
          $result->bind_param('i', $tareaId);
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

<?php

require "openDB.php";

include "validators/usuarioValidator.php";
include "validators/tareaValidator.php";

if(isset($_GET["command"])){
  $error = false;

  switch($_GET["command"]){

    case "read": //---------------------------------------------------------------------------------------------------READ
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = (int)$_GET["userId"]; //convierte el string en int
        $verifCode = $_GET["verif"];

        $error = checkExisteUser($conn, $userId) &&
                 checkVerification($conn, $userId, $verifCode);

        //Para que sea correcto debe dar true
        if($error){
          $sql = "SELECT * FROM tareas WHERE usuario_id = $userId";
          $result = mysqli_query($conn,$sql);
          $myArray = array();

          if ($result->num_rows > 0) {
            // output data of each row
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

          $error =  checkExisteUser($conn, $userId) &&
                    checkExisteTarea($tareaId, $conn) &&
                    checkVerification($conn, $userId, $verifCode) &&
                    checkTareaOwner($userId, $tareaId, $conn) &&
                    checkDatosCorrectos($imagenUrl, $hecha);

          if($error){
            $sql = "UPDATE tareas SET hecha = $hecha, imagen_url = '$imagenUrl' WHERE id = $tareaId";
            $result = mysqli_query($conn,$sql);
          }else{
            print("No se cumplen los requisitos");
          }

        }else{
          print("No hay datos");
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
          $hecha = $request->hecha;
          $imagenUrl = $request->imagen_url;

          $error = checkExisteUser($conn, $userId) &&
                    checkVerification($conn, $userId, $verifCode) &&
                    checkDatosTareaCorrectos($imagenUrl, $hecha) &&
                    checkNumeroTareas($userId, $conn);

          if($error){
            $sql = "INSERT INTO tareas(id, usuario_id, hecha, imagen_url) VALUES ('', $userId, $hecha, '$imagenUrl')";
            $result = mysqli_query($conn,$sql);

          }else{
            print("No se cumplen los requisitos");
          }

        }else{
          print("No hay datos");
        }

      }else{
        print("Faltan parametros");
      }

      break;

    case "delete"://---------------------------------------------------------------------------------------------------DELETE
      if(isset($_GET["userId"]) && isset($_GET["verif"]) && isset($_GET["tareaId"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];
        $tareaId = $_GET["tareaId"];

        $error = checkExisteUser($conn, $userId) &&
                  checkExisteTarea($tareaId, $conn) &&
                  checkVerification($conn, $userId, $verifCode) &&
                  checkTareaOwner($userId, $tareaId, $conn);

        if($error){
          $sql = "DELETE FROM tareas WHERE id = $tareaId";
          $result = mysqli_query($conn,$sql);
        }else{
          print("No se cumplen los requisitos");
        }

      }else{
        print("Faltan parametros");
      }
      break;

    default:
      print("Comando no valido");
  }
}

$conn -> close();

?>

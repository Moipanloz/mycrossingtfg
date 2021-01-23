<?php

require "openDB.php";

include "validators/usuarioValidator.php";

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

          print json_encode($myArray);

        }else{
          print("No se cumplen los requisitos");
        }

      }else{
        print("No hay id de usuario");
      }


      break;

    case "create"://---------------------------------------------------------------------------------------------------CREATE
      break;

    case "update"://---------------------------------------------------------------------------------------------------UPDATE
      break;

    case "delete"://---------------------------------------------------------------------------------------------------DELETE
      break;

    default:
      print("Comando no válido");

  }

}

$conn -> close();

?>

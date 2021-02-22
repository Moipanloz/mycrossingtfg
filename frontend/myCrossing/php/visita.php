<?php

require "openDB.php";

include "validators/usuarioValidator.php";
#include "validators/visitaValidator.php";

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
          $sql = "SELECT * FROM visitas WHERE usuario_id = $userId";
          $result = mysqli_query($conn,$sql);
          $myArray = array();

          if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
              $myArray[] = $row;
            }
          }else{
            print json_encode("No hubo resultados");
          }

          print json_encode($myArray, JSON_NUMERIC_CHECK);

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

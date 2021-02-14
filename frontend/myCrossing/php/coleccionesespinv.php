<?php

require "openDB.php";

include "validators/usuarioValidator.php";

if(isset($_GET["command"])){
  $error = false;

  switch($_GET["command"]){
    case "read"://---------------------------------------------------------------------------------------------------READ
      $sql = "SELECT * FROM coleccionesespinv";
      $result = mysqli_query($conn,$sql);
      $colecciones = array();

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $colecciones[] = $row;
        }
      }
      print json_encode($colecciones);

      break;

    case "update"://------------------------------------------------------------------------------------------------UPDATE
      if(isset($_GET["userId"])){

        $userId = $_GET["userId"];
        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)){

          $request = json_decode($postdata);
          //TODO
          $source = $request->source;
          $items = $request->items;

          $error = checkUserId($conn, $userId) &&
                   checkAdmin($conn, $userId);

          //DE AQUI PABAJO TODO CUANDO TENGA ESTRUCTURA DB
          if($error){
            $itemsString = "('";
            for($i = 0; $i < sizeof($items); $i++){
              $itemsString .= $items[$i];
              if($i+1 == sizeof($items)){
                $itemsString .= "')";
              }else{
                $itemsString .= ",";
              }
            }

            $sql = "UPDATE coleccionesespeciales SET items = $itemsString WHERE source = '$source' AND usuario_id = $userId";
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

    default:
      print("Comando no válido");
  }
}


$conn -> close();

?>

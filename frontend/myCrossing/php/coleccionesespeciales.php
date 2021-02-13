<?php

require "openDB.php";

include "validators/usuarioValidator.php";
include "validators/ceValidator.php";


//TODO
//en el create, el source le viene como null

if(isset($_GET["command"])){
  $error = false;

  switch($_GET["command"]){
    case "read"://---------------------------------------------------------------------------------------------------READ
      if(isset($_GET["userId"])){
        $userId = $_GET["userId"];

        $error = checkUserId($conn, $userId);

        if($error){
          $sql = "SELECT * FROM coleccionesespeciales WHERE usuario_id = $userId";
          $result = mysqli_query($conn,$sql);
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
        print("No hay id de usuario");
      }
      break;

    case "create"://---------------------------------------------------------------------------------------------------CREATE
      if(isset($_GET["userId"])){

        $userId = $_GET["userId"];
        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)){

          $request = json_decode($postdata);
          $sources = $request->items; //aunque lo coja de items, son las colecciones (sources) a añadir

          $error = checkUserId($conn, $userId) &&
                   checkNoTieneLista($userId, $conn);

          if($error){
            for($i = 0; $i < sizeof($sources); $i++){
              $sql = "INSERT INTO coleccionesespeciales(usuario_id, source, items) VALUES ($userId, '$sources[$i]', null)";
              $result = mysqli_query($conn,$sql);
            }

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

    case "update"://------------------------------------------------------------------------------------------------UPDATE
      if(isset($_GET["userId"])){

        $userId = $_GET["userId"];
        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)){

          $request = json_decode($postdata);
          $source = $request->source;
          $items = $request->items;

          $error = checkUserId($conn, $userId) &&
                  checkDatosCorrectos($conn, $source, $items);

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


            echo("  sql es  ");
            echo(json_encode($sql));
            echo("  result es  ");
            echo(json_encode($result));

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

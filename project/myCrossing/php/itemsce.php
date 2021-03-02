<?php

require "openDB.php";

include "validators/usuarioValidator.php";

if(isset($_GET["command"])){
  $validation = false;

  switch($_GET["command"]){
    case "read"://---------------------------------------------------------------------------------------------------READ
      $sql = "SELECT source, GROUP_CONCAT(id) FROM itemsce GROUP BY source";
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
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)){
          //TODO
          //Setear datos post

          $validation = checkAdmin($conn, $userId);

          if($validation){
            //TODO
            //Hacer query
            $sql = "INSERT INTO visitas(usuario_id) VALUES ($userId)";
            $result = mysqli_query($conn,$sql);
          }else{
            print("No se cumplen los requisitos");
          }
        }else{
          print("No hay datos");
        }
      } else {
        print("Faltan parámetros");
      }
      break;

    default:
      print("Comando no válido");
  }
}


$conn -> close();

?>

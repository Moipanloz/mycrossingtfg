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
      //TODO CUANDO ESTE LA API
      if(isset($_GET["userId"])){

        $validation = checkAdmin($conn, $userId);

        print("TODO cuando este API");

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

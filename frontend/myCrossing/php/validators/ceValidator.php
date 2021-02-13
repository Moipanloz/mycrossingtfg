<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: content-type');

function checkNoTieneLista($userId, $conn){
  $error = null;

  $sql = "SELECT * FROM coleccionesespeciales WHERE usuario_id = $userId";
  $result = mysqli_query($conn, $sql);

  if($result->num_rows > 0){
    $error = FALSE;
    print("Ya tienes creadas tus listas");
  }else{
    $error = TRUE;
  }

  return $error;
}

function checkDatosCorrectos($conn, $source, $items){
  $error = TRUE;

  $sql = "SELECT source FROM coleccionesespinv";
  $result = mysqli_query($conn, $sql);
  $myArray = array();

  if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      $myArray[] = $row;
    }

    if(!array_key_exists($source, $myArray)){
      $error = FALSE;
      print("Colección inválida");
    }
  }

  $sql = "SELECT items FROM coleccionesespinv WHERE source = '$source'";
  $result = mysqli_query($conn, $sql);

  if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      $myArray[] = $row;
    }

    for($i = 0; $i < sizeof($items);$i++){
      if(!array_key_exists($items[$i], $myArray)){
        $error = FALSE;
        print("Hay items inválidos en la colección");
        break;
      }
    }

  }

  return $error;
}

?>

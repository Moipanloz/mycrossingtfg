<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: content-type');

function checkExisteVisita($tareaId, $conn){
  $result = null;
  $testquery = "SELECT * FROM tareas WHERE id = $tareaId";
  $validation = mysqli_query($conn, $testquery);

  if($validation->num_rows == 1){
    $result = true;
  }else{
    $result = false;
    print("No existe tarea con este id");
  }
  return $result;
}

?>

<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

function checkTareaOwner($userId, $tareaId, $conn){
  $result = null;
  $testquery = "SELECT usuario_id FROM tareas WHERE id = $tareaId";
  $validation = mysqli_query($conn, $testquery);
  $data = mysqli_fetch_array($validation);

    if($data[0] == $userId){
      $result = true;
    }else{
      $result = false;
      print("No eres el dueño de la tarea");
    }
  return $result;
}

function checkExisteTarea($tareaId, $conn){
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

function checkDatosCorrectos($imagenUrl, $hecha){
  $result = null;

  if($imagenUrl != null && strlen($imagenUrl) < 100){
    $result = true;
  }else{
    $result = false;
    print("Imagen incorrecta");
  }

  if($hecha == 0 || $hecha == 1 || $hecha == false || $hecha == true){
    $result = true;
  }else{
    $result = false;
    print("Hecha incorrecta");
  }

  return $result;
}

?>

<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: content-type');

function checkTareaOwner($userId, $tareaId, $conn){
  //Comprueba que la tarea pasada pertenece al usuario
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

function checkDatosTareaCorrectos($imagenUrl, $hecha){
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

function checkNumeroTareas($userId, $conn){
  $result = null;

  $sql = "SELECT * FROM tareas WHERE usuario_id = $userId";
  $query = mysqli_query($conn,$sql);

  if ($query->num_rows < 10) {
    $result = true;
  }else{
    $result = false;
  }

  return $result;
}

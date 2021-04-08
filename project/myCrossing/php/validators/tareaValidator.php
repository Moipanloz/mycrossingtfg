<?php

header('Access-Control-Allow-Headers: content-type');

function checkTareaOwner($userId, $tareaId, $conn){
  //Comprueba que la tarea pasada pertenece al usuario
  $validation = null;

  $result = $conn->prepare('SELECT usuario_id FROM tareas WHERE id = ?');
  $result->bind_param('i', $tareaId);
  $result->execute();
  $res = $result->get_result();
  $data = $res->fetch_array();

    if($data[0] == $userId){
      $validation = true;
    }else{
      $validation = false;
      die("No eres el dueño de la tarea");
    }
  return $validation;
}

function checkExisteTarea($tareaId, $conn){
  $validation = null;

  $result = $conn->prepare('SELECT * FROM tareas WHERE id = ?');
  $result->bind_param('i', $tareaId);
  $result->execute();
  $result->store_result();

  if($result->num_rows == 1){
    $validation = true;
  }else{
    $validation = false;
    die("No existe tarea con este id");
  }
  return $validation;
}

function checkDatosTareaCorrectos($imagenUrl, $hecha){
  $validation = null;

  if($imagenUrl != null && strlen($imagenUrl) < 100){
    $validation = true;
  }else{
    $validation = false;
    die("Imagen incorrecta");
    return $validation;
  }

  if($hecha == 0 || $hecha == 1 || $hecha == false || $hecha == true){
    $validation = true;
  }else{
    $validation = false;
    die("El valor de resolución de la tarea es incorrecto");
  }

  return $validation;
}

function checkNumeroTareas($userId, $conn){
  $validation = null;

  $result = $conn->prepare('SELECT * FROM tareas WHERE usuario_id = ?');
  $result->bind_param('i', $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows < 10) {
    $validation = true;
  }else{
    $validation = false;
    die("No puede haber más de 10 tareas");
  }

  return $validation;
}

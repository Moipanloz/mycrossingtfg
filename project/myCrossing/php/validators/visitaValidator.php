<?php

header('Access-Control-Allow-Headers: content-type');

function checkExisteVisita($conn, $userId){
  $validation = true;

  $result = $conn->prepare('SELECT * FROM visitas WHERE usuario_id = ?');
  $result->bind_param('i', $userId);
  $result->execute();
  $result->store_result();

  if($result->num_rows != 1){
    $validation = false;
    die("No existe la visita");
  }
  return $validation;
}

function checkNoExisteVisita($conn, $userId){
  $validation = true;

  $result = $conn->prepare('SELECT * FROM visitas WHERE usuario_id = ?');
  $result->bind_param('i', $userId);
  $result->execute();
  $result->store_result();

  if($result->num_rows != 0){
    $validation = false;
    die("La visita ya existe");
  }
  return $validation;
}

function checkSameUserId($userId, $objectUserId){
  if($userId != $objectUserId){
    die("Esta visita no le pertenece");
  }
  return true;
}

function checkEstela($estela){
  if($estela == null || !is_bool($estela)){
    die("Debe especificar correctamente si estela ha ido de visita");
  }
  return true;
}

<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Accept, Authorization');

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

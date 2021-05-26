<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Accept, Authorization');

function checkDatosCorrectos($amistad){
  $validation = true;
  if(1 > $amistad && $amistad > 6){
    $validation = false;
    die("La amistad debe estar comprendida entre 1 y 6");
  }
  return $validation;
}

function checkTieneVecino($userId, $oldVecinoId, $conn){
  $validation = true;

  $result = $conn->prepare('SELECT * FROM misvecinos WHERE vecino_id = ? AND usuario_id = ?');
  $result->bind_param('si', $oldVecinoId, $userId);
  $result->execute();
  $result->store_result();

  if($result->num_rows != 1){
    $validation = false;
    die("No tienes a este vecino");
  }
  return $validation;
}

function checkNoTieneVecino($userId, $vecinoId, $conn){
  $validation = true;

  $result = $conn->prepare('SELECT * FROM misvecinos WHERE vecino_id = ? AND usuario_id = ?');
  $result->bind_param('si', $vecinoId, $userId);
  $result->execute();
  $result->store_result();

  if($result->num_rows != 0){
    $validation = false;
    die("Ya tienes a este vecino");
  }
  return $validation;
}

function checkNumeroVecinos($userId, $conn){
  $validation = true;

  $result = $conn->prepare('SELECT * FROM misvecinos WHERE usuario_id = ?');
  $result->bind_param('i', $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows > 9) {
    $validation = false;
    die("Ya tienes el número máximo de vecinos");
  }

  return $validation;
}

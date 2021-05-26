<?php

header('Access-Control-Allow-Origin: https://mycrossing.herokuapp.com');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

function checkTieneCancion($conn, $userId, $nombreCancion){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catcanciones WHERE nombre_cancion = ? AND usuario_id = ?');
  $result->bind_param('si', $nombreCancion, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 1) {
    $validation = FALSE;
    die("No tienes el cancion");
  }
  return $validation;
}

function checkNoTieneCancion($conn, $userId, $nombreCancion){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catcanciones WHERE nombre_cancion = ? AND usuario_id = ?');
  $result->bind_param('si', $nombreCancion, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 0) {
    $validation = FALSE;
    die("Ya tienes la cancion");
  }
  return $validation;
}

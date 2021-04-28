<?php

header('Access-Control-Allow-Headers: content-type');

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

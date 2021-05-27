<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Accept, Authorization');

function checkTieneArte($conn, $userId, $nombreArte){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catarte WHERE nombre_arte = ? AND usuario_id = ?');
  $result->bind_param('si', $nombreArte, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 1) {
    $validation = FALSE;
    die("No tienes la obra de arte");
  }
  return $validation;
}

function checkNoTieneArte($conn, $userId, $nombreArte){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catarte WHERE nombre_arte = ? AND usuario_id = ?');
  $result->bind_param('si', $nombreArte, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 0) {
    $validation = FALSE;
    die("Ya tienes la obra de arte");
  }
  return $validation;
}

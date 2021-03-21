<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: content-type');

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

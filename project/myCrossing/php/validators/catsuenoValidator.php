<?php

header('Access-Control-Allow-Headers: content-type');

function checkTieneFosil($conn, $userId, $nombreFosil){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catsuenos WHERE nombre_sueno = ? AND usuario_id = ?');
  $result->bind_param('si', $nombreFosil, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 1) {
    $validation = FALSE;
    die("No tienes el sueno");
  }
  return $validation;
}

function checkNoTieneFosil($conn, $userId, $nombreFosil){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catsuenos WHERE nombre_sueno = ? AND usuario_id = ?');
  $result->bind_param('si', $nombreFosil, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 0) {
    $validation = FALSE;
    die("Ya tienes el sueno");
  }
  return $validation;
}

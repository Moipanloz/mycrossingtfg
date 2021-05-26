<?php

header('Access-Control-Allow-Origin: https://mycrossing.herokuapp.com');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

function checkTieneFosil($conn, $userId, $nombreFosil){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catfosiles WHERE nombre_fosil = ? AND usuario_id = ?');
  $result->bind_param('si', $nombreFosil, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 1) {
    $validation = FALSE;
    die("No tienes el fosil");
  }
  return $validation;
}

function checkNoTieneFosil($conn, $userId, $nombreFosil){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catfosiles WHERE nombre_fosil = ? AND usuario_id = ?');
  $result->bind_param('si', $nombreFosil, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 0) {
    $validation = FALSE;
    die("Ya tienes el fosil");
  }
  return $validation;
}

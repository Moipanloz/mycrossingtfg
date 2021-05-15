<?php

header('Access-Control-Allow-Headers: content-type');

function checkTieneSueno($conn, $userId, $codSueno){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catsuenos WHERE codigo_sueno = ? AND usuario_id = ?');
  $result->bind_param('si', $codSueno, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 1) {
    $validation = FALSE;
    die("No tienes el sueno");
  }
  return $validation;
}

function checkNoTieneSueno($conn, $userId, $codigoSueno){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catsuenos WHERE codigo_sueno = ?');
  $result->bind_param('s', $codigoSueno);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 0) {
    $validation = FALSE;
    die("Ya existe este codigo");
  }
  return $validation;
}

function checkOtroNoTieneSueno($conn, $userId, $codigoSueno){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catsuenos WHERE codigo_sueno = ? AND usuario_id != ?');
  $result->bind_param('si', $codigoSueno, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 0) {
    $validation = FALSE;
    die("Ya existe este codigo");
  }
  return $validation;
}

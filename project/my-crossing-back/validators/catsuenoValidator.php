<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Accept, Authorization');

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

function checkExisteSueno($conn, $codigoSueno){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catsuenos WHERE codigo_sueno = ?');
  $result->bind_param('s', $codigoSueno);
  $result->execute();
  $result->store_result();

  if ($result->num_rows == 0) {
    $validation = FALSE;
    die("No existe este codigo");
  }
  return $validation;
}

function checkExisteLike($conn, $userId, $codigoSueno){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM likes_suenos WHERE codigo_sueno = ? AND usuario_id = ?');
  $result->bind_param('si', $codigoSueno, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows == 0) {
    $validation = FALSE;
    die("No existe este like");
  }
  return $validation;
}

function checkSameUser($userId, $objectUserId){
  if ($userId!=$objectUserId) {
    die("No puedes modificar en otros usuarios");
  }
  return true;
}

function checkHasPhoto($foto){
  if ($foto==null) {
    die("Debes seleccionar al menos una foto");
  }
  return true;
}

function checkPoseeAlgunSueno($conn, $userId){

  $result = $conn->prepare('SELECT * FROM catsuenos WHERE usuario_id = ?');
  $result->bind_param('i', $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows == 0) {
    die("Este usuario no posee un sueno");
  }
  return true;
}

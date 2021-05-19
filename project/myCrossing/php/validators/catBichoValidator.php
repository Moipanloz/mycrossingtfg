<?php

header('Access-Control-Allow-Headers: content-type');

function checkTieneCriatura($conn, $userId, $nombreCriatura){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catbichos WHERE nombre_criatura = ? AND usuario_id = ?');
  $result->bind_param('si', $nombreCriatura, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 1) {
    $validation = FALSE;
    die("No tienes el bicho");
  }
  return $validation;
}
function checkNoTieneCriatura($conn, $userId, $nombreCriatura){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catbichos WHERE nombre_criatura = ? AND usuario_id = ?');
  $result->bind_param('si', $nombreCriatura, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows == 1) {
    $validation = FALSE;
    die("Tienes el bicho");
  }
  return $validation;
}
function checkSameUser($userId, $objectUserId){

  if ($userId != $objectUserId) {
    die("No puedes crear en otros usuarios");
  }
  return true;
}
function checkNotEmptyCreature($criatura){

  if ($criatura == "") {
    die("Introduzca una criatura válida");
  }
  return true;
}

?>

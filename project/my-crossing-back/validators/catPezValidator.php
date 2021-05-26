<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Accept, Authorization');

function checkTieneCriatura($conn, $userId, $nombreCriatura){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM catpeces WHERE nombre_criatura = ? AND usuario_id = ?');
  $result->bind_param('si', $nombreCriatura, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 1) {
    $validation = FALSE;
    print("No tienes el pez");
    print("$result->num_rows");
  }
  return $validation;
}

?>

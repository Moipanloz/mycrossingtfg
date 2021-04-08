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
    print("No tienes el bicho");
    print("$result->num_rows");
  }
  return $validation;
}

?>

<?php

header('Access-Control-Allow-Headers: content-type');

function checkExisteVisita($userId, $conn){
  $validation = true;

  $result = $conn->prepare('SELECT * FROM visitas WHERE usuario_id = ?');
  $result->bind_param('i', $userId);
  $result->execute();
  $result->store_result();

  if($result->num_rows != 1){
    $validation = false;
    die("No existe la visita");
  }
  return $validation;
}

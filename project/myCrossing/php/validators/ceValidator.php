<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: content-type');

function checkDatosCorrectos($conn, $itemId){
  $validation = TRUE;

  $sql = "SELECT id FROM itemsce WHERE id = '$itemId'";
  $result = mysqli_query($conn, $sql);

  if ($result->num_rows != 1) {
    $validation = FALSE;
    print("Objeto no válido");
  }
  return $validation;
}

function checkTieneItem($conn, $userId, $itemId){
  $validation = TRUE;

  $sql = "SELECT * FROM usuariosce WHERE itemce_id = '$itemId' AND usuario_id = $userId";
  $result = mysqli_query($conn, $sql);

  if ($result->num_rows != 1) {
    $validation = FALSE;
    print("Debes tener el item para eliminarlo de tu lista");
  }
  return $validation;
}

?>

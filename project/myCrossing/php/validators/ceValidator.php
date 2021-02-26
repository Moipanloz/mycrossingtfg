<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: content-type');

function checkDatosCorrectos($conn, $itemId){
  $error = TRUE;

  $sql = "SELECT id FROM itemsce WHERE id = '$itemId'";
  $result = mysqli_query($conn, $sql);

  if ($result->num_rows != 1) {
    $error = FALSE;
    print("Objeto no válido");
  }
  return $error;
}

function checkTieneItem($conn, $userId, $itemId){
  $error = TRUE;

  $sql = "SELECT * FROM usuariosce WHERE itemce_id = '$itemId' AND usuario_id = $userId";
  $result = mysqli_query($conn, $sql);

  if ($result->num_rows != 1) {
    $error = FALSE;
    print("Debes tener el item para eliminarlo de tu lista");
  }
  return $error;
}

?>

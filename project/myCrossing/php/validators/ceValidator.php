<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: content-type');

function checkSourceCorrecta($itemSource){
  $validation = TRUE;
  $colecciones = ["DIY","Estacional","Estela","Kamilo","CJ","Gulliver","Boda","Pascal","Gullivarrr",
  "Coti","Soponcio","Guindo","Copito","Renato","Conga","Dodo","Mama","Cumple"];

  if (!in_array($itemSource, $colecciones)) {
    $validation = FALSE;
    print("El item no pertenece a una colección válida");
  }

  return $validation;
}

function checkTieneItem($conn, $userId, $itemName){
  $validation = TRUE;

  $result = $conn->prepare('SELECT * FROM colesp WHERE item_name = ? AND usuario_id = ?');
  $result->bind_param('si', $itemName, $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 1) {
    $validation = FALSE;
    die("No tienes el item");
  }
  return $validation;
}

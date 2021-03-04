<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: content-type');

function checkSourceCorrecta($itemSource){
  $validation = TRUE;
  $colecciones = ["DIY","Estacional","Estela","Caza","Pesca","Gulliver","Al y Paca","Pascal","Gullivarrr",
  "Coti","Soponcio","Guindo","Copito","Renato","Conga","Dodo","Mama","Cumple"];

  if (!in_array($itemSource, $colecciones)) {
    $validation = FALSE;
    print("El item no pertenece a una colección válida");
  }

  return $validation;
}

function checkTieneItem($conn, $userId, $itemName){
  $validation = TRUE;

  $sql = "SELECT * FROM colesp WHERE item_name = '$itemName' AND usuario_id = $userId";

  //echo("---------LA QUERY ES------------");
  //echo($sql);
  $result = mysqli_query($conn, $sql);

//    echo("-----RESULTADO----");
  //  echo($result);

  if ($result->num_rows != 1) {
    $validation = FALSE;
    print("No tienes el item");
  }
  return $validation;
}

?>

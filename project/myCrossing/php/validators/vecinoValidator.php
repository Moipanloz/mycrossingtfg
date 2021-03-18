<?php

header('Access-Control-Allow-Headers: content-type');

function checkDatosCorrectos($amistad){
  $result = null;
  if(0 < $amistad && $amistad < 7){
    $result = true;
  }else{
    $result = false;
    die("La amistad debe estar comprendida entre 1 y 6");
  }
  return $result;
}

function checkTieneVecino($userId, $vecinoId, $conn){
  $result = null;
  $testquery = "SELECT * FROM misvecinos WHERE vecino_id = '$vecinoId' AND usuario_id = $userId";
  $validation = mysqli_query($conn, $testquery);

  if($validation->num_rows == 1){
    $result = true;
  }else{
    $result = false;
    die("No tienes a este vecino");
  }
  return $result;
}

function checkNumeroVecinos($userId, $conn){
  $result = null;

  $sql = "SELECT * FROM misvecinos WHERE usuario_id = $userId";
  $query = mysqli_query($conn,$sql);

  if ($query->num_rows < 10) {
    $result = true;
  }else{
    $result = false;
    die("Ya tienes el número máximo de vecinos");
  }

  return $result;
}

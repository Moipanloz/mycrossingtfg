<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials: true");

function checkUserName($conn, $nombre){
  $devolver = FALSE;

  $sql = "SELECT * FROM usuarios WHERE nombre = '$nombre'";
  $result = mysqli_query($conn,$sql);
  if ($result->num_rows != 0) {
    $devolver= TRUE;
  }
  return $devolver;
}

function checkUserId($conn, $userId){
  $devolver = FALSE;
  $sql = "SELECT * FROM usuarios WHERE id = $userId";
  $result = mysqli_query($conn,$sql);
  if ($result->num_rows == 1) {
    $devolver= TRUE;
  }
  return $devolver;
}

?>


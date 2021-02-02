<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials: true");

function checkUser($userId){

  $result = null;
  if(array_key_exists("userId", $_COOKIE)){

    $cookie = (int)$_COOKIE["userId"];

    if($userId == $cookie){
      $result = true;
    }else{
      $result = false;
      print("Usuario incorrecto");
    }
  }else{
    $result = false;
    print("La cookie no existe");
  }
  return $result;
}

function checkUserName($conn, $nombre){

  $sql = "SELECT COUNT(*) FROM usuarios WHERE nombre = '$nombre'";
  $result = mysqli_query($conn,$sql);
  return $result!='0';
}

function checkUserId($conn, $userId){

  $sql = "SELECT COUNT(*) FROM usuarios WHERE userId = '$userId'";
  $result = mysqli_query($conn,$sql);
  return $result=='1';
}

?>

